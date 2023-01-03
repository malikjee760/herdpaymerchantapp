import React from 'react';
import Fab from '@mui/material/Fab';

interface ButtonProps {
  children: any;
  disabled?: boolean;
  variant?: string;
  color?: string;
}

/**
 * Styled `ActionButton` component
 *
 * @property {any} children - Children of component
 *
 * */

function HerdPayActionButton({ children, ...rest }: ButtonProps) {
  // @ts-ignore
  return <Fab {...rest}>{children}</Fab>;
}

export default HerdPayActionButton;
