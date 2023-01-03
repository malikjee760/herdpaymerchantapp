import axios from 'axios';
import { IFunctionResponse } from '../../types';

const getStripeAccount = (
  merchantToken: string,
): Promise<IFunctionResponse> => {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: '/api/merchant/getMerchantStripeAccount',
      headers: {
        'x-herdpay-merchant-token': merchantToken,
      },
    })
      .then((response) => {
        return resolve(response.data);
      })
      .catch((e) => {
        return resolve({ status: false });
      });
  });
};

export default getStripeAccount;
