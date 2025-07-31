
'use client'
import React, { useState } from 'react'
import { PhoneIncoming, PhoneOutgoing, ArrowLeft, Download, Calendar, Clock, User, Play, Pause, PhoneMissed, X, Volume2, View, Users, ChevronLeft, ChevronRight, TrendingUp, Star, MessageCircle, Heart, FileText, CheckCircle, Filter, Search } from 'lucide-react'
import { Phone, PhoneCall, Plus, PhoneOff } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
} from '@/components/ui/table'
import AudioWaveform from '@/components/ui/wavesurfer'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CallDetailsModal from '@/components/callData/callDetailsModal';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/charts"
import Container from '@/components/ui/container'
import CallHistoryPage from '../call-history/page'
import { CallData } from '@/components/callData/callDetailsModal';
import { useSearchParams } from 'next/navigation';

// Custom Card Components
const CallCard = ({ children, className = '' }) => (
  <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
)

const CallCardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)


const phoneNumber = '+91-9876543210'
const contactName = 'John'

const callHistory = [
  {
    "uId": 1,
    "campaignId": "cmp-001",
    "company": "CasaGrand",
    "des": "Handles property inquiries and sales",
    "agent": "Real Estate Agent",
    "agentKey": "realestateagent",
    "isActive": true,
    "agentNos": [
      {
        "number": "9876543201",
        "agentId": "realestateagent-1001",
        "callsMade": 120,
        "isActive": true,
        "callHistory": [
          {
            "callId": "cID1001",
            "userNo": 7247248713,
            "timestamp": "2025-07-03T09:30:00Z",
            "type": "OUTGOING",
            "status": "MISSED",
            "duration": 0,
            "transcription": [],
            "gender": null,
            "overall_performance_rating": null,
            "positive_feedback": null,
            "improvement_feedback": null,
            "communication_quality": null,
            "communication_feedback": null,
            "property_buying_interest": null,
            "emotional_state": null,
            "conversation_summary": null,
            "call_outcome": null
          },
          {
            "callId": "cID1002",
            "userNo": 7247248712,
            "timestamp": "2025-07-03T10:15:00Z",
            "type": "INCOMING",
            "status": "ANSWERED",
            "duration": 120,
            "audioUrl": '/audio/callLog.m4a',
            "transcription": [
              { "speaker": "agent", "text": "ஹலோ, காசா கிராண்ட்ல இருந்து பேசுறோம். சென்னையில வீடு இல்லனா ஃப்ளாட் வாங்க இன்ட்ரஸ்டடா இருந்தா எண் ஒன்றை அழுத்தவும்.", "language": "Tamil" },
              { "speaker": "agent", "text": "எங்க கிட்ட நல்லா ஆஃபர்ஸ்ல லேண்ட் இருக்கு. உங்க பிரிப்பர்ட் ஏரியா என்னன்னு சொல்லுங்க? சென்னையில எங்க பாக்குறீங்க?", "language": "Tamil" },
              { "speaker": "client", "text": "நான் இப்ப பெருங்குடியில லேண்ட் பாக்குறேன். அங்க ஏதாவது லேண்ட் இருக்கான்னு பாத்து சொல்லுங்க.",
      "language": "tamil" },
              { "speaker": "agent",  "text": "கரெக்டான இடத்துக்கு தான் கால் பண்ணிருக்கீங்க சார். எங்க கிட்ட இப்ப லேண்ட் எதுவும் இல்ல சார். ஆனா சூப்பரான அப்பார்ட்மெண்ட்ஸ் இருக்கு. உங்களுக்கு அப்பார்ட்மெண்ட் பத்தி டீடெயில்ஸ் வேணுமா?",
      "language": "tamil" },
              { "speaker": "client",  "text": "ஆ ஓகே. ஆனா பெருங்குடில தான் எனக்கு வேணும்.",
      "language": "tamil" },
              { "speaker": "agent", "text": "சரிங்க சார். பெருங்குடில உங்களுக்கு த்ரீ அண்ட் ஃபோர் பிஹெச் கே அப்பார்ட்மெண்ட்ஸ் இருக்கு. ஸ்டார்டிங் பிரைஸ் ₹60 லட்ச ரூபால இருந்து ஸ்டார்ட் ஆகுது. ஸ்கொயர் ஃபீட் கணக்குல சொல்லணும்னா, ஒரு ஸ்கொயர் ஃபீட்டுக்கு ₹6000 வரும். இது அப்போலோ ஹாஸ்பிடல் பக்கத்துலயே இருக்கு. 2026ல ஹேண்ட் ஓவர் பண்ணிருவோம்.",
      "language": "tamil" },
              { "speaker": "agent", "text": "சைட் விசிட் ஃபிக்ஸ் பண்ணிடலாமா? உங்க பேரு அண்ட் கன்வீனியன்ட் டைம் மட்டும் சொன்னா போதும்.",
      "language": "tamil" },
              { "speaker": "client", "text": "ஓகேயா? அதுக்கு முன்னாடி எனக்கு அங்க பார்க்கிங், வாட்டர் சப்ளை எல்லாம் எப்படி இருக்குன்னு சொல்லு.",
      "language": "tamil" },
              { "speaker": "agent",   "text": "கண்டிப்பா சார். கேளுங்க. பார்க்கிங்க்கு ஒரு கார் ஸ்பேஸ் ஒவ்வொரு வீட்டுக்கும் ஒதுக்கி இருக்கும். தண்ணி சப்ளை பத்தி கவலை வேணாம் சார். போர்வெல் வாட்டரும் இருக்கு. மெட்ரோ வாட்டரும் இருக்கு. உங்களுக்கு வேற ஏதாவது டீடெயில்ஸ் வேணுமா? இல்ல சைட் விசிட் பிக்ஸ் பண்ணலாமா?",
      "language": "tamil" },
              { "speaker": "client",   "text": "ஓகே, சைட் விசிட் வந்து இந்த வீக்கெண்ட் சண்டே மார்னிங் 7:00 கிளாக் பிக்ஸ் பண்ணிருங்க.",
      "language": "tamil" },
              { "speaker": "agent",   "text": "ஓகே சார். உங்க பேர் என்ன சொல்லுங்க? சண்டே காலையில 7:00 மணிக்கு சைட் விசிட் பிக்ஸ் பண்ணிடலாம். சரி சார், அப்போ உங்க பேரு அண்ட் சண்டே காலையில 7:00 மணிக்கு சைட் விசிட் கன்பார்ம் பண்ணிடுறேன். சரிங்களா? வேற ஏதாவது டீடெயில்ஸ் வேணுமா சார்?",
      "language": "tamil" },
              { "speaker": "client",  "text": "ஓகே. என் பேரு வந்து குமார்.",
      "language": "tamil" },
              { "speaker": "agent",  "text": "ஓகே குமார் சார். அப்போ உங்க பேரு குமார். சண்டே காலையில 7:00 மணிக்கு சைட் விசிட் கன்பார்ம் பண்ணிட்டேன். வேற ஏதாவது டீடெயில்ஸ் வேணுமா சார்?",
      "language": "tamil" },
              { "speaker": "client",  "text": "எனக்கு கேப்லாம் நீங்க அரேஞ்ச் பண்ணுவீங்களா? கேப், புட்லாம்?",
      "language": "tamil" },
              { "speaker": "agent",    "text": "ஆமா சார், உங்க வீட்ல இருந்து பிக்கப் அண்ட் டிராப் சர்வீஸ் இருக்கு. அதுவும் ஃப்ரீதான். உங்களுக்கு சாப்பாடு வேணும்னா நாங்க அரேஞ்ச் பண்ணி தரோம். ஆனா அதுக்கு கொஞ்சம் சார்ஜஸ் ஆகும். வேற ஏதாவது டீடெயில்ஸ் வேணுமா சார்?",
      "language": "tamil" },
              { "speaker": "client",      "text": "ஓகே வேற எதுவும் வேணாம், காலை கட் பண்ணிக்கலாம்.",
      "language": "tamil" },
              { "speaker": "agent",     "text": "உங்களுடைய நேரத்திற்கு நன்றி. எங்க டீம் உங்களை காண்டாக்ட் பண்ணுவாங்க.",
      "language": "tamil" }
            ],
            "gender": "male",
            "overall_performance_rating": "7/10",
            "positive_feedback": "The live agent effectively introduces the available properties and tries to match the properties with the customer's needs, showing good product knowledge.",
            "improvement_feedback": "The agent could have been more proactive in suggesting properties and addressing the customer's initial preference for land.",
            "communication_quality": "good",
            "communication_feedback":"The live agent's communication was clear and professional. The agent listened and responded appropriately to the customer's inquiries. The agent could have been more persuasive by highlighting the benefits of the apartments.",
            "property_buying_interest": "medium",
            "emotional_state": "neutral",
            "conversation_summary":  "The customer expressed interest in land in Perungudi but was open to considering apartments in the same area. The customer was concerned about parking and water supply. The agent offered detailed information about the apartments and arranged a site visit.",
            "call_outcome": "appointment_scheduled"
          }
        ]
      },
      {
        "number": "9876543202",
        "agentId": "realestateagent-1002",
        "callsMade": 85,
        "isActive": true,
        "callHistory": []
      },
      {
        "number": "9876543204",
        "agentId": "realestateagent-1004",
        "callsMade": 22,
        "isActive": false,
        "callHistory": []
      },
      {
        "number": "9876543205",
        "agentId": "realestateagent-1005",
        "callsMade": 20,
        "isActive": true,
        "callHistory": []
      },
      {
        "number": "9876543206",
        "agentId": "realestateagent-1006",
        "callsMade": 18,
        "isActive": false,
        "callHistory": []
      },
      {
        "number": "9876543207",
        "agentId": "realestateagent-1007",
        "callsMade": 15,
        "isActive": true,
        "callHistory": []
      },
      {
        "number": "9876543208",
        "agentId": "realestateagent-1008",
        "callsMade": 12,
        "isActive": true,
        "callHistory": []
      },
      {
        "number": "9876543209",
        "agentId": "realestateagent-1009",
        "callsMade": 10,
        "isActive": true,
        "callHistory": []
      },
      {
        "number": "9876543210",
        "agentId": "realestateagent-1010",
        "callsMade": 8,
        "isActive": true,
        "callHistory": []
      }
    ]
  },
  {
    "uId": 2,
    "company": "CasaGrand",
    "des": "Schedules appointments and meetings",
    "agent": "Appointment Booking",
    "agentKey": "appointbooking",
    "isActive": true,
    "agentNos": [
      {
        "number": "9876543211",
        "agentId": "appointbooking-2001",
        "callsMade": 65,
        "isActive": true,
        "callHistory": []
      },
      {
        "number": "9876543212",
        "agentId": "appointbooking-2002",
        "callsMade": 42,
        "isActive": true,
        "callHistory": []
      }
    ]
  },
  {
    "uId": 3,
    "company": "CasaGrand",
    "des": "Provides customer support and assistance",
    "agent": "Support",
    "agentKey": "support",
    "isActive": false,
    "agentNos": [
      {
        "number": "9876543213",
        "agentId": "support-3001",
        "callsMade": 78,
        "isActive": false,
        "callHistory": []
      }
    ]
  }
]

const Page = () => {
  const router = useRouter();
   const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState('desc')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [analyticsView, setAnalyticsView] = useState<'week' | 'month' | 'day'>('week');
  const [selectedCall, setSelectedCall] = useState(null)
  const [selectedTab, setSelectedTab] = useState<'calllogs' | 'analytics'>('calllogs');
  const [filter, setFilter] = useState({
    callType: 'ALL',
    status: 'ALL',
    fromDate: '',
    toDate: '',
    searchNumber: '',
    callId: '',
  });

  const callId = searchParams.get('callId');
  const userNo = searchParams.get('userNo');

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Flatten all calls from all agentNos across all agents
  const allCalls = callHistory.flatMap(agent =>
    agent.agentNos.flatMap(agentNo =>
      agentNo.callHistory.map(call => ({
        ...call,
        agentId: agentNo.agentId,
        agentNumber: agentNo.number,
        company: agent.company,
        campaignId: agent.campaignId,
        agentType: agent.agent
      }))
    )
  );
  // const sortedCalls = [...allCalls].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const filteredCalls = allCalls.filter(call => {
    const userNo = String(call.userNo || '');
    const agentNo = String(call.agentNumber || '');
    const callId = String(call.callId || '');
    const search = filter.searchNumber.toLowerCase();

    return (
      (filter.callType === 'ALL' || call.type === filter.callType) &&
      (filter.status === 'ALL' || call.status === filter.status) &&
      (!filter.fromDate || new Date(call.timestamp) >= new Date(filter.fromDate)) &&
      (!filter.toDate || new Date(call.timestamp) <= new Date(filter.toDate)) &&
      (!filter.searchNumber || userNo.includes(search) || agentNo.includes(search)) &&
      (!filter.callId || callId.toLowerCase().includes(filter.callId.toLowerCase()))
    );
  });
  const sortedCalls = [...filteredCalls].sort((a, b) => {
    return sortOrder === 'desc'
      ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });


  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedCalls = sortedCalls.slice(startIndex, startIndex + recordsPerPage);
  const totalPages = Math.ceil(sortedCalls.length / recordsPerPage);

  const [activeModalTab, setActiveModalTab] = useState<'conversation' | 'overview'>('conversation');

  const openModal = (call: CallData) => {
    setSelectedCall(call);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCall(null);
  };

  const totalCalls = filteredCalls.length;
  const completedCalls = filteredCalls.filter(call => call.status === 'ANSWERED').length;
  const missedCalls = filteredCalls.filter(call => call.status === 'MISSED').length;

  const totalDuration = filteredCalls.reduce((total, call) => {
    if (call.status === 'ANSWERED') {
      return total + call.duration;
    }
    return total;
  }, 0);

  const incomingCalls = filteredCalls.filter(call => call.type === 'INCOMING').length;
  const outgoingCalls = filteredCalls.filter(call => call.type === 'OUTGOING').length;

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Sample data for the chart
  const generateAnalyticsData = (view) => {
    const data = []

    if (view === 'day') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      days.forEach((day, index) => {
        data.push({
          period: day,
          totalCalls: Math.floor(Math.random() * 10) + 5,
          completedCalls: Math.floor(Math.random() * 8) + 3,
          missedCalls: Math.floor(Math.random() * 3) + 1,
          totalDuration: Math.floor(Math.random() * 60) + 20
        })
      })
    } else if (view === 'week') {
      for (let i = 1; i <= 4; i++) {
        data.push({
          period: `Week ${i}`,
          totalCalls: Math.floor(Math.random() * 30) + 20,
          completedCalls: Math.floor(Math.random() * 25) + 15,
          missedCalls: Math.floor(Math.random() * 8) + 2,
          totalDuration: Math.floor(Math.random() * 200) + 100
        })
      }
    } else {
      data.push({
        period: 'monthly',
        totalCalls: 85,
        completedCalls: 72,
        missedCalls: 13,
        totalDuration: 420
      })
    }
    return data
  }


  const chartData = generateAnalyticsData(analyticsView)

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getStatusColor = (status) => {
    return status === 'ANSWERED' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200';
  };

  const getTypeIcon = (type) => {
    return type === 'INCOMING' ? <PhoneCall className="w-4 h-4 text-blue-600" /> : <Phone className="w-4 h-4 text-green-600" />;
  };

  const resetFilters = () => {
    setFilter({
      callType: "ALL",
      status: "ALL",
      fromDate: "",
      toDate: "",
      searchNumber: "",
      callId: "",
    });
    setCurrentPage(1);
  };



  return (
    <Container >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md md:shadow-lg border-b border-gray-200 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* Title & Subtitle */}
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Call History</h1>
                <p className="text-base sm:text-lg text-gray-600 mt-2 flex justify-center sm:justify-start items-center gap-2">
                  <Users className="w-5 h-5" />
                  Conversation records and recordings
                </p>
              </div>

              {/* Back Button (top-right on large screens) */}
              {/* <div className="flex justify-center sm:justify-end">
                <button 
                  className="p-2 border rounded hover:bg-gray-100 transition-colors"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-5 h-5 text-black" />
                </button>
              </div> */}

            </div>
          </div>
        </div>


        {/* Contact Info */}
        <div className="border border-gray-200 rounded-xl p-6 mb-8 shadow-sm bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-4">
              <div className="border border-gray-300 p-3 rounded-full bg-gray-50">
                <User className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-md">Customer Number</p>
                <p className="text-lg font-semibold ">{userNo}</p>
              </div>
            </div>

          </div>
        </div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Calls</p>
                  <p className="text-2xl font-bold text-black">{totalCalls}</p>
                </div>
                <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                  <Phone className="w-6 h-6 text-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Answered Calls</p>
                  <p className="text-2xl font-bold text-black">{completedCalls}</p>
                </div>
                <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                  <Plus className="w-6 h-6 text-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Missed Calls</p>
                  <p className="text-2xl font-bold text-black">{missedCalls}</p>
                </div>
                <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                  <PhoneOff className="w-6 h-6 text-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Duration</p>
                  <p className="text-2xl font-bold text-black">
                    {formatTotalDuration(totalDuration)}
                  </p>
                </div>
                <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                  <Clock className="w-6 h-6 text-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Incoming Calls</p>
                  <p className="text-2xl font-bold text-black">{incomingCalls}</p>
                </div>
                <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                  <PhoneIncoming className="w-6 h-6 text-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Outgoing Calls</p>
                  <p className="text-2xl font-bold text-black">{outgoingCalls}</p>
                </div>
                <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                  <PhoneOutgoing className="w-6 h-6 text-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Filter */}
        <Card className="shadow-sm mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5" />
              Call Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Call Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Call Type</label>
                <Select value={filter.callType} onValueChange={(value) => setFilter({ ...filter, callType: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Types</SelectItem>
                    <SelectItem value="INCOMING">Incoming</SelectItem>
                    <SelectItem value="OUTGOING">Outgoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select value={filter.status} onValueChange={(value) => setFilter({ ...filter, status: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="ANSWERED">Answered</SelectItem>
                    <SelectItem value="MISSED">Missed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <Input
                  type="date"
                  value={filter.fromDate}
                  onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })}
                  className="w-full"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <Input
                  type="date"
                  value={filter.toDate}
                  onChange={(e) => setFilter({ ...filter, toDate: e.target.value })}
                  className="w-full"
                />
              </div>

              {/* Search Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Number</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Phone number..."
                    value={filter.searchNumber}
                    onChange={(e) => setFilter({ ...filter, searchNumber: e.target.value })}
                    className="pl-10 w-full"
                  />
                </div>
              </div>

              {/* Call ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Call ID</label>
                <Input
                  type="text"
                  placeholder="Call ID"
                  value={filter.callId}
                  onChange={(e) => setFilter({ ...filter, callId: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-6 flex justify-end">
              <Button onClick={resetFilters} variant="outline" size="sm">
                Reset All Filters
              </Button>
            </div>
          </CardContent>
        </Card>


        <Card className="shadow-sm">
          {/* Card Header — Static */}
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-6">
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedTab === 'calllogs' ? 'Call History' : 'Analytics'}
              </h2>

              {/* Tab Toggle Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTab('calllogs')}
                  className={`flex items-center gap-2 ${selectedTab === 'calllogs' ? 'bg-gray-100' : ''}`}
                >
                  <Phone className="w-4 h-4" />
                  Table
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTab('analytics')}
                  className={`flex items-center gap-2 ${selectedTab === 'analytics' ? 'bg-gray-100' : ''}`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Card Content — Conditional */}
          <CardContent>
            {selectedTab === 'analytics' ? (
              <>
                {/* Analytics Filter */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">Overview of call metrics over time</div>
                  <div className="flex gap-2">
                    {['month', 'week', 'day'].map((view: any) => (
                      <button
                        key={view}
                        onClick={() => setAnalyticsView(view)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${analyticsView === view
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                      </button>
                    ))}
                    <select
                      className={`px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded border transition-colors `}
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="desc">Latest First</option>
                      <option value="asc">Oldest First</option>
                    </select>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-4">
                  {[
                    { label: 'Total Calls', color: '#6663630d' },
                    { label: 'Completed', color: '#6a6c68bf' },
                    { label: 'Missed', color: '#d0cfcf' },
                    { label: 'Duration (min)', color: '#9c73f3' },
                  ].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-xs">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={chartData}
                    barSize={analyticsView === 'day' ? 80 : 28}
                    barGap={analyticsView === 'day' ? 20 : 8}
                    margin={{
                      top: 20,
                      right: analyticsView === 'day' ? 30 : 10,
                      left: analyticsView === 'day' ? 30 : 10,
                      bottom: 5,
                    }}
                  >
                    <XAxis
                      dataKey="period"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: analyticsView === 'day' ? 14 : 12,
                        fill: '#6b7280',
                      }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: analyticsView === 'day' ? 14 : 12,
                        fill: '#6b7280',
                      }}
                    />
                    <Tooltip  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                    <Bar dataKey="totalCalls" fill="oklch(55.3% 0.013 58.071)" radius={[4, 4, 0, 0]} name="Total Calls" />
                    <Bar dataKey="completedCalls" fill="oklch(44.2% 0.017 285.786)" radius={[4, 4, 0, 0]} name="Completed" />
                    <Bar dataKey="missedCalls" fill="oklch(70.5% 0.015 286.067)" radius={[4, 4, 0, 0]} name="Missed" />
                    <Bar dataKey="totalDuration" fill="oklch(21% 0.006 285.885)" radius={[4, 4, 0, 0]} name="Duration (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </>
            ) : (
              <>
                {/* Table View */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">CallId</TableHead>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead className="w-[140px]">Agent Number</TableHead>
                        {/* <TableHead className="w-[140px]">Customer Number</TableHead> */}
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[100px]">Duration</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time</TableHead>
                        <TableHead className="w-[120px]">Records</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedCalls.map((call, index) => {
                        const { date, time } = formatDateTime(call.timestamp);
                        return (
                          <TableRow
                            key={index}
                            className="hover:bg-gray-50 cursor-pointer"
                           
                          >
                            <TableCell className="font-mono text-sm">{call.callId}</TableCell>
                            <TableCell className='p-4'>
                              <div className="flex items-center gap-2">
                                {getTypeIcon(call.type)}
                                <span className="text-sm font-medium">
                                  {call.type === 'INCOMING' ? 'Incoming' : 'Outgoing'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              <Button
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`agentNumber`)
                                }}
                              >
                                {call.agentNumber}
                              </Button>
                            </TableCell>
                            {/* <TableCell className="text-sm">{call.userNo}</TableCell> */}
                            <TableCell>
                              <Badge className={`text-xs ${getStatusColor(call.status)}`}>
                                {call.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-sm">{formatDuration(call.duration)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                <span className="text-sm">{date}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{time}</TableCell>
                            <TableCell className="text-sm">
                              <Button
                                variant="outline"
                                size="sm"
                                className={`flex items-center gap-2 ${call.status === 'MISSED' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  call.status !== 'MISSED' && openModal(call); // pass the current call object
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>

                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Empty State */}
                {paginatedCalls.length === 0 && (
                  <div className="text-center py-10">
                    <PhoneOff className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-600">No call history found for this number</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, sortedCalls.length)} of {sortedCalls.length} calls
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

      </div>

      <CallDetailsModal
        isOpen={isModalOpen}
        call={selectedCall}
        onClose={closeModal}
      />

      {/* Audio Conversation Modal */}

    </Container>
  )
}

export default Page