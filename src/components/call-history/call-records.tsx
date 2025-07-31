import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { CallLog } from "@/app/(dashboard)/(agents)/call-history/page";
import DataNotFound from "../ui/data-not-found";

interface CallRecordsTableProps {
  totalDocument: number;
  filteredCalls: CallLog[];
}

export default function CallRecordsTable({
  totalDocument,
  filteredCalls,
}: CallRecordsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Records</CardTitle>
        <CardDescription>
          Showing {filteredCalls?.length} of {totalDocument} calls
        </CardDescription>
      </CardHeader>
      {
        filteredCalls?.length === 0 ? (
          <DataNotFound
            title="No Call Records Found"
            message="There are no call records matching your search criteria."
          />
        ) : (
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className=" p-3 font-medium text-center">Agent</th>
                <th className="text-center p-3 font-medium">Phone Number</th>
                <th className="text-center p-3 font-medium">Date & Time</th>
                <th className="text-center p-3 font-medium">Duration</th>
                <th className="text-center p-3 font-medium">Status</th>
                {/* <th className="text-left p-3 font-medium">Cost</th>
                <th className="text-left p-3 font-medium">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {/* {filteredCalls.map((call) => (
                <tr key={call.id} className="border-b hover:bg-muted/50">
                  <td className="p-3">{call.agentName}</td>
                  <td className="p-3">{call.phoneNumber}</td>
                  <td className="p-3">
                    {call.date} at {call.time}
                  </td>
                  <td className="p-3">{call.duration}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        call.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {call.status === "completed" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {call.status === "completed" ? "Completed" : "Failed"}
                    </span>
                  </td>
                  <td className="p-3">{call.cost} credits</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </td>
                </tr>
              ))} */}
              {filteredCalls?.map((call) => (
                <tr key={call._id} className="border-b hover:bg-muted/50 text-center">
                  <td className="p-3">{call.agentName}</td>
                  <td className="p-3">{call.phoneNo}</td>
                  <td className="p-3">
                    {call.callDate} at {call.callTime}
                  </td>
                  <td className="p-3">{call.callDuration} sec</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex justify-evenly items-center rounded-full px-2 py-1 text-xs min-w-32 text-center ${
                        call.callStatus === "SUCCESS"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {call.callStatus === "SUCCESS" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {call.callStatus === "SUCCESS" ? "Completed" : "Failed"}
                    </span>
                  </td>
                  {/* <td className="p-3">{(call as any).cost ?? "0"} credits</td> */}
                  {/* <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>)}
    </Card>
  );
}
