'use client';

import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function ComplaintCallTable({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Flatten all calls
  const allCalls = useMemo(() => {
    const calls = [];
    categories?.forEach((category) => {
      category.calls?.forEach((call) => {
        calls.push({
          booth_id: category.booth_id,
          number: call.callerNumber,
          description: call.transcript,
          emotional_state: call.emotional_state,
          category: category.category,
        });
      });
    });
    return calls;
  }, [categories]);

  // Unique category options
  const categoryOptions = useMemo(() => {
    const unique = new Set(categories?.map((c) => c.category));
    return ["All", ...Array.from(unique)];
  }, [categories]);

  const filteredCalls =
    selectedCategory === "All"
      ? allCalls
      : allCalls.filter((call) => call.category === selectedCategory);

  return (
    <Card className="p-4 my-5 bg-white rounded shadow-md overflow-x-auto">
      <CardHeader >
        <CardTitle className="text-lg font-semibold"> Recent Feedbacks</CardTitle>
        <div className='flex justify-end'>
        <Select  value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((cat) => (
              <SelectItem key={`${cat}`} value={`${cat}`}>
                {`${cat}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
      </CardHeader>

      {filteredCalls.length === 0 ? (
        <div className="text-gray-500 text-center py-6">No data available</div>
      ) : (
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booth ID</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Emotional State</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCalls.slice(0,10).map((call, index) => (
              <TableRow key={index}>
                <TableCell>{call.booth_id}</TableCell>
                <TableCell>{call.number}</TableCell>
                <TableCell>{call.description}</TableCell>
                <TableCell>{call.emotional_state}</TableCell>
                <TableCell>{call.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </CardContent>
      )}
    </Card>
  );
}
