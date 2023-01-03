import React from 'react';
import { StackedAreaChart } from '@shopify/polaris-viz';

const demoShopifyData = [
  {
    name: 'HerdPay',
    data: [
      {
        key: 'January',
        value: 4237,
      },
      {
        key: 'February',
        value: 5024,
      },
      {
        key: 'March',
        value: 5730,
      },
      {
        key: 'April',
        value: 5587,
      },
      {
        key: 'May',
        value: 5303,
      },
      {
        key: 'June',
        value: 5634,
      },
      {
        key: 'July',
        value: 3238,
      },
    ],
  },
  {
    name: 'Without HerdPay',
    data: [
      {
        key: 'January',
        value: 5663,
      },
      {
        key: 'February',
        value: 7349,
      },
      {
        key: 'March',
        value: 9795,
      },
      {
        key: 'April',
        value: 7396,
      },
      {
        key: 'May',
        value: 7028,
      },
      {
        key: 'June',
        value: 12484,
      },
      {
        key: 'July',
        value: 4878,
      },
    ],
  },
];

const Index = ({
  data = demoShopifyData,
  theme = 'Light',
  loading = false,
  error = false,
  ...rest
}) => {
  let backgroundClass = 'shopifyChart';
  let shopifyChartTheme = 'Default';
  switch (theme) {
    case 'Light':
      backgroundClass = 'shopifyChartLight';
      shopifyChartTheme = 'Light';
      break;
    default:
      break;
  }
  let state = 'Success';
  if (loading) {
    state = 'Loading';
  }
  if (error) {
    state = 'Error';
  }
  return (
    <div
      className={`chartContainer ${backgroundClass}`}
      style={{ height: 500, padding: 20 }}
    >
      <StackedAreaChart
        data={data}
        theme={shopifyChartTheme}
        {...rest} //@ts-ignore
        state={state}
      />
    </div>
  );
};

export default Index;
