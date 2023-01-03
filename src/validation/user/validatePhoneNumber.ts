import { IPhoneValidation } from '../../types/user';
import parsePhoneNumber from 'libphonenumber-js';

/**
 * @name validatePhoneNumber
 * Validates a user phone number using libphonenumber-js
 *
 * @param phoneNumber - User phone number
 * @param countryCode - User country code
 * @returns IPhoneValidation (Valid indicator and phone number)
 *
 * @internal
 */
const validatePhoneNumber = (
  phoneNumber: string,
  countryCode: string = 'US',
): IPhoneValidation => {
  const response = {
    isValid: false,
    phoneNumber,
  };
  // @ts-ignore
  const validatedPhone = parsePhoneNumber(phoneNumber, countryCode);
  if (validatedPhone && validatedPhone.isValid()) {
    response.isValid = true;
    response.phoneNumber = validatedPhone.number;
  }
  return response;
};

export default validatePhoneNumber;
