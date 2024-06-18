'use client'

import { Card } from '@tremor/react';

interface Props {
  title: string;
  headlineValue: string;
  difference: string;
  differencePercent: string;
  differencePeriod: string;
}

const CardHighlight: React.FC<Props> = ({ title, headlineValue, difference, differencePercent, differencePeriod }) => {
  return (
    <>
      <h3 className="text-tremor-default">{title}</h3>
      <p className="mt-1 text-3xl leading-9	font-semibold break-all	">{headlineValue}</p>
      <p className="mt-1 font-medium">
        <span className="text-emerald-700 dark:text-emerald-500">
          {difference} ({differencePercent})
        </span>{' '}
        <span className="font-normal">{differencePeriod}</span>
      </p>
    </>
  );
};

export default CardHighlight;