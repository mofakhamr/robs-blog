'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import React from "react";

interface Props {
  headers: string[];
  rows: object[];
  keyIndex: string;
  formatter: Function;
}

const SimpleTable: React.FC<Props> = ({ headers, rows, keyIndex, formatter }) => {
  return (
    <>
      <Table className="mt-8">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            {headers.map((header) => (
              <TableHeaderCell key={header} className="text-right">{header}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item: any) => (
            <TableRow data-id={item[keyIndex]} key={item[keyIndex]}>
              {headers.map((header) => (
                <TableCell key={formatter(item[header])} className="text-right font-bold">{formatter(item[header])}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SimpleTable;