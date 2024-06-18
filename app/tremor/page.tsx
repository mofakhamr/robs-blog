"use client"
import { BarChart, EventProps } from '@tremor/react';
import { useState } from 'react';
import { CodeBlock } from 'react-code-blocks';

import CardHighlight from '@/components/charts/cardHighlight';
import SimpleTable from '@/components/charts/simpleTable';

import { Card, LineChart } from '@tremor/react';


import dataTopFive from '../python/data/top5.json';
import dataTopFiveTotals from '../python/data/top5_totals.json';
import dataAnnualTotals from '../python/data/annual_totals.json';
import { channel } from 'diagnostics_channel';

// Format large numbers as compacted.
function compactNumberFormatter(value: number) {
  return Intl.NumberFormat('en', { notation: "compact" }).format(value)
}
const valueFormatter = (value: number) => (typeof value === 'string') ? value : `${Intl.NumberFormat('en').format(value).toString()}`;


// work out the dimension names, skipping the index
const indexName = 'Year';
const data = dataTopFive;
const vals = data[0];
let keys = Object.keys(vals);
keys.shift();

// const indexName = 'name';
// const data = chartdata;
// const vals = data[0];
// let keys = Object.keys(vals);
// keys.shift();

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
      (itemChange != 0) ? compactNumberFormatter(itemChange) : '',
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
    plasticReductionPc: ((dataAnnualTotals[0][plastic_idx] - dataAnnualTotals[last][plastic_idx]) / dataAnnualTotals[0][plastic_idx]).toFixed(2),
    totalYears: dataAnnualTotals[last]['Year'] - dataAnnualTotals[0]['Year'],
  };


  return (
    <div className="lg:mx-32 lg mt-5 rounded-lg p-4 sm:p-10 bg-white dark:bg-gray-950">

      <div id="plastic" className='flex justify-between'>
        {/* Summary Card */}
        <div className='w-1/6 mr-5'>
          <CardHighlight
            title={`Total plastic bags issued since ${summaryData.firstYear}`}
            headlineValue={Intl.NumberFormat('en').format(summaryData.sumPlastic)}
            difference={`-${compactNumberFormatter(summaryData.plasticReduction)}`}
            differencePercent={`-${summaryData.plasticReductionPc}%`}
            differencePeriod={`Past ${summaryData.totalYears} years`}
          />
        </div>

        {/* Company by year - Plastic only */}
        <div className='w-5/6'>
          <BarChart
            className="mt-6 w-5/6"
            data={data}
            index={indexName}
            categories={keys}
            colors={['gray', 'blue', 'green', 'orange', 'pink', 'purple', 'lightgreen', 'lightblue', 'black']}
            yAxisWidth={30}
            valueFormatter={valueFormatter}
            onValueChange={(v) => {
              setValue(v);
            }}
          />
        </div>
      </div>

      <div id="allbags" className='mt-10'>
        {/* YoY Cards */}
        <div id="yoy-cards" className='flex justify-center'>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
            {cardData.map((item: any) => (
              <Card key={item.name}>
                <p className="font-medium text-gray-500">{item.name}</p>
                <div className="mt-2 flex items-baseline space-x-2.5">
                  <p className="text-3xl leading-9 font-semibold ">
                    {compactNumberFormatter(item.stat)}
                  </p>
                  <span
                    className={classNames(
                      item.changeType === 'positive'
                        ? 'text-emerald-700 dark:text-emerald-500'
                        : 'text-red-700 dark:text-red-500',
                      'text-tremor-default font-medium',
                    )}
                  >
                    {item.change}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Totals chart */}
        <LineChart
          data={dataTopFive}
          index="Year"
          categories={keys}
          colors={['green', 'purple', 'red', 'blue', 'orange']}
          valueFormatter={valueFormatter}
          yAxisWidth={55}
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