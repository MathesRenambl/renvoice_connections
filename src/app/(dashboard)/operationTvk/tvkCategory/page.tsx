"use client"
import Container from '@/components/ui/container'
import PageTitle from '@/components/ui/pageTitle'
import React, { useState } from 'react'
//import data from '@/data/tn_constituency_complaints.json'
import datas from '@/data/tn_constituency_complaints.json'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUp, LucideFileWarning, Phone, PhoneIncoming, PhoneOutgoing } from 'lucide-react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import InsightsTable from '@/components/tvk/insightsTable'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Categorycard from '@/components/tvk/categforycard'
import LineChartComponent from '@/components/tvk/LineChart'
import PieChartComponent from '@/components/tvk/PieChart'
import ComplaintTable from '@/components/tvk/insightsTable'
import { useParams, useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import BarChartComponent from '@/components/tvk/LineChart'
import AreaChartWithTabs from '@/components/tvk/AreaChart'



type Category = {
  booth_id: string;
  category: string;
  description: string;
  total: number;
  positive: number;
  negative: number;
  positive_pct: number;
  negative_pct: number;
};

type Constituency = {
  constituency_id: number;
  name: string;
  complianceCount: number;
  issueCount: number;
  improvementNeeded: string;
  improvementCount: number;
  phoneCallCount: number;
  positiveFeedbackPercent: number;
  negativeFeedbackPercent: number;
  memberName: string;
  memberDetails: string;
  total_complaints?: number;
  categories?: Category[];
  callCategory?: any[];
};

type District = {
  district_id: string;
  name: string;
  complianceCount: number;
  issueCount: number;
  improvementNeeded: string;
  improvementCount: number;
  phoneCallCount: number;
  positiveFeedbackPercent: number;
  negativeFeedbackPercent: number;
  topConcerns: string[];
  constituencies: Constituency[];
};

function TvkCategory() {
  const params = useParams();
  const searchParams = useSearchParams()
    const code = Number(searchParams.get('constituency_id')) ;
    const district_id = searchParams.get('districtId') 
  const [constituency,setConstituent] = useState('Chennai South')
  const categoryMap = {};
  
  // const allConstituencies = data.flatMap(district => district.constituencies);
 

const matched = datas.find(c => c.constituency_id === code);

console.log('dtas matched',matched)
if(!matched){
  return (
    <Container>
      <PageTitle title='Complaint Category' />
      <div className='flex-1 absolute top-72 left-[800px] flex items-center justify-center'>
        <div className='flex items-center gap-3 bg-red-100 border border-red-300 rounded-lg px-6 py-4'>
          <LucideFileWarning className="text-red-600" size={24} />
          <h2 className='text-red-700 font-semibold text-lg'>No Data Found</h2>
        </div>
      </div>
    </Container>
  )
}
  const sum = matched.categories.reduce((acc, item) => acc + item.total, 0);

  return (

    <Container>
        <PageTitle title={`Complaint Category - ${matched.name}`} description={`Complaints registered in ${matched.name}`}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/operationTvk/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/operationTvk/TvkConstiCard?districtId=${district_id}`}>Constituency</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PageTitle>
      {/* summary cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6'>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Complaints/FeedBacks</p>
                <p className="text-2xl font-bold text-black">
                
                    {sum}

                </p>
              </div>
              <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                <PhoneIncoming className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600"> Positive Feedbacks</p>
                <p className="text-2xl font-bold text-black">
                 {matched.positiveFeedbackPercent}%
                </p>
              </div>
              <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                <PhoneIncoming className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Negative FeedBack</p>
                <p className="text-2xl font-bold text-black">
                 {matched.negativeFeedbackPercent}%
                </p>
              </div>
              <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                <Phone className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Improvement count</p>
                <p className="text-2xl font-bold text-black">
                 {matched.improvementCount}
                </p>
              </div>
              <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* member info */}
        <Card className='my-5'>
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row gap-10'>
            <div>
                <p>Member Id: TVK-473829</p>
            <p>Name: A. S. Palani</p>
            <p>Position: District Secretary</p>
            
            </div>
            <div>
              <p>Member Id: TVK-185642</p>
            <p>Name: P. Saravanan</p>
            <p>Position: Chennai Suburban District Secretary</p>
            
            </div>
            <div>
              <p>Member Id: TVK-902711</p>
            <p>Name: G.Balamurugan</p>
            <p>Position: District Secretaries</p>
      
            </div>
            
          
          </CardContent>
        </Card>
       
        <Tabs defaultValue="category" className="w-full">
          <TabsList className="w-fit">
            <TabsTrigger value="category">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            
          </TabsList>
         

        
         {/* Categories Card */}
          <TabsContent value='category'>
            <Card className='mt-5'>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                  <Categorycard districtId={district_id} constituency_id={code } complaintData={matched.categories}/>
              </CardContent>
            </Card>
          </TabsContent>
        {/*  Charts */}
        <TabsContent value='analytics'>
        <Card className='my-5'>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent >
            <div className="flex flex-col md:flex-row gap-5 my-5">
              <div className="flex-1 min-w-[300px]">
                <BarChartComponent complaintData={matched.categories} />
              </div>
              <div className="flex-2 min-w-[300px]">
                <PieChartComponent complaintData={matched.categories} />
              </div>
            </div>
            
                
                  <AreaChartWithTabs/>
               
            
          </CardContent>
        </Card>
          
        </TabsContent>
        
      </Tabs>
        

        {/* Recent calls table */}
        <ComplaintTable categories={matched.categories}/>
    </Container>
  )

}

export default TvkCategory
