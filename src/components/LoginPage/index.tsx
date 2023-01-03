import React, { useContext, useState } from 'react';

import PhoneEntry from '../../componentLibrary/organisms/PhoneEntry';
import axios from 'axios';
import validatePhoneNumber from '../../validation/user/validatePhoneNumber';
import Typography from '@mui/material/Typography';
import PhoneConfirmation from '../../componentLibrary/organisms/PhoneConfirmation';
import { UserContext } from '../../context/userContext';
import Container from '@mui/material/Container';
import HerdLogo from '../../componentLibrary/molecules/HerdLogo';

interface ILoginPageProps {
  goToNextStep?: () => void;
}

function LoginPage(props: ILoginPageProps) {
  const { goToNextStep = () => {} } = props;
  const { setUser } = useContext(UserContext);

  const [step, setStep] = useState('phoneInput');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState({});
  const [codeValid, setCodeValid] = useState(true);

  const submitPhone = (phoneNumber: string) => {
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      setError({
        hasError: true,
        feedbackText: 'Invalid phone number',
      });
    } else {
      setError({});
      axios({
        method: 'post',
        url: '/initiateLogin',
        data: {
          phoneNumber,
        },
      })
        .then(() => {
          setStep('codeInput');
          setCodeValid(true);
          setCode('');
        })
        .catch((e) => {
          if (e.response?.status === 400) {
            setError({
              hasError: true,
              feedbackText: e.response.data.message || 'Invalid',
            });
          } else {
            window.alert('An error occurred, please try again later');
          }
        });
    }
  };

  const submitCode = (fullCode: string) => {
    axios({
      method: 'post',
      url: '/validateLogin',
      data: {
        phoneNumber: phone,
        code: fullCode,
      },
    })
      .then((response) => {
        setUser(response.data);
        goToNextStep();
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setCodeValid(false);
        } else {
          window.alert('An error occurred, please try again later');
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ margin: 16 }}>
        <HerdLogo />
        <div style={{ marginBottom: 24 }}>
          {step === 'phoneInput' && (
            <PhoneEntry
              submitFunction={submitPhone}
              phone={phone}
              setPhone={setPhone}
              error={error}
            />
          )}
          {step === 'codeInput' && (
            <PhoneConfirmation
              showBack
              submitCode={submitCode}
              goBack={() => setStep('phoneInput')}
              phone={phone}
              code={code}
              setCode={setCode}
              isValid={codeValid}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;
