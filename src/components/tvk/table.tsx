'use client';

import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TableRowData = Record<string, string|any|unknown>;

type ReusableTableProps = {
  title: string;
  headers: string[];
  data: TableRowData[];
  filterByKey?: string; // Optional: key to filter by (e.g., 'category')
};

export default function ReusableTable({
  title,
  headers,
  data,
  filterByKey,
}: ReusableTableProps) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const allFilterValues = filterByKey
    ? Array.from(new Set(data.map((item) => item[filterByKey])))
    : [];

  const filteredData =
    selectedFilter === 'All'
      ? data
      : data.filter((item) => item[filterByKey!] === selectedFilter);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {filterByKey && (
          <div className="flex justify-end items-center gap-4">
            <label htmlFor="category" className="font-medium">
              Filter by {filterByKey.charAt(0).toUpperCase() + filterByKey.slice(1)}:
            </label>
            <Select onValueChange={setSelectedFilter} defaultValue="All">
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {allFilterValues.map((val) => (
                  <SelectItem key={val} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.slice(0, 20).map((row, idx) => (
              <TableRow key={idx}>
                {headers.map((header) => (
                  <TableCell key={header}>{row[header] ?? '-'}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
