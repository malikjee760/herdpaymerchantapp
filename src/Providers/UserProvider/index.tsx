import React, { useEffect, useState } from 'react';

import { auth } from '../../helpers/firebase/firebaseApp';
import { IUser, UserContext } from '../../context/userContext';
import axios from 'axios';

interface IAccountProviderProps {
  children: any;
}
const AccountProvider = ({ children }: IAccountProviderProps) => {
  const [user, setUser] = useState({
    loggedIn: false,
    userLoading: true,
    fbUser: {},
    userAccount: {},
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    auth
      .signOut()
      .then(async () => {
        setUser({
          loggedIn: false,
          userLoading: false,
          fbUser: {},
          userAccount: {},
        });
        setLoggedIn(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    auth.onAuthStateChanged(async function (fbUser) {
      setLoading(false);
      //logout();
      if (fbUser) {
        axios({
          method: 'get',
          url: '/api/user/me',
          headers: {
            // @ts-ignore
            'x-herdpay-merchant-token': fbUser.accessToken,
          },
        })
          .then((userResponse) => {
            const userAccount = userResponse.data;
            setLoggedIn(true);
            setUser({
              loggedIn: true,
              userLoading: false,
              fbUser: fbUser,
              userAccount: userAccount,
            });
          })
          .catch((e) => {
            console.log(e);
            setUser({
              loggedIn: false,
              userLoading: false,
              userAccount: {},
              fbUser: {},
            });
          });
      } else {
        setUser({
          loggedIn: false,
          userLoading: false,
          fbUser: {},
          userAccount: {},
        });
        setLoggedIn(false);
      }
    });
  }, []);

  const updateUser = (newUser: IUser) => {
    // @ts-ignore
    setUser(newUser);
  };

  return (
    <UserContext.Provider
      value={{ ...user, setUser: updateUser, logoutUser: logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AccountProvider;
