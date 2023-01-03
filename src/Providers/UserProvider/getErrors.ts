interface IErrorRespond {
  phone: string;
  code: string;
}
const getErrors = (code: string): IErrorRespond => {
  switch (code) {
    case 'auth/invalid-phone':
      return { phone: 'Invalid phone', code: '' };
    case 'auth/too-many-requests':
      return { phone: 'To many requests, try again later', code: '' };
    default:
      console.log(code);
      window.alert('An unknown error occurred');
      break;
  }
  return { phone: '', code: '' };
};

export default getErrors;
