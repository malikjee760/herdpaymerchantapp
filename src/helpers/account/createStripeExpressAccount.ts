import * as React from 'react';

import axios from 'axios';
import { IFunctionResponse } from '../../types';

const createStripeExpressAccount = (
  merchantToken: string,
): Promise<IFunctionResponse> => {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: '/api/stripe/createExpressAccount',
      headers: {
        'x-herdpay-merchant-token': merchantToken,
      },
    })
      .then((response) => {
        // @ts-ignore
        return resolve(response.data);
      })
      .catch((e) => {
        window.alert('An error occurred, please try again later');
        // @ts-ignore
        return resolve({ status: false });
      });
  });
};

export default createStripeExpressAccount;
