import { Request, Response } from 'express';
import axios from 'axios';

const logInMerchant = async (req: Request, res: Response) => {
  // @ts-ignore
  axios({
    method: 'post',
    url: `${process.env.HERDPAY_API_BASE}/api/merchant/getMerchantAccount`,
    headers: {
      'x-herdpay-merchant-token': req.headers['x-herdpay-merchant-token'],
    },
  })
    .then((response) => {
      const { data = {} } = response.data;
      const merchantInfo = data;
      if (!merchantInfo) {
        return res.sendStatus(403);
      }
      return res.send(merchantInfo);
    })
    .catch((e) => {
      console.log(e);
      if (e.response?.status === 400) {
        return res.status(400).send({ loggedIn: false, data: e.response.data });
      }
      return res.status(500).send({ loggedIn: false });
    });
};

export default logInMerchant;
