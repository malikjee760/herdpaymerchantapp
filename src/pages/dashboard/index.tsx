import React, { useContext, useEffect, useState } from 'react';

import Page from '../../componentLibrary/organisms/Page';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../dashboard/dailyChart';
import Balance from '../dashboard/balance';
import Orders from '../dashboard/orders';
import { useRouter } from 'next/router';
import { UserContext } from '../../context/userContext';
import UserAppBar from '../../components/UserAppBar';
import DashboardLoading from './dashboardLoading';
import { getUnixTimestamp } from '../../helpers/getTimeStamp';
import { Copyright } from '../../componentLibrary';
import loadUserStripeAccount from '../../helpers/account/loadUserStripeAccount';

const Dashboard = () => {
  const router = useRouter();
  const { userAccount, userLoading, fbUser, loggedIn } =
    useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [userStripeAccount, setUserStripeAccount] = useState({
    loading: true,
    found: false,
    account: {},
    accountBalance: {},
    lastRefresh: getUnixTimestamp(),
  });

  useEffect(() => {
    if (!userLoading && !userAccount.accountSetupComplete) {
      router.push('/account');
    }
    if (!userLoading && loggedIn) {
      loadUserStripeAccount(fbUser.accessToken, setUserStripeAccount);
    }
  }, [userAccount, userLoading]);

  if (userAccount.userLoading || !fbUser.emailVerified) {
    return (
      <Page>
        <DashboardLoading />
      </Page>
    );
  }

  console.log(useContext(UserContext));

  return (
    <Page showNavBar={false} showFooter={false}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <UserAppBar title={'Dashboard'} />
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
              {/* Chart */}

              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Balance userStripeAccount={userStripeAccount} />
                </Paper>
              </Grid>
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
