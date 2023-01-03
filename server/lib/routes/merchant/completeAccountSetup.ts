import { Request, Response } from 'express';
import axios from 'axios';

const completeAccountSetup = async (req: Request, res: Response) => {
  // @ts-ignore
  axios({
    method: 'post',
    url: `${process.env.HERDPAY_API_BASE}/api/merchant/completeAccountSetup`,
    headers: {
      'x-herdpay-merchant-token': req.headers['x-herdpay-merchant-token'],
    },
  })
    .then(() => {
      return res.send();
    })
    .catch((e) => {
      console.log(e.response.data);
      if (e.response?.status === 400) {
        return res.status(400).send(e.response.data);
      }
      return res.sendStatus(500);
    });
};

export default completeAccountSetup;
