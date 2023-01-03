import React, { useContext, useState } from 'react';

import { Button } from '../../componentLibrary';
import { sendEmailVerification } from 'firebase/auth';

import Box from '@mui/material/Box';
import { UserContext } from '../../context/userContext';

const AccountVerification = () => {
  const { fbUser } = useContext(UserContext);
  const [emailSent, setEmailSent] = useState(false);

  const resendVerification = () => {
    sendEmailVerification(fbUser)
      .then(() => {
        setEmailSent(true);
      })
      .catch((e) => {
        console.log(e);
        window.alert('An error occurred, please try again later');
      });
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
      {emailSent ? (
        <>
          <div>Email sent to {fbUser.email}</div>
          <div>Make sure to check your spam if you cannot find it</div>
        </>
      ) : (
        <>
          Please verify your email
          <Button
            gaTag={'resend_email_confirmation'}
            onClick={resendVerification}
          >
            Resend Code
          </Button>
        </>
      )}
    </Box>
  );
};

export default AccountVerification;
