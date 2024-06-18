'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

interface Props {
  title: string;
  headers: string[];
  rows: object[];
  keyIndex: string;
  formatter: Function;
}
function valueFormatter(value: any) { return value }
const SimpleTable: React.FC<Props> = ({ title, headers, rows, keyIndex, formatter }) => {
  console.log('rows', headers);
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