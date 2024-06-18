"use client"
import { BarChart, EventProps } from '@tremor/react';
import { useState } from 'react';
import { CodeBlock } from 'react-code-blocks';

import chartData from './subdata.json';


const chartdata = [
  {
    name: 'Topic 1',
    'Group A': 890,
    'Group B': 338,
    'Group C': 538,
    'Group D': 396,
    'Group E': 138,
    'Group F': 436,
  },
  {
    name: 'Topic 2',
    'Group A': 289,
    'Group B': 233,
    'Group C': 253,
    'Group D': 333,
    'Group E': 133,
    'Group F': 533,
  },
  {
    name: 'Topic 3',
    'Group A': 380,
    'Group B': 535,
    'Group C': 352,
    'Group D': 718,
    'Group E': 539,
    'Group F': 234,
  },
  {
    name: 'Topic 4',
    'Group A': 90,
    'Group B': 98,
    'Group C': 28,
    'Group D': 33,
    'Group E': 61,
    'Group F': 53,
  },
];



// # TODO GET THE IMPORT FILE JSON
// subdata.json



// work out the dimension names, skipping the index
const indexName = 'name';
const vals = chartdata[0];
let keys = Object.keys(vals);
keys.shift();


export default function BarChartUsageExampleWithClickEvent() {
  console.log(chartData);
  const [value, setValue] = useState<EventProps>(null);
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Closed Pull Requests
      </h3>
      <BarChart
        className="mt-6"
        data={chartdata}
        index={indexName}
        categories={keys}
        colors={['gray', 'blue', 'green', 'orange']}
        yAxisWidth={30}
        onValueChange={(v) => setValue(v)}
      />
    </>
  );
}