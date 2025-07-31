import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Eye, FileDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

function ConnectionTable({ConnectionHistory }) {
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
              Client ID
            </TableHead>
            <TableHead className="text-center py-3 px-4 font-medium text-black/75">
              Client Name
            </TableHead>
            <TableHead className="text-center py-3 px-4 font-medium text-black/75">
              Connection Status
            </TableHead>
            <TableHead className="text-center py-3 px-4 font-medium text-black/75">
              Last Active
            </TableHead>
            <TableHead className="text-center py-3 px-4 font-medium text-black/75">
              Invoice (PDF)
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ConnectionHistory.map((client) => (
            <TableRow
              key={client.id}
              className="border-b border-gray-100 hover:bg-gray-50 text-center"
            >
              <TableCell className="py-2 px-4">{client.id}</TableCell>
              <TableCell className="py-2 px-4">{client.name}</TableCell>
              <TableCell className="py-2 px-4">
                {client.status === 'active' ? (
                  <span className=" bg-green-200 px-4 py-1 rounded-2xl text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="bg-red-200 px-4 py-1  rounded-2xl  text-red-500 font-medium">Inactive</span>
                )}
              </TableCell>
              <TableCell className="py-2 px-4">
                {new Date(client.lastActive).toLocaleString()}
              </TableCell>
              <TableCell className="py-2 px-4">
                {client.invoiceFile ? (
                  <a
                    href={`/invoices/${client.invoiceFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                    download
                  >
                    <FileDown className="w-4 h-4" />
                    PDF
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">Not available</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ConnectionTable;