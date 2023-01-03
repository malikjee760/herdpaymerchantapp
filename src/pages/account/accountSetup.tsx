import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '../../componentLibrary';
import { auth } from '../../helpers/firebase/firebaseApp';
import { updateProfile } from 'firebase/auth';
import updateAccount from '../../helpers/account/updateAccount';
import createStripeExpressAccount from '../../helpers/account/createStripeExpressAccount';
import completeAccountSetup from '../../helpers/account/completeAccountSetup';

export default function AccountSetup() {
  const [errors, setErrors] = useState({ name: '' });
  const [currentStep, setCurrentStep] = useState('name');
  const [stripeLink, setStripeLink] = useState('');
  const [name, setName] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const submitName = () => {
    const user = auth.currentUser;
    // @ts-ignore
    const { accessToken } = user;
    if (name === undefined || name === '' || name === null) {
      setErrors({ name: 'Required' });
      return;
    } else {
      setErrors({ name: '' });
    }
    setLoading(true);
    if (!user) {
      window.alert('An error occurred. Please try again later');
      setLoading(false);
    } else {
      updateProfile(user, { displayName: name })
        .then(() => {
          // @ts-ignore
          updateAccount({ merchantName: name }, accessToken).then((value) => {
            setLoading(false);
            if (value) {
              createStripeExpressAccount(accessToken).then((response) => {
                if (response.status) {
                  setStripeLink(response.data.url);
                  setCurrentStep('stripeAccount');
                  completeAccountSetup(accessToken);
                } else {
                  window.alert('An error occurred. Please try again later');
                }
              });
            } else {
              window.alert('An error occurred. Please try again later');
            }
          });
        })
        .catch((e) => {
          window.alert('An error occurred. Please try again later');
          setLoading(false);
        });
    }
  };

  const goToStripeSetup = () => {
    if (stripeLink && stripeLink !== '') {
      // @ts-ignore
      window.location = stripeLink;
    } else {
      window.alert('An error occurred. Please try again later');
    }
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (currentStep) {
      case 'name':
        submitName();
        break;
      case 'stripeAccount':
        goToStripeSetup();
        break;
      default:
        console.log('missing step');
        break;
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <PersonIcon />
      </Avatar>
      {currentStep === 'name' && (
        <>
          <Typography component="h1" variant="h5">
            Welcome to HerdPay for merchants!
          </Typography>
          <Typography component="h2" variant="h6">
            Let's get your account setup
          </Typography>
        </>
      )}
      {currentStep === 'stripeAccount' && (
        <>
          <Typography component="h2" variant="h6" sx={{ textAlign: 'center' }}>
            We just need a little info so you can accept payouts
          </Typography>
        </>
      )}
      <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {currentStep === 'name' && (
            <Grid item xs={12}>
              <TextField
                error={errors.name !== ''}
                required
                fullWidth
                id="customer-name"
                label="What's your name?"
                name="customer-name"
                autoComplete="name"
                helperText={errors.name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
          )}
        </Grid>
        <Button
          gaTag={'account_setup_continue'}
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
