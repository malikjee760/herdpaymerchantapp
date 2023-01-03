import { Request, Response } from 'express';
import axios from 'axios';

const createExpressAccount = async (req: Request, res: Response) => {
  // @ts-ignore
  axios({
    method: 'post',
    url: `${process.env.HERDPAY_API_BASE}/api/stripe/createMerchantExpressAccount`,
    headers: {
      'x-herdpay-merchant-token': req.headers['x-herdpay-merchant-token'],
    },
  })
    .then((response) => {
      const { data = {} } = response;
      return res.send(data);
    })
    .catch((e) => {
      if (e.response?.status === 400) {
        return res.status(400).send(e.response.data);
      }
      return res.sendStatus(500);
    });
};

export default createExpressAccount;
