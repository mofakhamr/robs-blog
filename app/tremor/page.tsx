"use client"
import { BarChart, EventProps } from '@tremor/react';
import { useState } from 'react';
import { CodeBlock } from 'react-code-blocks';

import CardHighlight from '@/components/charts/cardHighlight';
import MultiCards from '@/components/charts/multipleCards';
import SimpleTable from '@/components/charts/simpleTable';

import { Card, LineChart } from '@tremor/react';


import dataTopFive from '../python/data/top5.json';
import dataTopFiveTotals from '../python/data/top5_totals.json';
import dataAnnualTotals from '../python/data/annual_totals.json';
import { channel } from 'diagnostics_channel';
import Link from 'next/link';

const valueFormatter = (value: number) => (typeof value === 'string') ? value : `${Intl.NumberFormat('en').format(value).toString()}`;
const compactFormatter = (value: number) => (typeof value === 'string') ? value : `${Intl.NumberFormat('en', { notation: 'compact' }).format(value).toString()}`;


// work out the dimension names, skipping the index
const indexName = 'Year';
const data = dataTopFive;
const vals = data[0];
let keys = Object.keys(vals);
keys.shift();


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ExampleCharts() {
  const [value, setValue] = useState<EventProps>(null);

  // Let's do some counting.
  const plastic_idx = 'Single use plastic bags';
  const last = dataAnnualTotals.length - 1;


  // Create data for the Cards and calculate totals whilst we're at it.
  let prevSum: any;
  let allBagsTotal: number = 0;
  let plasticTotal: number = 0;
  let cardData: any = dataAnnualTotals.map((item: any) => {
    const curSum: any = Object.values(item).reduce((a: any, b: any) => a + b, 0);
    const sumValues: any = curSum - item.Year;
    allBagsTotal += sumValues;
    plasticTotal += item[plastic_idx];
    // Calculate
    const itemChange = sumValues - (prevSum ? prevSum : sumValues);
    const itemChangeDisplay = [
      (itemChange > 0) ? '+' : '',
      (itemChange != 0) ? compactFormatter(itemChange) : '',
    ]
    prevSum = sumValues;
    return {
      name: item.Year,
      stat: sumValues,
      change: itemChangeDisplay.join(''),
      changeType: (itemChange > 0) ? 'negative' : 'positive',
    }
  }, { prevSum, runningTotal: allBagsTotal, plasticTotal })
  cardData.push({ name: "Total", stat: allBagsTotal, change: '', changeType: 'negative' });

  const summaryData = {
    firstYear: dataAnnualTotals[0]['Year'],
    lastYear: dataAnnualTotals[last]['Year'],
    firstValue: dataAnnualTotals[0][plastic_idx],
    lastValue: dataAnnualTotals[last][plastic_idx],
    sumTotal: allBagsTotal,
    sumPlastic: plasticTotal,
    plasticReduction: dataAnnualTotals[0][plastic_idx] - dataAnnualTotals[last][plastic_idx],
    plasticReductionPc: ((dataAnnualTotals[0][plastic_idx] - dataAnnualTotals[last][plastic_idx]) / dataAnnualTotals[0][plastic_idx] * 100).toFixed(2) ,
    totalYears: dataAnnualTotals[last]['Year'] - dataAnnualTotals[0]['Year'],
  };


  return (
    <div className="lg:mx-32 lg mt-5 rounded-lg p-4 sm:p-10 bg-white dark:bg-gray-950">
      <h1>Single use plastic bag usage</h1>
      <p>Source: <Link
        href={"https://s3.eu-west-1.amazonaws.com/data.defra.gov.uk/Waste/Single_use_carrier_bag_England_data_2016_17_to_2022_23.csv"}
        className='hyperlink'
      >data.defra.gov.uk</Link></p>
      <p>In the period <span className='highlight'>{summaryData.firstYear} to {summaryData.lastYear}</span>: companies have reported a total of <span className='highlight'>{valueFormatter(summaryData.sumPlastic)} ({compactFormatter(summaryData.sumPlastic)})</span> single-use plastic bags being distributed.</p>
      <p>The annual distribution is now <span className='highlight'>{valueFormatter(summaryData.lastValue)} ({compactFormatter(summaryData.lastValue)})</span> a decrease of <span className='highlight'>{`${valueFormatter(summaryData.plasticReduction)}`} ({`${compactFormatter(summaryData.plasticReduction)}`}) or {summaryData.plasticReductionPc}%</span></p>

      {/* YoY Cards */}
      <MultiCards
        title={""}
        data={cardData}
        dataFormatter={compactFormatter}
      />

      {/* Company by year - Plastic only */}
      <div className=''>
        <BarChart
          className="mt-6"
          data={data}
          index={indexName}
          categories={keys}
          colors={['gray', 'blue', 'green', 'orange', 'pink', 'purple', 'lightgreen', 'lightblue', 'black']}
          yAxisWidth={85}
          valueFormatter={valueFormatter}
          onValueChange={(v) => {
            setValue(v);
          }}
        />
      </div>

      <div id="allbags" className='mt-10'>


        {/* Totals chart */}
        <LineChart
          data={dataTopFive}
          index="Year"
          categories={keys}
          colors={['green', 'purple', 'red', 'blue', 'orange']}
          valueFormatter={valueFormatter}
          yAxisWidth={85}
          onValueChange={() => { }}
          className="mt-6 hidden h-96 sm:block"
        />
        <LineChart
          data={dataTopFive}
          index="Year"
          categories={keys}
          colors={['green', 'purple', 'red', 'blue', 'orange']}
          valueFormatter={valueFormatter}
          showYAxis={false}
          showLegend={false}
          startEndOnly={true}
          className="mt-6 h-72 sm:hidden"
        />

        {/* Totals table */}
        <SimpleTable
          title={""}
          headers={Object.keys(dataTopFiveTotals[0])}
          rows={dataTopFiveTotals}
          keyIndex={"Company name"}
          formatter={valueFormatter}
        />
      </div>






    </div>
  );
}