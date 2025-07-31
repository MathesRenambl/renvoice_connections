import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CreditCard, Phone, Clock, AlertCircle } from 'lucide-react'

function PaymentCards({currentUsage,upcomingPayment}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Bill</CardTitle>
              <CreditCard className="h-4 w-4 text-black/75" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-black/75">₹{currentUsage.currentBill.toFixed(2)}</div>
              <p className="text-xs text-gray-500">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Calls</CardTitle>
              <Phone className="h-4 w-4 text-black/75" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-black/75">{currentUsage.totalCalls.toLocaleString()}</div>
              <p className="text-xs text-gray-500">
                This billing cycle
              </p>
            </CardContent>
          </Card>

          <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Minutes</CardTitle>
              <Clock className="h-4 w-4 text-black/75" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-black/75">{currentUsage.totalMinutes.toLocaleString()}</div>
              <p className="text-xs text-gray-500">
                Avg {currentUsage.avgCallDuration} min/call
              </p>
            </CardContent>
          </Card>

          <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Upcoming Payment</CardTitle>
              <AlertCircle className="h-4 w-4 text-black/75" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-black/75">₹{upcomingPayment.estimatedAmount.toFixed(2)}</div>
              <p className="text-xs text-gray-500">
                Due in {upcomingPayment.daysRemaining} days
              </p>
            </CardContent>
          </Card>
        </div>
  )
}

export default PaymentCards
