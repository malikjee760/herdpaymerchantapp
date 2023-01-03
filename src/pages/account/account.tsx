import React, { useContext, useEffect, useState } from 'react';

import Page from '../../componentLibrary/organisms/Page';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from '../dashboard/orders';
import { auth } from '../../helpers/firebase/firebaseApp';
import { verifyUser } from '../../helpers/auth';
import { useRouter } from 'next/router';
import { UserContext } from '../../context/userContext';
import UserAppBar from '../../components/UserAppBar';
import PayoutAccountStatus from './payoutAccountStatus';
import AccountInfo from './accountInfo';

interface IAccountPageProps {
  userStripeAccount: any;
  userFbAccount: any;
  userAccount: any;
}

const Account = ({
  userStripeAccount,
  userFbAccount,
  userAccount,
}: IAccountPageProps) => {
  return (
    <Page showNavBar={false}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <UserAppBar title={'Account'} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item md={9} xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <AccountInfo
                    userStripeAccount={userStripeAccount}
                    userAccount={userAccount}
                  />
                </Paper>
              </Grid>
              <Grid item md={3} xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <PayoutAccountStatus userStripeAccount={userStripeAccount} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Page>
  );
};

export default Account;
