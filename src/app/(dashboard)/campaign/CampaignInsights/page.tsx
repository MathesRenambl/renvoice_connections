import CallByCampaignId from '@/components/campaign/CallByCampaignId'
import ChartWaveDashboard from '@/components/campaign/CampaignPerformanceChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import datas from '@/data/data.json'
import Container from '@/components/ui/container'
import PageTitle from '@/components/ui/pageTitle'
import { Phone, PhoneCall, PhoneMissed, PhoneOutgoing } from 'lucide-react'
import React from 'react'

function CampaignInsights() {
    const data = [
        {Title:"Total Call Triggered",value:'458',description:"Totals Calls Initiated Today",icon:<Phone/>},
        {Title:"Accepted Calls",value:'358',description:"Calls that the Customer revieved",icon:<PhoneCall/>},
        {Title:"Rejected Calls",value:'100',description:"Calls rejected By the customer",icon:<PhoneMissed/>},
        {Title:"Remaining calls",value:'300',description:"Total calls to be Triggered ",icon:<PhoneOutgoing/>}
    ]
  return (
    <Container>
        <PageTitle title='Campaign Insights'>
            
        </PageTitle>
        
           < div className="flex flex-col gap-4 m-4 md:flex-row md:gap-4  ">
        {data.map((item,index)=>(
            <div key={index} className="w-full md:flex-1">
            <SummaryCard title={item.Title} value={item.value} description={item.description} icon={item.icon}/>
            </div>
        ))}
        </div>
        <ChartWaveDashboard />
        <CallByCampaignId callData={datas}/>
    </Container>
  )
}

function SummaryCard({ title, value, description, icon, }: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode;
  
  
}) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
      <div className="h-5 w-5 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
  );
}

export default CampaignInsights
