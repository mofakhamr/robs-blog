'use client'

import { Card } from '@tremor/react';
import React from "react";

interface Props {
  data: [];
  dataFormatter: Function;
}

const MultiCards: React.FC<Props> = ({ data, dataFormatter }) => {
  return (
    <div id="yoy-cards" className='flex justify-center'>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
      {data.map((item: any) => (
        <Card key={item.name} className=''>
          <p className="font-medium text-gray-500">{item.name}</p>
          <div className="m-2 items-baseline space-x-2.5">
            <p className="text-3xl m-0 text-right leading-9 font-semibold ">{dataFormatter(item.stat)}</p>
            <span className={`br text-right text-tremor-default font-medium ${(item.changeType === 'positive')  ? 'text-emerald-700 dark:text-emerald-500' : 'text-red-700 dark:text-red-500'}`} >
              {item.change}
            </span>
          </div>
        </Card>
      ))}
    </div>
  </div>
  );
};

export default MultiCards;