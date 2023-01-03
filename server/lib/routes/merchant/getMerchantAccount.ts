import { Request, Response } from 'express';
import axios from 'axios';

const getMerchantAccount = async (req: Request, res: Response) => {
  // @ts-ignore
  axios({
    method: 'post',
    url: `${process.env.HERDPAY_API_BASE}/api/merchant/getMerchantAccount`,
    headers: {
      'x-herdpay-merchant-token': req.headers['x-herdpay-merchant-token'],
    },
  })
    .then(() => {
      return res.send();
    })
    .catch((e) => {
      if (e.response?.status === 400) {
        return res.status(400).send(e.response.data);
      }
      return res.sendStatus(500);
    });
};

export default getMerchantAccount;
