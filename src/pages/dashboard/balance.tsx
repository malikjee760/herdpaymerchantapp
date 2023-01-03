import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './title';
import Skeleton from '@mui/material/Skeleton';
import moment from 'moment';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

interface IBalanceProps {
  userStripeAccount: any;
}

export default function Balance({ userStripeAccount = {} }: IBalanceProps) {
  const {
    loading = true,
    found = false,
    accountBalance = {},
    lastRefresh = 0,
  } = userStripeAccount;
  if (loading) {
    return (
      <React.Fragment>
        <Title>Balance</Title>
        <Skeleton variant="rectangular" width={'100%'} height={'10vh'} />
        <br />
        <Skeleton variant="rectangular" width={'100%'} height={'5vh'} />
        <br />
        <Skeleton variant="text" />
      </React.Fragment>
    );
  }
  let balanceAvailable = 0;
  let balancePending = 0;
  if (found) {
    balanceAvailable = accountBalance?.available[0]?.amount || 0;
    balancePending = accountBalance?.pending[0]?.amount || 0;
  }
  const lastUpdate = moment.unix(lastRefresh).format('h:mm a MM/DD/YY');
  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        ${balanceAvailable + balancePending}
      </Typography>
      <Typography variant={'caption'} color="text.secondary">
        <strong>Available:</strong> ${balanceAvailable}
      </Typography>
      <Typography variant={'caption'} color="text.secondary">
        <strong>Pending:</strong> ${balancePending}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        as of {lastUpdate}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Request payout
        </Link>
      </div>
    </React.Fragment>
  );
}
