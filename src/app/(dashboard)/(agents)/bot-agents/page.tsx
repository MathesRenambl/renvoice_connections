"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Phone, 
  TrendingUp, 
  Activity, 
  UserCheck, 
  UserX, 
  PhoneCall,
  Bot,
  PhoneIncoming,
  PhoneOutgoing,
  BarChart3,
  PieChart,
  TrendingDown,
  Search,
  Filter,
  X,
  Check,
  Copy
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import Container from '@/components/ui/container';
import { useRouter } from 'next/navigation';
import { CustomTooltip } from '@/components/ui/customToolTip';
import { tooltip } from 'leaflet';

const AgentDashboard = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('agents');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'
  const [copied, setCopied] = useState(false);
   


  const agentsData = [
    {
      uId: 1,
      company: "Casa Grand",
      des: "Handles property inquiries and sales",
      agent: "Real Estate Agent",
      agentKey: "realestateagent",
      isActive: true,
      agentNos: [
        {
          number: "9876543201",
          agentId: "realestateagent-1001",
          callsMade: 120,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543202",
          agentId: "realestateagent-1002",
          callsMade: 85,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543204",
          agentId: "realestateagent-1004",
          callsMade: 22,
          isActive: false,
          callHistory: []
        },
        {
          number: "9876543205",
          agentId: "realestateagent-1005",
          callsMade: 20,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543206",
          agentId: "realestateagent-1006",
          callsMade: 18,
          isActive: false,
          callHistory: []
        },
        {
          number: "9876543207",
          agentId: "realestateagent-1007",
          callsMade: 15,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543208",
          agentId: "realestateagent-1008",
          callsMade: 12,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543209",
          agentId: "realestateagent-1009",
          callsMade: 10,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543210",
          agentId: "realestateagent-1010",
          callsMade: 8,
          isActive: true,
          callHistory: []
        }
      ]
    },
    {
      uId: 2,
      company: "Casa Grand",
      des: "Schedules appointments and meetings",
      agent: "Appointment Booking",
      agentKey: "appointbooking",
      isActive: true,
      agentNos: [
        {
          number: "9876543211",
          agentId: "appointbooking-2001",
          callsMade: 65,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543212",
          agentId: "appointbooking-2002",
          callsMade: 42,
          isActive: true,
          callHistory: []
        }
      ]
    },
    {
      uId: 3,
      company: "Casa Grand",
      des: "Provides customer support and assistance",
      agent: "Support",
      agentKey: "support",
      isActive: false,
      agentNos: [
        {
          number: "9876543213",
          agentId: "support-3001",
          callsMade: 78,
          isActive: false,
          callHistory: []
        }
      ]
    }
    ,
    {
      uId: 4,
      company: "Casa Grand",
      des: "Provides customer support and assistance",
      agent: "Support",
      agentKey: "support",
      isActive: false,
      agentNos: [
        {
          number: "9876543213",
          agentId: "support-3001",
          callsMade: 78,
          isActive: false,
          callHistory: []
        }
      ]
    }
  ];

  // Filter agents based on search and status
  const filteredAgents = useMemo(() => {
    let filtered = agentsData;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(agent => 
        agent.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.des.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(agent => 
        statusFilter === 'active' ? agent.isActive : !agent.isActive
      );
    }
    
    return filtered;
  }, [agentsData, searchTerm, statusFilter]);

  const activeAgents = filteredAgents.filter(agent => agent.isActive);
  const inactiveAgents = filteredAgents.filter(agent => !agent.isActive);

  // Calculate statistics based on filtered data
  const stats = useMemo(() => {
    const totalAgents = filteredAgents.length;
    const activeAgents = filteredAgents.filter(agent => agent.isActive).length;
    const inactiveAgents = totalAgents - activeAgents;
    const totalCalls = filteredAgents.reduce((sum, agent) => 
      sum + agent.agentNos.reduce((agentSum, nos) => agentSum + nos.callsMade, 0), 0
    );
    
    return {
      totalAgents,
      activeAgents,
      inactiveAgents,
      totalCalls
    };
  }, [filteredAgents]);

  // Chart data based on filtered agents
  const chartData = useMemo(() => {
    const agentCallsData = filteredAgents.map(agent => ({
      name: agent.agent,
      calls: agent.agentNos.reduce((sum, nos) => sum + nos.callsMade, 0),
      activeNumbers: agent.agentNos.filter(nos => nos.isActive).length,
      totalNumbers: agent.agentNos.length
    }));

    const statusData = [
      { name: 'Active', value: stats.activeAgents, color: '#1e293b' },
      { name: 'Inactive', value: stats.inactiveAgents, color: '#0e7490' }
    ];

    const callTrendData = [
      { month: 'Jan', calls: 245 },
      { month: 'Feb', calls: 289 },
      { month: 'Mar', calls: 356 },
      { month: 'Apr', calls: 423 },
      { month: 'May', calls: 387 },
      { month: 'Jun', calls: 445 }
    ];

    return { agentCallsData, statusData, callTrendData };
  }, [filteredAgents, stats]);

//   const activeAgents = agentsData.filter(agent => agent.isActive);
//   const inactiveAgents = agentsData.filter(agent => !agent.isActive);

  const copyAgentId = async () => {
  try {
    await navigator.clipboard.writeText('12345');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};
  const AgentCard = ({ agent }) => {
    const totalIncoming = agent.agentNos.reduce((sum, nos) => sum + nos.callsMade, 0);
    const totalOutgoing = Math.floor(totalIncoming * 0.8); // Mock outgoing calls
    const activeNumbers = agent.agentNos.filter(nos => nos.isActive).length;

    return (
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 ">
        <CardHeader >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{agent.agent}</h3>
                <p className="text-sm text-gray-600">{agent.des}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs font-semibold ">Agent ID :</p>
                  <span className="font-semibold  text-xs bg-gray-50 px-2 py-1 rounded">
                    12345
                  </span>
                  <button
                    onClick={copyAgentId}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
                    title="Copy Agent ID"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                agent.isActive
                  ? 'bg-green-50 text-green-700 border-2 border-green-200'
                  : 'bg-red-50 text-red-700 border-2 border-red-200'
              }`}
            >
              {agent.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <PhoneIncoming className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Incoming</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{totalIncoming}</p>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <PhoneOutgoing className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Outgoing</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{totalOutgoing}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => router.push('/agentNumber')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Numbers ({activeNumbers})
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => router.push('/agentCallLog')}
            >
              <Activity className="w-4 h-4 mr-2" />
              Call Logs
            </Button>
          </div>
        </CardContent>
      </Card>

    );
  };

  const Analytics = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Calls/Agent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(stats.totalCalls / stats.totalAgents)}
                </p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-gray-600" />
              </div>
              
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                 <BarChart3 className="h-8 w-8 text-gray-600" />
              </div>
             
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Hours</p>
                <p className="text-2xl font-bold text-gray-900">2-4 PM</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                 <Activity className="h-8 w-8 text-gray-600" />
              </div>
             
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">1.2s</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-8 w-8 text-gray-600" />
              </div>
              
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calls by Agent */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Calls by Agent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.agentCallsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip/>} cursor={{ fill: 'transparent' }}/>
                <Bar dataKey="calls" fill="#1e293b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Agent Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Agent Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={chartData.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
               <Tooltip content={<CustomTooltip/>} cursor={{ fill: 'transparent' }}/>
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Call Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Call Volume Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData.callTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip/>} />
                <Area 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <Container>
         <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md md:shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title & Subtitle */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">List of Agents</h1>
              <p className="text-base sm:text-lg text-gray-600 mt-2 flex justify-center sm:justify-start items-center gap-2">
                <Users className="w-5 h-5" />
                Casagrand Agent Management System
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTab('agents')}
                className={`flex items-center gap-2 ${selectedTab === 'agents' ? 'bg-gray-100' : ''}`}
              >
                <Phone className="w-4 h-4" />
                Agents
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
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Agents</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAgents}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Agents</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeAgents}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive Agents</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inactiveAgents}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <UserX className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Calls</p>
                  {/* <p className="text-2xl font-bold text-gray-900">{stats.totalCalls}</p> */}
                   <p className="text-2xl font-bold text-gray-900">1030</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <PhoneCall className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conditional Rendering */}
        {selectedTab === 'agents' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full sm:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search agents by name, description, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <div className="flex gap-2">
                    <Button
                      variant={statusFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={statusFilter === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter('active')}
                      className="flex items-center gap-1"
                    >
                      <UserCheck className="h-3 w-3" />
                      Active
                    </Button>
                    <Button
                      variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter('inactive')}
                      className="flex items-center gap-1"
                    >
                      <UserX className="h-3 w-3" />
                      Inactive
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Search Results Info */}
              {searchTerm && (
                <div className="mt-3 text-sm text-gray-600">
                  Found {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </div>
              )}
            </div>

            {/* Results */}
            {filteredAgents.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <Search className="h-12 w-12" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No agents found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {searchTerm 
                    ? `No agents match your search for "${searchTerm}"`
                    : 'No agents match the selected filters'
                  }
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="mt-4"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <>
                {/* Active Agents */}
                {activeAgents.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <UserCheck className="h-6 w-6 text-black" />
                      Active Agents ({activeAgents.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                      {activeAgents.map((agent) => (
                        <AgentCard key={agent.uId} agent={agent} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Inactive Agents */}
                {inactiveAgents.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <UserX className="h-6 w-6 text-black" />
                      Inactive Agents ({inactiveAgents.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                      {inactiveAgents.map((agent) => (
                        <AgentCard key={agent.uId} agent={agent} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {selectedTab === 'analytics' && <Analytics />}
      </div>
    </div>
    </Container>
   
  );
};

export default AgentDashboard;