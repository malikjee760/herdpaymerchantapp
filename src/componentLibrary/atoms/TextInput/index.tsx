import React from 'react';
import { TextInputAppearance } from './textInputStyles';
import TextField from '@mui/material/TextField';

interface TextInputProps {
  appearance?: TextInputAppearance;
  [x: string | number | symbol]: unknown;
}

/**
 * Styled `TextInput` component
 *
 * @property {TextInputAppearance} appearance - Appearance of the text input
 *
 * @property {string} type - Type of text input
 *
 * @property {any} children - Children of component
 *
 * */

function HerdPayTextInput({
  children,
  appearance = 'standard',
  ...rest
}: TextInputProps) {
  return <TextField variant={appearance} {...rest} />;
}

export default HerdPayTextInput;
