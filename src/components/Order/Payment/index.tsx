import React, { useState, useEffect } from 'react';
import { Button } from '../../../componentLibrary';
import HerdLogo from '../../../componentLibrary/molecules/HerdLogo';

interface IPaymentProps {
  order: any;
  goToNextStep: () => void;
}
const Payment = (props: IPaymentProps) => {
  const { order, goToNextStep } = props;
  return (
    <div>
      <HerdLogo />
      <p>Payment page will be displayed here</p>
      <p>{JSON.stringify(order)}</p>
      <Button
        gaTag={'order_payment_continue'}
        onClick={goToNextStep}
        className={'horizontal-center'}
      >
        Continue
      </Button>
    </div>
  );
};

export default Payment;
