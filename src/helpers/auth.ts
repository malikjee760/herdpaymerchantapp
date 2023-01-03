import { auth } from './firebase/firebaseApp';
import axios from 'axios';

const refreshUser = async (setUser: any) => {
  const userResponse = await axios('/api/user/me');
  const newUser = userResponse.data;
  if (newUser.loggedIn) {
    setUser(newUser);
  } else {
    setUser({ loggedIn: false, userLoading: false });
  }
};

const getMerchant = (token: string) => {
  axios({
    method: 'post',
    url: '/api/merchant/getMerchantAccount',
    headers: {
      'x-herdpay-merchant-token': token,
    },
  });
};

const logInMerchant = (token: string) => {
  return new Promise((resolve) => {
    axios({
      method: 'get',
      url: '/api/log-in',
      headers: {
        'x-herdpay-merchant-token': token,
      },
    })
      .then(() => {
        return resolve(true);
      })
      .catch(() => {
        return resolve(false);
      });
  });
};

const signOut = (router: any, setUser: any) => {
  auth
    .signOut()
    .then(async () => {
      setUser({ loggedIn: false, userLoading: false });
      router.push('/log-in');
    })
    .catch((e) => console.log(e));
};

const verifyUser = (user: any, router: any) => {
  if (!user || user === null) {
    router.push('/log-in');
    return;
  } else {
    if (!user.emailVerified) {
      return { status: true };
    }
  }
};

export { getMerchant, logInMerchant, refreshUser, signOut, verifyUser };
