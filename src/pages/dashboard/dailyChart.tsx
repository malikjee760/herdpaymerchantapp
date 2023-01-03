import * as React from 'react';
import Title from './title';

import BarChart from '../../components/BarChart';

export default function Chart() {
  return (
    <div>
      <Title>Today</Title>
      <BarChart data={[]} />
    </div>
  );
}
