import completeAccountSetup from './completeAccountSetup';
import getMerchantStripeAccount from './getMerchantStripeAccount';
import getMerchantAccount from './getMerchantAccount';
import updateMerchantAccount from './updateMerchantAccount';
import logInMerchant from './logInMerchant';

import express from 'express';
import * as middleware from '../../middleware';
const merchantRouter = express.Router();

merchantRouter.post(
  '/getMerchantAccount',
  middleware.userAuthentication.requireFbToken,
  getMerchantAccount,
);
merchantRouter.post(
  '/getMerchantStripeAccount',
  middleware.userAuthentication.requireFbToken,
  getMerchantStripeAccount,
);
merchantRouter.post(
  '/updateMerchantAccount',
  middleware.userAuthentication.requireFbToken,
  updateMerchantAccount,
);
merchantRouter.post(
  '/completeAccountSetup',
  middleware.userAuthentication.requireFbToken,
  completeAccountSetup,
);

export {
  getMerchantAccount,
  logInMerchant,
  updateMerchantAccount,
  completeAccountSetup,
  getMerchantStripeAccount,
  merchantRouter,
};
