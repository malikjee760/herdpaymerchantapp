import { Request, Response } from 'express';
import axios from 'axios';

const getOrder = async (req: Request, res: Response) => {
  const { orderID } = req.query;
  axios({
    method: 'post',
    url: `${process.env.HERDPAY_API_BASE}/api/order/getOrder`,
    data: {
      orderID,
    },
  })
    .then((response) => {
      return res.send(response.data);
    })
    .catch((e) => {
      console.log(e.response);
      console.log(e.response.status);
      if (e.response?.status === 400) {
        return res.status(400).send(e.response.data);
      }
      return res.sendStatus(500);
    });
};

export default getOrder;
