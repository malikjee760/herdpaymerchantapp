import * as React from 'react';
import axios from 'axios';
import { IFunctionResponse } from '../../types';

const completeAccountSetup = (
  merchantToken: string,
): Promise<IFunctionResponse> => {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: '/api/merchant/completeAccountSetup',
      headers: {
        'x-herdpay-merchant-token': merchantToken,
      },
    })
      .then(() => {
        return resolve({ status: true });
      })
      .catch((e) => {
        window.alert('An error occurred, please try again later');
        return resolve({ status: false });
      });
  });
};

export default completeAccountSetup;
