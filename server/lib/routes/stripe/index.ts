import createExpressAccount from './createExpressAccount';

import express from 'express';
import * as middleware from '../../middleware';
const stripeRouter = express.Router();

stripeRouter.post(
  '/createExpressAccount',
  middleware.userAuthentication.requireFbToken,
  createExpressAccount,
);

export { createExpressAccount, stripeRouter };
