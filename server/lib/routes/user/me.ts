import { Request, Response } from 'express';
import { logInMerchant } from '../merchant';

const me = async (req: Request, res: Response) => {
  const token = req.headers['x-herdpay-merchant-token'];
  if (token) {
    await logInMerchant(req, res);
    return;
  }
  return res.sendStatus(403);
};

export default me;
