import { LineChart, PieChart } from 'recharts'
import React from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Line, Pie, Cell } from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import MonthlyCost from './monthly-cost-chart'

interface usageProps{
  data:any,
  type:string,
  showMonthlyCost?:boolean 
}

function UsageChart({ data, type = 'month',showMonthlyCost=true }:usageProps) {
  // Dynamic titles and descriptions based on type
  const getChartConfig = () => {
    switch (type) {
      case 'day':
        return {
          title: 'Daily Usage Trend',
          description: 'Daily call volume and costs',
          dataKey: 'day'
        }
      case 'week':
        return {
          title: 'Weekly Usage Trend',
          description: 'Weekly call volume and costs',
          dataKey: 'week'
        }
      case 'month':
      default:
        return {
          title: 'Monthly Usage Trend',
          description: 'Monthly call volume and costs',
          dataKey: 'month'
        }
    }
  }

  const chartConfig = getChartConfig()

  return (
    <div className={`grid grid-cols-1 ${data.length<=5&&'lg:grid-cols-2'} gap-6`}>
      {/* Usage Trend Chart */}
      <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-black/75">{chartConfig.title}</CardTitle>
          <CardDescription>{chartConfig.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey={chartConfig.dataKey} stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid black',
                  borderRadius: '6px'
                }}
              />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#000000"
                strokeWidth={2}
                name="Calls"
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#666666"
                strokeWidth={2}
                name="Cost ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {showMonthlyCost && <MonthlyCost usageData={data} type={type} />}
    </div>
  )
}

export default UsageChart
