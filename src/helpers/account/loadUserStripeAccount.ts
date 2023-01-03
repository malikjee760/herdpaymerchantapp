import getStripeAccount from './getStripeAccount';
import { getUnixTimestamp } from '../getTimeStamp';

const loadUserStripeAccount = async (
  token: string,
  setUserStripeAccount: (update: any) => void,
) => {
  const stripeActResponse = await getStripeAccount(token);
  if (stripeActResponse.status) {
    setUserStripeAccount({
      loading: false,
      found: true,
      account: stripeActResponse.data.account,
      accountBalance: stripeActResponse.data.accountBalance,
      lastRefresh: getUnixTimestamp(),
    });
  } else {
    setUserStripeAccount({
      loading: false,
      found: false,
      account: {},
      accountBalance: {},
      lastRefresh: getUnixTimestamp(),
    });
  }
};

export default loadUserStripeAccount;
