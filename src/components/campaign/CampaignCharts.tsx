import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Label,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import { CustomTooltip } from '../ui/customToolTip';

const pieData = [
  { name: 'Campaign 1', value: 420 },
  { name: 'Campaign 2', value: 410 },
  { name: 'Campaign 2', value: 400 },
];

const COLORS = ['#000000','#495057',  '#999999','' ];// Indigo tones

const lineData = [
  { time: '8 AM', calls: 20 },
  { time: '10 AM', calls: 45 },
  { time: '12 PM', calls: 80 },
  { time: '2 PM', calls: 60 },
  { time: '4 PM', calls: 30 },
  { time: '6 PM', calls: 50 },
];

export default function CampaignCharts() {
  return (
    <div className='flex flex-row gap-5'>
    <Card className="border-black/20 flex-2 min-w-[450px] bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-black/75 flex items-center">
          <PieChartIcon className="h-5 w-5 mr-2" />
          Campaign Distribution
        </CardTitle>
        <CardDescription> Calls Per Campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 h-64">
          {/* Donut Pie Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={60} 
                  label
                >
                  <Label
              value="Total calls 1230"
              position="center"
              style={{
                fontSize: '14px',
                fill: '#333',
                
              }}
            />
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
               <Tooltip content={<CustomTooltip/>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
           </div>
          </CardContent>
          </Card>

          {/* Line Chart */}
          <Card className="border-black/20 flex-1 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
  <CardHeader>
    <CardTitle className="text-black/75 flex items-center">
      <LineChartIcon className="h-5 w-5 mr-2" />
      Campaign Distribution
    </CardTitle>
    <CardDescription>Total Campaign Calls for the Past 24Hrs</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip content={<CustomTooltip/>} />
          <Legend />
          <Line type="monotone" dataKey="calls" stroke="#000000" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>

    </div>
  );
}
