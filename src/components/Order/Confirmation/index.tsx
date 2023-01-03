import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '../../../componentLibrary';
import { Link } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';

interface IConfirmationProps {
  goBack?: () => void;
  showBack?: boolean;
  showEmailInput?: boolean;
  order: any;
}
const OrderConfirmation = (props: IConfirmationProps) => {
  const { setUser } = useContext(UserContext);

  const { showBack, goBack = () => {}, order, showEmailInput } = props;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const submit = () => {
    setEmailError(false);
    axios({
      method: 'post',
      url: '/updateEmail',
      data: {
        email,
      },
    })
      .then((response) => {
        setUser(response.data);
        setEmail('');
      })
      .catch((e) => {
        setEmailError(true);
      });
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={100} />
        </Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ marginTop: 40 }}
        >
          Your payment is complete!
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="p"
          style={{ marginTop: 16, fontStyle: 'italic' }}
        >
          Thank you for shopping with <strong>HERD</strong>PAY!
        </Typography>
        <Typography variant={'body2'} style={{ marginTop: 40 }}>
          Order confirmation and shipping details have been sent.
        </Typography>
      </div>
      {showBack && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link onClick={goBack} style={{ cursor: 'pointer' }}>
            Back
          </Link>
        </div>
      )}
      {showEmailInput && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 40,
            marginBottom: 16,
            border: '1px solid #C4C4C4',
            padding: 8,
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Be the first to know
          </Typography>
          <Typography variant={'body2'}>
            Subscribe to stay in the loop on {order.companyName}'s new product
            launches, promotions, and more.
          </Typography>
          <TextField
            error={emailError}
            autoComplete={'email'}
            fullWidth
            id="outlined-basic"
            label="Email"
            variant={'standard'}
            type={'email'}
            style={{ marginTop: 16 }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button
            gaTag={'order_join_list'}
            style={{ marginTop: 16 }}
            onClick={submit}
          >
            Submit
          </Button>
        </div>
      )}
      <Button
        gaTag={'order_confirm_home'}
        className={'horizontal-center'}
        onClick={() => router.push('/')}
      >
        Back to the pasture
      </Button>
    </div>
  );
};

export default OrderConfirmation;
