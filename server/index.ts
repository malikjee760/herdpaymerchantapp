// @ts-ignore
import express, { Request, Response } from 'express';
import 'dotenv/config';
import next from 'next';
import * as routes from './lib/routes';
// @ts-ignore
import bodyParser from 'body-parser';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
console.log(process.env.PORT);
const port = process.env.PORT || 8080;

(async () => {
  //
  try {
    await app.prepare();
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    if (process.env.NODE_ENV === 'production') {
      server.set('trust proxy', 1);
    }

    /* BFF Routes*/
    /* Merchant */
    server.use('/api/merchant', routes.merchant.merchantRouter);

    /* Stripe */
    server.use('/api/stripe', routes.stripe.stripeRouter);

    /* User */
    server.use('/api/user', routes.user.userRouter);

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
