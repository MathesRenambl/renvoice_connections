import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

function PerformanceTable({sampleData}:{sampleData:any}) {
  return (
    <div>
      <Card className="border-gray-200 mt-8 border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg">Agent Performance Summary</CardTitle>
            <CardDescription>Detailed performance metrics for all agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className='w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden bg-white'>
                <TableHeader className="bg-gray-100">
                  <TableRow >
                    <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Agent</TableHead>
                    <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Total Calls</TableHead>
                    <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Accepted</TableHead>
                    <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Rejected</TableHead>
                    <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Acceptance Rate</TableHead>
                    <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData.agentCallStatus.map((agent, index) => {
                    const acceptanceRate = ((agent.accepted / agent.total) * 100).toFixed(1);
                    return (
                      <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="px-6 py-4 text-sm text-gray-700 font-small">{agent.agent}</TableCell>
                        <TableCell className="px-6 py-4 text-sm text-gray-700 font-small">{agent.total}</TableCell>
                        <TableCell className="px-6 py-4 text-sm text-gray-700 font-small">{agent.accepted}</TableCell>
                        <TableCell className="px-6 py-4 text-sm text-gray-700 font-small">{agent.rejected}</TableCell>
                        <TableCell className="px-6 py-4 text-sm text-gray-700 font-small">{acceptanceRate}%</TableCell>
                        <TableCell className="px-6 py-4 text-sm text-gray-700 font-small">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            parseFloat(acceptanceRate) >= 80 
                              ? 'bg-green-100 text-green-800' 
                              : parseFloat(acceptanceRate) >= 70 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {parseFloat(acceptanceRate) >= 80 ? 'Excellent' : 
                             parseFloat(acceptanceRate) >= 70 ? 'Good' : 'Needs Improvement'}
                          </span>
                        </TableCell >
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default PerformanceTable
