import React, { useState } from 'react';
import Title from '../../components/SectionTitle';
import { Button } from '../../componentLibrary';
import createStripeExpressAccount from '../../helpers/account/createStripeExpressAccount';
import { auth } from '../../helpers/firebase/firebaseApp';
import { useRouter } from 'next/router';
import Skeleton from '@mui/material/Skeleton';

interface IPayoutStatusProps {
  userStripeAccount: any;
}

export default function PayoutAccountStatus({
  userStripeAccount = {},
}: IPayoutStatusProps) {
  const router = useRouter();
  const { account = {} } = userStripeAccount;

  const [linkLoading, setLinkLoading] = useState(false);

  const loadStripeInfo = () => {
    const user = auth.currentUser;
    if (user) {
      // @ts-ignore
      const { accessToken } = user;
      setLinkLoading(true);
      createStripeExpressAccount(accessToken).then((response) => {
        setLinkLoading(false);
        if (response.status) {
          window.location = response.data.url;
        } else {
          window.alert('An error occurred. Please try again later');
        }
      });
    } else {
      router.push('/log-in');
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <Title>Payout Status</Title>
      {userStripeAccount.loading && (
        <>
          <Skeleton variant="rectangular" width={'100%'} height={'5vh'} />
          <br />
          <Skeleton variant="rectangular" width={'100%'} height={'5vh'} />
        </>
      )}
      {userStripeAccount.found && (
        <>
          {account.charges_enabled && account.details_submitted ? (
            <div>
              <p>Your account is ready to accept payouts.</p>
              <p>No further information required at this time.</p>
            </div>
          ) : (
            <div>
              <p>Payouts are paused.</p>
              <p>We need some more information</p>
              <Button
                gaTag={'test'}
                disabled={linkLoading}
                onClick={loadStripeInfo}
              >
                Start
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
