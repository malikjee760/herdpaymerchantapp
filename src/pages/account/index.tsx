import React, { useState, useEffect, useContext } from 'react';

import { Button } from '../../componentLibrary';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Page from '../../componentLibrary/organisms/Page';
import CssBaseline from '@mui/material/CssBaseline';

import { auth } from '../../helpers/firebase/firebaseApp';
import { useRouter } from 'next/router';
import AccountLoading from './accountLoading';
import { UserContext } from '../../context/userContext';
import AccountSetup from './accountSetup';
import AccountVerification from './accountVerification';
import AccountPage from './account';
import getStripeAccount from '../../helpers/account/getStripeAccount';
import { verifyUser } from '../../helpers/auth';
import { getUnixTimestamp } from '../../helpers/getTimeStamp';
import loadUserStripeAccount from '../../helpers/account/loadUserStripeAccount';

const Account = () => {
  const router = useRouter();

  const { userAccount, userLoading } = useContext(UserContext);

  const [user, setUser] = useState({ email: '' });
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [userStripeAccount, setUserStripeAccount] = useState({
    loading: true,
    found: false,
    account: {},
    accountBalance: {},
    lastRefresh: getUnixTimestamp(),
  });

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setLoading(false);
      if (user) {
        verifyUser(user, router);
        setEmailVerified(user.emailVerified);
        setUser(user);
        // @ts-ignore
        loadUserStripeAccount(user.accessToken, setUserStripeAccount);
      } else {
        router.push('/log-in');
      }
    });
  }, []);

  if (loading || userLoading) {
    return (
      <Page>
        <AccountLoading />
      </Page>
    );
  }

  if (emailVerified && userAccount.accountSetupComplete) {
    return (
      <AccountPage
        userStripeAccount={userStripeAccount}
        userFbAccount={user}
        userAccount={userAccount}
      />
    );
  }

  return (
    <Page showNavBar>
      <Container component="main" maxWidth="xs" style={{ overflow: 'hidden' }}>
        <CssBaseline />
        {emailVerified ? (
          <>{userAccount.accountSetupComplete ? <></> : <AccountSetup />}</>
        ) : (
          <AccountVerification />
        )}
      </Container>
    </Page>
  );
};

export default Account;
