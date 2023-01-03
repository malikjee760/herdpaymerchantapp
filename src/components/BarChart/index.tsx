import React from 'react';

import { BarChart as ShopifyBarChart } from '@shopify/polaris-viz';

const demoShopifyData = [
  {
    name: 'Sales',
    data: [
      {
        key: 'Monday',
        value: 3,
      },
      {
        key: 'Tuesday',
        value: 7,
      },
      {
        key: 'Wednesday',
        value: 7,
      },
      {
        key: 'Thursday',
        value: 8,
      },
      {
        key: 'Friday',
        value: 14,
      },
      {
        key: 'Saturday',
        value: 21,
      },
      {
        key: 'Sunday',
        value: 6,
      },
    ],
  },
];

const ShopifyVizBarChart = ({
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
      {(data && data.length) || loading ? (
        <ShopifyBarChart
          data={data}
          theme={shopifyChartTheme}
          {...rest}
          //@ts-ignore
          state={state}
        />
      ) : (
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>
          No data
        </div>
      )}
    </div>
  );
};

export default ShopifyVizBarChart;
