import React from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart } from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { useMediaQuery } from '@/hooks/useMediaQuery'

function MonthlyCost({ usageData, type = 'month' }) {
  const desktop = useMediaQuery("desktop")
  const mobile = useMediaQuery("mobile")
  
  // Responsive bar size based on screen and data type
  const getBarSize = () => {
    if (mobile) {
      return type === 'day' ? 12 : type === 'week' ? 16 : 20
    }
    if (desktop) {
      return type === 'day' ? 18 : type === 'week' ? 25 : 30
    }
    // Tablet/default
    return type === 'day' ? 15 : type === 'week' ? 20 : 25
  }

  // Dynamic configuration based on type
  const getChartConfig = () => {
    switch (type) {
      case 'day':
        return {
          title: 'Daily Cost Analysis',
          description: 'Cost breakdown by day with call volume',
          dataKey: 'day',
          height: mobile ? 300 : 350
        }
      case 'week':
        return {
          title: 'Weekly Cost Analysis',
          description: 'Cost breakdown by week with call volume',
          dataKey: 'week',
          height: mobile ? 320 : 350
        }
      case 'month':
      default:
        return {
          title: 'Monthly Cost Analysis',
          description: 'Cost breakdown by month with call volume',
          dataKey: 'month',
          height: mobile ? 320 : 350
        }
    }
  }

  const chartConfig = getChartConfig()
  const barSize = getBarSize()

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border border-black rounded-md p-3 shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-slate-900 rounded-full mr-2"></span>
            Cost: ₹{data.cost}
          </p>
          <p className="text-sm text-gray-600">
            Calls: {data.calls.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Minutes: {data.minutes.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-black/20 bg-white md:shadow-md md:hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-3 md:p-6">
        <CardTitle className="text-black/75">
          {chartConfig.title}
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {chartConfig.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <ResponsiveContainer width="100%" height={chartConfig.height}>
          <BarChart 
            data={usageData} 
            margin={{
              top: 5,
              right: mobile ? 5 : 30,
              left: mobile ? 5 : 20,
              bottom: 5,
            }}
          >
            {!mobile && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" opacity={0.5} />
            )}
            <XAxis 
              dataKey={chartConfig.dataKey} 
              stroke="#666" 
              fontSize={mobile ? 10 : 12}
              angle={type === 'day' && mobile ? -45 : 0}
              textAnchor={type === 'day' && mobile ? 'end' : 'middle'}
              height={type === 'day' && mobile ? 60 : 30}
            />
            <YAxis 
              stroke="#666" 
              fontSize={mobile ? 10 : 12}
              width={mobile ? 40 : 60}
            />
            <Tooltip content={CustomTooltip} />
            <Bar 
              dataKey="cost" 
              fill="#020617" 
              name="Cost (₹)" 
              radius={[4, 4, 0, 0]}
              maxBarSize={barSize}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default MonthlyCost