/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import '../componentLibrary/css/index.css';
import Head from 'next/head';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../css/charts.css';
import { PolarisVizProvider } from '@shopify/polaris-viz';
import '@shopify/polaris-viz/build/esm/styles.css';

import { HerdPayColors } from 'herdpay-seedlings';
import axios from 'axios';
import UserProvider from '../Providers/UserProvider';

import { IUser, UserContext } from '../context/userContext';
import { auth } from '../helpers/firebase/firebaseApp';
import { useRouter } from 'next/router';

const theme = createTheme({
  palette: {
    primary: {
      main: HerdPayColors.light.primaryColor,
    },
  },
  typography: { fontFamily: 'Roboto' },
});

// This default export is required in a new `pages/_app.js` file.
// eslint-disable-next-line react/prop-types
// @ts-ignore
const HerdPayApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>HerdPay for Merchants</title>
        <meta property="og:title" content="HerdPay for Merchants" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/herdpay_logo.png" />
        <link rel="icon" type="image/x-icon" href="/herdpay_icon.ico" />
        <meta
          property="og:image"
          content="https://www.herdpay.com/lib_CDDJejSLapfUyUbF/pf7ejnxvc3pspvef.png?w=1200&amp;h=630&amp;fit=crop"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:description"
          content="Buy with friends, save together. 🤝"
        />
        <meta property="og:url" content="https://herdpay.com" />
        <meta property="og:image:width" content="1563" />
        <meta property="og:image:height" content="1563" />
      </Head>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <PolarisVizProvider>
            <Component {...pageProps} />
          </PolarisVizProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  );
};
export default HerdPayApp;
