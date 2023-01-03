import React, { useState, useEffect } from 'react';
import { Button } from '../../../componentLibrary';
import HerdLogo from '../../../componentLibrary/molecules/HerdLogo';

interface IOrderDetailsProps {
  order: any;
  goToNextStep: () => void;
}
const OrderDetails = (props: IOrderDetailsProps) => {
  const { order, goToNextStep } = props;
  return (
    <div>
      <HerdLogo />
      <p>Order details page will be displayed here</p>
      <p>{JSON.stringify(order)}</p>
      <Button
        gaTag={'order_details_continue'}
        onClick={goToNextStep}
        className={'horizontal-center'}
      >
        Continue
      </Button>
    </div>
  );
};

export default OrderDetails;
