import React from 'react';
import { ButtonAppearance } from './buttonsStyles';
import Button from '@mui/material/Button';
// @ts-ignore
import { analytics } from '../../../helpers/firebase/firebaseApp';
import { logEvent } from 'firebase/analytics';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  appearance?: ButtonAppearance;
  className?: string;
  gaTag: string;
  children: any;
  fullWidth?: boolean;
  [x: string | number | symbol]: unknown;
}

/**
 * Styled `Button` component
 *
 * @property {ButtonAppearance} appearance - Appearance of the button
 * @property {string} gaTag - Google analytics tag
 * @property {string} type - Type of button
 * @property {any} children - Children of component
 *
 * */

function HerdPayButton({
  children,
  type = 'button',
  appearance = 'primary',
  className = '',
  gaTag,
  onClick = () => {},
  ...rest
}: ButtonProps) {
  let variant: 'text' | 'outlined' | 'contained' = 'contained';
  switch (appearance) {
    case 'secondary':
      variant = 'outlined';
      break;
    case 'tertiary':
      variant = 'text';
      break;
    default:
      break;
  }

  const clickHandler = () => {
    // @ts-ignore
    onClick();
    // @ts-ignore
    logEvent(analytics, 'button_click', { item_id: gaTag });
  };

  if (!gaTag) {
    return <div>BUTTON MISSING GA TAG</div>;
  }
  return (
    <Button
      {...rest}
      type={type}
      className={`${appearance}Button ${className}`}
      variant={variant}
      onClick={clickHandler}
    >
      {children}
    </Button>
  );
}

export default HerdPayButton;
