import React, { useState, useEffect } from 'react';
import { Button } from '../../../componentLibrary';
import HerdLogo from '../../../componentLibrary/molecules/HerdLogo';

interface IOrderInfoProps {
  order: any;
  goToNextStep: () => void;
}
const OrderInfo = (props: IOrderInfoProps) => {
  const { order, goToNextStep } = props;
  return (
    <div>
      <HerdLogo />
      <p>Order info page will be displayed here</p>
      <p>{JSON.stringify(order)}</p>
      <Button
        gaTag={'order_info'}
        onClick={goToNextStep}
        className="horizontal-center"
      >
        Continue
      </Button>
    </div>
  );
};

export default OrderInfo;
