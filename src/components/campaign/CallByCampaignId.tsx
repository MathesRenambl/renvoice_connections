import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

function CallByCampaignId({callData}:{callData:Array<any>}) {
 console.log(callData)
  return (
    
    <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Campaign History</CardTitle>
            <CardDescription>Call History of campaign </CardDescription>
          </CardHeader>
          <CardContent>
      <Table className='w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden bg-white'>
        <TableHeader className="bg-gray-100">
            <TableRow >
            <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                Agent No
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                User No
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
               Date/Time
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                Status
            </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
  {callData.map(call =>
    call.agentNos.map(agentNos =>
      agentNos.callHistory.map(element => (
        <TableRow key={`${agentNos.number}-${element.status}`}>
          <TableCell className="px-6 py-4 text-sm text-gray-700 font-small">{agentNos.number}</TableCell>
          <TableCell className="px-6 py-4 text-sm text-gray-700 font-small">{element.userNo}</TableCell>
          <TableCell className="px-6 py-4 text-sm text-gray-700 font-small">{element.timestamp}</TableCell>
          <TableCell className="px-6 py-4 text-sm text-gray-700 font-medium justify-center align-middle"><span 
          className={`${element.status==="MISSED"? "bg-red-300 text-red-800":"bg-green-300 text-green-800"} font-semibold rounded-full align-middle justify-center  p-1.5 `}>
            {element.status}</span></TableCell>
        </TableRow>
      ))
    )
  )}
</TableBody>

      </Table>
      </CardContent>
    </Card>
  )
}

export default CallByCampaignId
