import React, { useState } from 'react';
import Title from '../../components/SectionTitle';
import { Button } from '../../componentLibrary';
import createStripeExpressAccount from '../../helpers/account/createStripeExpressAccount';
import { auth } from '../../helpers/firebase/firebaseApp';
import { useRouter } from 'next/router';
import Skeleton from '@mui/material/Skeleton';
import moment from 'moment';

interface IPayoutStatusProps {
  userStripeAccount: any;
  userAccount: any;
}

export default function AccountInfo({
  userStripeAccount = {},
  userAccount = {},
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

  const timeCreated = moment
    .unix(userAccount.timeCreatedUnix)
    .format('MMMM Do YYYY, h:mm:ss a');

  return (
    <div style={{ height: '100%' }}>
      <Title>Account information</Title>
      {userAccount.userLoading ? (
        <>
          <Skeleton variant="rectangular" width={'100%'} height={'10vh'} />
          <br />
          <Skeleton variant="rectangular" width={'100%'} height={'5vh'} />
          <br />
          <Skeleton variant="text" />
        </>
      ) : (
        <>
          <div>
            <p>
              <strong>Contact Name: </strong>
              {userAccount.merchantName}
            </p>
            <p>
              <strong>Contact Email: </strong>
              {userAccount.contactEmail}
            </p>
            <p>
              <strong>Account Created: </strong>
              {timeCreated}
            </p>
            <p>
              <strong>Status: </strong>
              {userAccount.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
