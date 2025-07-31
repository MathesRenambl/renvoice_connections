import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function PaymentTable({ transactionHistory }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-600">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-600"
          >
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="border-red-500 text-red-600">
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  return (
    <div className="overflow-x-auto">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="border-b border-gray-200 text-center">
            <TableHead className="text-center py-3 px-4 font-medium text-black/75">
              Date
            </TableHead>
            <TableHead className="text-center py-3 px-4 font-medium text-black/75">
              Cost
            </TableHead>
            <TableHead className="text-center py-3 px-4 font-medium text-black/75">
              Peak Hours
            </TableHead>
            <TableHead className="text-center py-3 px-4 font-medium text-black/75">
              Off-Peak Hours
            </TableHead>
            <TableHead className="text-center py-3 px-4 font-medium text-black/75">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionHistory.map((txn) => (
            <TableRow
              key={txn.id}
              className="border-b border-gray-100 hover:bg-gray-50 text-center"
            >
              <TableCell className="py-2 px-4">{txn.date}</TableCell>
              <TableCell className="py-2 px-4 font-semibold">
                ₹{txn.cost.toFixed(2)}
              </TableCell>
              <TableCell className="py-2 px-4">{txn.peakHours}</TableCell>
              <TableCell className="py-2 px-4">{txn.offPeakHours}</TableCell>
              <TableCell className="py-2 px-4">
                {getStatusBadge(txn.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PaymentTable;
