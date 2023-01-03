import React, { useContext, useEffect, useState } from 'react';

import { Button } from '../../componentLibrary';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Page from '../../componentLibrary/organisms/Page';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { auth } from '../../helpers/firebase/firebaseApp';
import { signInWithEmailAndPassword } from 'firebase/auth';
import getErrors from '../../helpers/log-in/getErrors';
import { useRouter } from 'next/router';
import { UserContext } from '../../context/userContext';

const SignUp = () => {
  const router = useRouter();
  const { userLoading, loggedIn } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  useEffect(() => {
    if (!userLoading && loggedIn) {
      router.push('/dashboard');
    }
  }, [userLoading, loggedIn]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    if (!email || email === '') {
      setSubmitting(false);
      setErrors({ email: 'Invalid email', password: '' });
      return;
    }
    if (!password || password === '') {
      setSubmitting(false);
      setErrors({ password: 'Invalid password', email: '' });
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // @ts-ignore
        router.push('/dashboard');
        // ...
      })
      .catch((error) => {
        setSubmitting(false);
        const errorCode = error.code;
        setErrors(getErrors(errorCode));
        // ..
      });
  };

  if (userLoading) {
    return <></>;
  }
  return (
    <Page showNavBar>
      <Container component="main" maxWidth="xs" style={{ overflow: 'hidden' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors.email !== ''}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.password !== ''}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            <Button
              gaTag={'log_in_submit'}
              disabled={submitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="/" variant="body2">
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  Need an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default SignUp;
