import axios from 'axios';

const updateAccount = (merchantUpdate: any, merchantToken: string) => {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: '/api/merchant/updateMerchantAccount',
      headers: {
        'x-herdpay-merchant-token': merchantToken,
      },
      data: {
        merchantUpdate,
      },
    })
      .then(() => {
        return resolve(true);
      })
      .catch((e) => {
        window.alert('An error occurred, please try again later');
        return resolve(false);
      });
  });
};

export default updateAccount;
