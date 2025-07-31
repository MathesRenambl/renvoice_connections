"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Phone, PhoneCall, PhoneOff, Clock, Calendar, Filter, Search, ChevronLeft, ChevronRight, ArrowLeft, Users, PhoneIncoming, PhoneOutgoing, PhoneMissed, TrendingUp } from 'lucide-react';
import Container from '@/components/ui/container';
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
import CallDetailsModal from '@/components/callData/callDetailsModal';
import { CallData } from '@/components/callData/callDetailsModal';


const AgentCallHistoryPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCall, setSelectedCall] = useState(null)

  // Get parameters from URL
  const agentKey = searchParams.get('agentKey');
  const agentNumber = searchParams.get('agentNumber');
  console.log("Agent Key:", agentKey);
  console.log("Agent Number:", agentNumber);

  // Sample data - in real app, this would come from props or API based on agentKey
  const agentsData = [
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

  // Find the agent data based on agentKey
  const agentData = agentsData.find(agent => agent.agentKey === agentKey);

  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    date: '',
    searchNumber: '',
    fromDate: '',
    toDate: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Add selectedTab state for switching between calllogs and analytics
  const [selectedTab, setSelectedTab] = useState<'calllogs' | 'analytics'>('calllogs');

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const getAgentDisplayName = (agentKey) => {
    const names = {
      'realestateagent': 'Real Estate Agent',
      'appointmentbooking': 'Appointment Booking'
    };
    return names[agentKey] || agentKey;
  };

  // Get all call history for display
  const getAllCallHistory = () => {
    if (!agentData) return [];

    if (agentNumber) {
      // Show calls for specific agent number
      const agentNumberData = agentData.agentNos.find(num => num.number === agentNumber);
      return (agentNumberData?.callHistory || []).map(call => ({ ...call, agentNumber: agentNumberData?.number }));
    } else {
      // Show all calls for current agent
      return agentData.agentNos.flatMap(agentNum =>
        agentNum.callHistory.map(call => ({ ...call, agentNumber: agentNum.number }))
      );
    }
  };

  // Apply filters
  const filteredCalls = useMemo(() => {
    let calls = getAllCallHistory().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (filters.type !== 'all') {
      calls = calls.filter(call => call.type === filters.type);
    }

    if (filters.status !== 'all') {
      calls = calls.filter(call => call.status === filters.status);
    }

    // if (filters.date) {
    //   calls = calls.filter(call => 
    //     new Date(call.timestamp).toDateString() === new Date(filters.date).toDateString()
    //   );
    // }
    if (filters.fromDate && filters.toDate) {
      const from = new Date(filters.fromDate);
      const to = new Date(filters.toDate);
      to.setHours(23, 59, 59, 999); // include the whole end day

      calls = calls.filter(call => {
        const callDate = new Date(call.timestamp);
        return callDate >= from && callDate <= to;
      });
    }

    if (filters.searchNumber) {
      calls = calls.filter(call =>
        call.userNo.toString().includes(filters.searchNumber) ||
        (call.agentNumber && call.agentNumber.includes(filters.searchNumber))
      );
    }

    return calls;
  }, [agentData, agentNumber, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredCalls.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedCalls = filteredCalls.slice(startIndex, startIndex + recordsPerPage);

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
    setFilters({
      type: 'all',
      status: 'all',
      date: '',
      searchNumber: '',
      fromDate: '',
      toDate: ''
    });
    setCurrentPage(1);
  };

  const goBackToOverview = () => {
    router.push('/agentOverview');
  };

  // Handle case where agent data is not found
  if (!agentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <PhoneOff className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-lg font-semibold mb-2">Call Logs Not Found</h2>
            <p className="text-gray-600 mb-4">The requested agent data could not be found.</p>
            <Button onClick={goBackToOverview}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back to Overview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get current agent number data for summary
  const currentAgentNumber = agentNumber ? agentData.agentNos.find(num => num.number === agentNumber) : null;

  const analytics = useMemo(() => {
    const answeredCalls = filteredCalls.filter(call => call.status === "ANSWERED");
    const missedCalls = filteredCalls.filter(call => call.status === "MISSED");
    const withDuration = filteredCalls.filter(call => call.duration > 0);
    const avgDuration =
      withDuration.length > 0
        ? Math.round(withDuration.reduce((sum, call) => sum + call.duration, 0) / withDuration.length)
        : 0;

    return {
      totalCalls: filteredCalls.length,
      answeredCalls: answeredCalls.length,
      missedCalls: missedCalls.length,
      avgDuration,
      incoming: filteredCalls.filter(c => c.type === "INCOMING").length,
      outgoing: filteredCalls.filter(c => c.type === "OUTGOING").length,
    };
  }, [filteredCalls]);

 const openModal = (call: CallData) => {
    setSelectedCall(call);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCall(null);
  };

  return (
    <Container>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white shadow-md md:shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">


            {/* Agent Number Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-gray-50 rounded-lg px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Phone className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {agentNumber
                      ? `Agent Number: ${agentNumber}`
                      : `All ${getAgentDisplayName(agentKey)} Numbers`}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {currentAgentNumber && (
                  <Badge variant={currentAgentNumber.isActive ? "secondary" : "outline"}>
                    {currentAgentNumber.isActive ? "Active" : "Inactive"}
                  </Badge>
                )}
              </div>
            </div>

            {/* Analytics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              <Card className="shadow-sm w-fit  h-fit">
                <CardContent className="p-4 ">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Calls</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.totalCalls}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm w-fit  h-fit">
                <CardContent className="p-4">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <PhoneIncoming className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Incoming</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.incoming}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm w-fit  h-fit">
                <CardContent className="p-4">
                  <div className="flex items-center  gap-5">

                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <PhoneOutgoing className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Outgoing</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.outgoing}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm w-fit  h-fit">
                <CardContent className="p-4">
                  <div className="flex items-center  gap-5">

                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <PhoneCall className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Answered</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.answeredCalls}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm w-fit  h-fit">
                <CardContent className="p-4">
                  <div className="flex items-center  gap-5">

                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <PhoneMissed className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Missed</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.missedCalls}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm w-fit  h-fit">
                <CardContent className="p-4">
                  <div className="flex items-center  gap-5">

                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Dur</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatDuration(analytics.avgDuration)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>


        <div className="max-w-7xl mx-auto py-6">
          <div className="space-y-6">
            {/* Filters */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Filter className="w-5 h-5" />
                  Call Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Call Type</label>
                    <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="INCOMING">Incoming</SelectItem>
                        <SelectItem value="OUTGOING">Outgoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="ANSWERED">Answered</SelectItem>
                        <SelectItem value="MISSED">Missed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <Input
                      type="date"
                      value={filters.date}
                      onChange={(e) => setFilters({...filters, date: e.target.value})}
                      className="w-full"
                    />
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                    <Input
                      type="date"
                      value={filters.fromDate}
                      onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                    <Input
                      type="date"
                      value={filters.toDate}
                      onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Number</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Phone number..."
                        value={filters.searchNumber}
                        onChange={(e) => setFilters({ ...filters, searchNumber: e.target.value })}
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={resetFilters} variant="outline" size="sm">
                    Reset All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>



            {/* Call History Table and Analytics conditional rendering*/}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-6">
                  {/* Left Side Title */}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedTab === 'calllogs' ? 'Call History' : 'Analytics'}
                  </h2>

                  {/* Right Side Tab Buttons */}
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
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">CallId</TableHead>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead className="w-[140px]">Agent Number</TableHead>
                        <TableHead className="w-[140px]">Customer Number</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[100px]">Duration</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time</TableHead>
                        <TableHead className="w-[120px]">Records</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedCalls.map((call: any, index) => {
                        const { date, time } = formatDateTime(call.timestamp);
                        return (
                          <TableRow
                            key={index}
                            className="hover:bg-gray-50 cursor-pointer"
                            // onClick={() => router.push(`Calldata?callId=${call.callId}`)}
                             onClick={() => router.push(`Calldata?callId=${call.callId}&userNo=${call.userNo}`)}
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
                            <TableCell className="text-sm">{call.userNo}</TableCell>
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

                {filteredCalls.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <PhoneOff className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No calls found matching your criteria</p>
                  </div>
                )}

                {/* Pagination */}
                {filteredCalls.length > 0 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, filteredCalls.length)} of {filteredCalls.length} calls
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
        <CallDetailsModal
        isOpen={isModalOpen}
        call={selectedCall}
        onClose={closeModal}
      />

    </Container>
  );
};

export default AgentCallHistoryPage;