import * as React from 'react';
import Typography from '@mui/material/Typography';

import { Button } from '../../index';
import dynamic from 'next/dynamic';
import { Link } from '@mui/material';

const ReactCodeInput = dynamic(import('react-code-input'));

interface IPhoneConfirmationProps {
  showBack?: boolean;
  submitCode: any;
  goBack?: any;
  phone: string;
  setCode: any;
  code: string;
  isValid: boolean;
}

const PhoneConfirmation = (props: IPhoneConfirmationProps) => {
  const {
    showBack,
    submitCode,
    goBack = () => {},
    phone,
    code,
    setCode,
    isValid,
  } = props;
  const numToShow = 4;
  const visibleNum = phone.substring(phone.length - numToShow);

  let buttonDisabled = code.toString().length !== 6;

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Verify identity
      </Typography>
      <Typography
        id="enter code"
        component="p"
        style={{ fontFamily: 'Roboto' }}
      >
        Enter the code sent to (***)***-{visibleNum}
      </Typography>
      <div
        className={'phoneCodeInput'}
        style={{ marginTop: 24, marginBottom: 24, textAlign: 'center' }}
      >
        <ReactCodeInput
          // @ts-ignore
          autoComplete="code"
          inputStyle={{
            borderRadius: 6,
            border: '1px solid lightgrey',
            boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 10px 0px',
            margin: 4,
            paddingLeft: 10,
            width: 36,
            height: 42,
            fontSize: 24,
            boxSizing: 'border-box',
            color: 'black',
            backgroundColor: 'white',
          }}
          inputStyleInvalid={{
            borderRadius: 6,
            border: '1px solid rgb(238, 211, 215)',
            boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 10px 0px',
            margin: 4,
            paddingLeft: 10,
            width: 36,
            height: 42,
            fontSize: 24,
            boxSizing: 'border-box',
            color: 'rgb(185, 74, 72)',
            backgroundColor: 'rgb(242, 222, 222)',
          }}
          type="text"
          fields={7}
          value={code}
          isValid={isValid}
          onChange={(e) => {
            setCode(e);
            if (e.toString().length === 7) {
              submitCode(e);
            }
          }}
          inputMode={'numeric'}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          gaTag={'phone_confirm_code_continue'}
          onClick={submitCode}
          disabled={buttonDisabled}
        >
          Continue
        </Button>
      </div>
      {showBack && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link onClick={goBack} style={{ cursor: 'pointer' }}>
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default PhoneConfirmation;
