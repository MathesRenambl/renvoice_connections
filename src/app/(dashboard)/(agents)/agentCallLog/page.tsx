
"use client";


import React, { useState, useMemo,useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Phone,
  PhoneCall,
  PhoneMissed,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Users,
  Activity,
  TrendingUp,
  Calendar,
  PhoneOff,
  MessageCircle,
  CheckCircle,
  Volume2,
  Download,
  AudioWaveform,
  User,
  Star,
  X
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Container from '@/components/ui/container';
import { useRouter } from 'next/navigation';
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

import { useAppContext } from '@/hooks/context';
import {Alert} from '@/components/ui/alert';
import { useAlert } from '@/hooks/alertHook';
import { CustomTooltip } from '@/components/ui/customToolTip';

export type CallTranscription = {
  speaker: string;
  text: string;
  language: string;
};

export type CallHistoryItem = {
  callId: string;
  userNo: number;
  timestamp: string;
  type: 'INCOMING' | 'OUTGOING';
  status: 'ANSWERED' | 'MISSED';
  duration: number;
  audioUrl?: string;
  transcription: CallTranscription[];
  gender: string | null;
  overall_performance_rating: string | null;
  positive_feedback: string | null;
  improvement_feedback: string | null;
  communication_quality: string | null;
  communication_feedback: string | null;
  property_buying_interest: string | null;
  emotional_state: string | null;
  conversation_summary: string | null;
  call_outcome: string | null;
};

export type AgentNumber = {
  number: string;
  agentId: string;
  callsMade: number;
  isActive: boolean;
  callHistory: CallHistoryItem[];
};

export type AgentDatasetItem = {
  uId: number;
  campaignId?: string;
  company: string;
  des: string;
  agent: string;
  agentKey: string;
  isActive: boolean;
  agentNos: AgentNumber[];
};

export type Dataset = AgentDatasetItem[];




export default function AgentCallLog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'calllogs' | 'analytics'>('calllogs');
  const recordsPerPage = 10;
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState<'conversation' | 'overview'>('conversation');

  // const [agentsData, setAgentsData] =useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const { URL } = useAppContext();
const { showAlert } = useAlert();

const [isFirstLoad, setIsFirstLoad] = useState(true);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMjI5Mzc2NS1iMzEwLTQ0ZDUtYThhNS1mZDc2NWMwOWM3MzAiLCJ1c2VybmFtZSI6InN1bmFwYW5hQGdtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImFjY2Vzc190eXBlIjoiRVhURVJOQUwiLCJleHAiOjE3NTI3NDUyMTh9.pPEKXVLCE7ABQDYzzF9JHC0gn2Iw2cTmrG4VMMyQljo"
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

  // Process all calls from all agents
  const allCalls = useMemo(() => {
    const calls = [];
    agentsData?.forEach(agent => {
      agent.agentNos.forEach(agentNo => {
        agentNo.callHistory.forEach(call => {
          calls.push({
            ...call,
            agentNumber: agentNo.number,
            agentId: agentNo.agentId,
            isActive: agentNo.isActive
          });
        });
      });
    });
    return calls.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, []);

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalCalls = allCalls.length;
    const answeredCalls = allCalls.filter(call => call.status === 'ANSWERED').length;
    const missedCalls = allCalls.filter(call => call.status === 'MISSED').length;
    const totalActiveAgents = agentsData?.reduce((acc, agent) =>
      acc + agent.agentNos.filter(agentNo => agentNo.isActive).length, 0);

    const avgDuration = allCalls.reduce((acc, call) => acc + call.duration, 0) / totalCalls;


    return {
      totalCalls,
      answeredCalls,
      missedCalls,
      totalActiveAgents,
      avgDuration: Math.round(avgDuration),
      answerRate: Math.round((answeredCalls / totalCalls) * 100)
    };
  }, [allCalls]);

  // Chart data
  const callsByDay = useMemo(() => {
    const days = {};
    allCalls.forEach(call => {
      const day = new Date(call.timestamp).toLocaleDateString();
      if (!days[day]) {
        days[day] = { day, answered: 0, missed: 0, total: 0 };
      }
      days[day][call.status.toLowerCase()]++;
      days[day].total++;
    });
    return Object.values(days).slice(0, 7);
  }, [allCalls]);

  const callsByType = useMemo(() => {
    const types = { INCOMING: 0, OUTGOING: 0 };
    allCalls.forEach(call => {
      types[call.type]++;
    });
    return [
      { name: 'Incoming', value: types.INCOMING, color: '#10b981' },
      { name: 'Outgoing', value: types.OUTGOING, color: '#3b82f6' }
    ];
  }, [allCalls]);

  const agentPerformance = useMemo(() => {
    const performance = {};
    agentsData?.forEach(agent => {
      agent.agentNos.forEach(agentNo => {
        performance[agentNo.number] = {
          number: agentNo.number,
          totalCalls: agentNo.callsMade,
          answered: agentNo.callHistory.filter(call => call.status === 'ANSWERED').length,
          missed: agentNo.callHistory.filter(call => call.status === 'MISSED').length,
          isActive: agentNo.isActive
        };
      });
    });
    return Object.values(performance).slice(0, 5);
  }, []);

  // Pagination
  const totalPages = Math.ceil(allCalls.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentCalls = allCalls.slice(startIndex, endIndex);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

   const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeIcon = (type) => {
    return type === 'INCOMING' ? <PhoneCall className="w-4 h-4 text-blue-600" /> : <Phone className="w-4 h-4 text-green-600" />;
  };
  const getStatusColor = (status) => {
    return status === 'ANSWERED' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200';
  };

  const getActiveStatus = (isActive) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        <Activity className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200">
        Inactive
      </Badge>
    );
  };

//   const fetchCallLogs = async () => {
//   setLoading(true);
//   setError(null);

//   const query = {
//     callLogId: '',
//     fromDate: '',
//     toDate: '',
//     campaignId: '',
//     agentId: '',
//     extension: '',
//     customerPhone: '',
//     companyPhone: '',
//     callDirection: '',
//     callStatus: '',
//     callType: '',
//     pageNo: 1,
//     pageSize: 10
//   };

//   const finalUrl = `${URL}/get-call-logs`;
//   console.log("Calling:", finalUrl);

//   try {
//     const res = await fetch(finalUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'memberId': 'a2293765-b310-44d5-a8a5-fd765c09c730',
//       },
//       body: JSON.stringify(query),
//     });

//     if (res.status === 200) {
//       const data = await res.json();
//       setAgentsData(data);
//     } else if (res.status === 422) {
//       showAlert('Validation failed. Please check your member ID or token.', 'error');
//     } else {
//       showAlert('Failed to fetch call logs. Please try again.', 'error');
//     }
//   } catch (err) {
//     console.error('Fetch error:', err);
//     showAlert('Network error occurred. Please check your connection.', 'error');
//   } finally {
//     setLoading(false);
//     setIsFirstLoad(false);
//   }
// };

// useEffect(() => {
// if (isFirstLoad && typeof window !== 'undefined') {
//   fetchCallLogs();
// }
// }, [isFirstLoad]);

const refreshData = () => {
  // fetchCallLogs();
};

// if (loading) {
//   return (
//     <Container>
//       <div className="py-20 text-center text-gray-500">Loading call logs...</div>
//     </Container>
//   );
// }

if (error) {
  return (
    <Container>
      <div className="py-20 text-center text-red-500">{error}</div>
    </Container>
  );
}

  

 
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
      <div className=" bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-md md:shadow-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Title & Subtitle */}
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Agent Call Log
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mt-2 flex justify-center sm:justify-start items-center gap-2">
                  <Users className="w-5 h-5" />
                  Monitor and analyze agent call performance
                </p>
              </div>

              {/* Buttons (Optional) */}
              <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTab('calllogs')}
                  className={`flex items-center gap-2 ${selectedTab === 'calllogs' ? 'bg-gray-100' : ''}`}
                >
                  <Phone className="w-4 h-4" />
                  Call Logs
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshData}
                  className="flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards Section */}
        <div className="max-w-7xl mx-auto py-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Calls */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Calls</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalCalls}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answered */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Answered</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.answeredCalls}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <PhoneCall className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Missed */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Missed</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.missedCalls}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <PhoneMissed className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Agents */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Agents</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalActiveAgents}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


        {/* Conditional Content */}
        <div className="pb-10 max-w-7xl mx-auto space-y-8">
          {/* 📊 Analytics Tab */}
          {selectedTab === 'analytics' && (
            <>
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Call Volume */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Daily Call Volume
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={callsByDay}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip/>} />
                        <Bar dataKey="answered" fill="#10b981" name="Answered" />
                        <Bar dataKey="missed" fill="#ef4444" name="Missed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Call Types */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Call Types Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={callsByType}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {callsByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                       <Tooltip content={<CustomTooltip/>} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Top Agents */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Agent Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={agentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="number" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip/>} />
                      <Bar dataKey="totalCalls" fill="#3b82f6" name="Total Calls" />
                      <Bar dataKey="answered" fill="#10b981" name="Answered" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}

          {/* ☎️ Numbers Tab */}
          {selectedTab === 'calllogs' && (
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>Recent Calls</span>
                  <Badge variant="outline" className="text-xs">
                    {allCalls.length} Calls
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">CallId</TableHead>
                        <TableHead className="w-[120px]">Type</TableHead>
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
                      {currentCalls.map((call) => {
                        // You may need to define formatDateTime and getTypeIcon/getStatusColor if not already present
                        // For now, fallback to existing formatTime for date/time
                        const dateObj = new Date(call.timestamp);
                        const date = dateObj.toLocaleDateString();
                        const time = dateObj.toLocaleTimeString();
                        return (
                          <TableRow
                            key={call.callId}
                            className="hover:bg-gray-50 cursor-pointer"
                            // onClick={() => router.push(`Calldata?callId=${call.callId}`)}
                            onClick={() => router.push(`Calldata?callId=${call.callId}&userNo=${call.userNo}`)}

                          >
                            <TableCell className="font-mono text-sm">{call.callId}</TableCell>
                            <TableCell>
                              {/* {getTypeBadge(call.type)} */}
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
                            <TableCell className="font-mono text-sm">{call.userNo}</TableCell>
                            <TableCell>
                              {/* {getStatusBadge(call.status)} */}
                              <Badge className={`text-xs ${getStatusColor(call.status)}`}>
                                {call.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                 <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-sm">{formatDuration(call.duration)}s</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                {date}
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

                {currentCalls.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <PhoneOff className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No calls found matching your criteria</p>
                  </div>
                )}
                {/* Pagination */}
                {currentCalls.length > 0 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, allCalls.length)} of{" "}
                      {allCalls.length} calls
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        {/* You may need to import ChevronLeft and ChevronRight if not already */}
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
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <CallDetailsModal
        isOpen={isModalOpen}
        call={selectedCall}
        onClose={closeModal}
      />
    </Container>
  );
}

// function useEffect(arg0: () => void, arg1: undefined[]) {
//   throw new Error('Function not implemented.');
// }
