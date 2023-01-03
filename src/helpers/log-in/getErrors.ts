import * as React from 'react';

interface IErrorRespond {
  email: string;
  password: string;
}
const getErrors = (code: string): IErrorRespond => {
  switch (code) {
    case 'auth/invalid-email':
      return { email: 'Invalid email', password: '' };
    case 'auth/email-already-in-use':
      return { email: 'That email already exists', password: '' };
    case 'auth/weak-password':
      return {
        password: 'Use a password that is at least 6 characters',
        email: '',
      };
    case 'auth/wrong-password':
      return {
        password: 'Incorrect email or password',
        email: 'Incorrect email or password',
      };
    case 'auth/too-many-requests':
      return { password: 'Too many requests', email: '' };
    case 'auth/user-not-found':
      return {
        password: 'Incorrect email or password',
        email: 'Incorrect email or password',
      };
    default:
      console.log(code);
      break;
  }
  return { email: '', password: '' };
};

export default getErrors;
