import React from 'react';

interface IUser {
  accountSetupComplete?: boolean;
  email?: string;
  firstName?: any;
  lastName?: any;
  userLoading?: any;
  loggedIn: boolean;
}

interface IUserContext {
  setUser: (user: IUser) => void;
  logoutUser: () => void;
  fbUser?: any;
  userAccount?: any;
  loggedIn?: boolean;
  userLoading?: boolean;
}

const defaultValue: IUserContext = {
  userAccount: {},
  fbUser: {},
  loggedIn: false,
  userLoading: true,
  setUser: () => {},
  logoutUser: () => {},
};

const UserContext = React.createContext(defaultValue);

export { UserContext };
export type { IUser, IUserContext };
