"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Container from "@/components/ui/container";
import PageTitle from "@/components/ui/pageTitle";
import { CallStatus } from "@/components/call-history/call-status";
import { CallFilters } from "@/components/call-history/call-filter";
import CallRecordsTable from "@/components/call-history/call-records";
import { useAppContext } from "@/hooks/context";
import { useAlert } from "@/hooks/alertHook";
import { apiHeader } from "@/lib/utils";
import { useLogOut } from "@/hooks/useLogout";
import VoiceWaveLoader from "@/components/ui/loader";
import Alert from "@/components/alert/alert";
import { downloadCSV } from "@/lib/exportToCSV";

export interface CallLog {
  _id?: string;
  userAgentId: string;
  callType: "INCOMING" | "OUTGOING";
  ringGroupId: string;
  phoneNo: string;
  callDuration: number;
  callStatus: "SUCCESS" | "FAILED" | "MISSED";
  callDate: string;
  callTime: string;
  orgId: string;
  callId: string;
  createdAt: string;
  updatedAt: string;
  callTo: string;
  contex: Record<string,string>[];
  agentName: string;
  agentId: string;
}

interface CallStatusCounts {
  SUCCESS: number;
  FAILED: number;
  [key: string]: number; // Allows for additional statuses
}

interface CallLogResponse {
  callStatusCounts: CallStatusCounts;
  data: CallLog[];
  totalCalls: number;
  totalDuration: string; // e.g., "0:28:36"
  total_count: number;
}

export default function CallHistoryPage() {
  const { URL, userData } = useAppContext();
  const { alert, showAlert, hideAlert } = useAlert();
  const header = apiHeader();
  const logOut = useLogOut();
  const [loading, setLoading] = useState(false);
  const [callData, setCallData] = useState<CallLogResponse>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  async function fetchCallData({
    page = "1",
    limit = "10",
    callStatus = "",
    phoneNo,
  }: {
    page?: string;
    limit?: string;
    callStatus?: string;
    phoneNo?: string;
  } = {}) {
    try {
      setLoading(true);
      const payload: {
        page: string;
        limit: string;
        orgId: string;
        callStatus?: string;
        phoneNo?: string;
      } = {
        page: page,
        limit: limit,
        orgId: String(userData.orgId),
      };
      if (callStatus && callStatus !== "All") {
        setStatusFilter(callStatus);
        payload.callStatus = callStatus;
      }

      if (phoneNo) {
        payload.phoneNo = phoneNo;
      }
      const response = await fetch(`${URL}/callHistory/getAll`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(payload),
      });
      if (response.status == 200) {
        const data = await response.json();
        setCallData(data);
        setLoading(false);
      }
      if (response.status === 401 || response.status === 403) {
        logOut();
        showAlert("Session expired. Please log in again.", "error");
        return;
      }
    } catch (error) {
      console.error("Error fetching call data:", error);
    }
  }

  function handleDownloadData(){
    console.log(callData)
    downloadCSV(callData.data,'call_history'+new Date().getDate()+'.csv')
  }

  useEffect(() => {
    fetchCallData();
    // Cleanup function to reset state if needed
    return () => {
      setCallData(null);
      setSearchTerm("");
      setStatusFilter("");
    };
  }, []);

  return (
    <Container>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <PageTitle
          title="Call History"
          description="View and analyze your AI agent call history"
        >
          <Button variant="default" onClick={handleDownloadData} disabled={callData?.data.length===0}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </PageTitle>

        {/* Stats Cards */}
        <CallStatus
          total={callData?.total_count || 0}
          Successful={callData?.callStatusCounts?.SUCCESS || 0}
          failed={callData?.callStatusCounts?.FAILED || 0}
          duration={callData?.totalDuration || "0:00:00"}
        />

        {/* Filters */}
        <CallFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          handleFilter={(value: string) => {
            fetchCallData({ callStatus: value });
          }}
          handleSearch={() => {
            fetchCallData({callStatus:statusFilter, phoneNo: searchTerm });
          }}
        />

        {/* Call List */}
        <CallRecordsTable
          filteredCalls={callData?.data}
          totalDocument={callData?.total_count}
        />
      </div>

      <Alert
      alert={alert}
      hideAlert={hideAlert}
      />

      <VoiceWaveLoader 
      isLoading={loading}
      />
    </Container>
  );
}
