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
import { useRouter } from 'next/router';
import { UserContext } from '../../context/userContext';
import UserAppBar from '../../components/UserAppBar';
import DashboardLoading from '../dashboard/dashboardLoading';
import { Copyright } from '../../componentLibrary';

const Dashboard = () => {
  const router = useRouter();
  const { userAccount, userLoading, fbUser } = useContext(UserContext);

  useEffect(() => {
    if (!userLoading && !userAccount.accountSetupComplete) {
      router.push('/account');
    }
  }, [userAccount, userLoading]);

  if (userLoading || !fbUser.emailVerified) {
    return (
      <Page>
        <DashboardLoading />
      </Page>
    );
  }

  return (
    <Page showNavBar={false} showFooter={false}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <UserAppBar title={'Orders'} />
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders orders={[]} />
                </Paper>
              </Grid>
            </Grid>
            <br />
            <Copyright />
          </Container>
        </Box>
      </Box>
    </Page>
  );
};

export default Dashboard;
