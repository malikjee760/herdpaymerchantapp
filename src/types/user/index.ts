export interface IUser {
  confirmationSalt: string;
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  stripeID: string;
  timeCreatedUnix: number;
  confirmationCode: string;
  confirmationExpiration: number;
  demographics?: any;
}

export interface IUserResponse {
  status: boolean;
  message?: string;
  data?: any;
}

export interface IPhoneValidation {
  isValid: boolean;
  phoneNumber: string;
}

export interface ITokenValidation {
  isValid: boolean;
  isExpired?: boolean;
  token?: any;
}
