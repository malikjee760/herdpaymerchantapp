import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, TextInput } from '../../index';

interface IPhoneError {
  hasError?: boolean;
  feedbackText?: string;
}
interface IPhoneEntryProps {
  submitFunction?: any;
  setPhone: any;
  phone: string;
  error: IPhoneError;
}

const PhoneEntry = (props: IPhoneEntryProps) => {
  const { submitFunction = () => {}, setPhone, phone, error = {} } = props;

  const sendPhoneCode = () => {
    submitFunction(phone);
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Sign up or log in
      </Typography>
      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <TextInput
          error={error.hasError}
          helperText={error.hasError && error.feedbackText}
          type={'tel'}
          appearance="filled"
          fullWidth
          id="phone"
          label="Phone number"
          name="phone"
          autoComplete="phone"
          value={phone}
          onChange={(e: any) => setPhone(e.target.value)}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          gaTag={'send_phone_code'}
          onClick={sendPhoneCode}
          disabled={phone === ''}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default PhoneEntry;
