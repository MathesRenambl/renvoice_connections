import { AlertCircle, ArrowRight } from 'lucide-react'
import { Badge } from '../ui/badge'
import React from 'react'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { useRouter } from 'next/navigation'

function UpcomingPayments({upcomingPayment}) {
  const route=useRouter()
  return (
    <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-black/75 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Upcoming Payment Details
            </CardTitle>
            <CardDescription>Current billing cycle information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Estimated Amount</p>
                <p className="text-xl md:text-2xl font-bold text-black/75">₹{upcomingPayment.estimatedAmount.toFixed(2)}</p>
                <Badge variant="outline" className="border-black text-black/75">
                  Due: {upcomingPayment.dueDate}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Usage To Date</p>
                <p className="text-lg font-semibold text-black/75">{upcomingPayment.callsToDate} calls</p>
                <p className="text-sm text-gray-500">{upcomingPayment.minutesToDate} minutes</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Billing Period</p>
                <p className="text-lg font-semibold text-black/75">{upcomingPayment.daysRemaining} days remaining</p>
                <Button variant="outline" className="border-black text-black/75 hover:bg-gray-50"
                onClick={()=>{
                  route.push('/payments')
                }}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
  )
}

export default UpcomingPayments
