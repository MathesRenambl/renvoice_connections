import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Search, Filter, Phone, Calendar, SearchCheck } from "lucide-react";
import { Button } from "../ui/button";

interface CallFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  handleFilter: (value: string) => void;
  handleSearch: () => void;
}

export function CallFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  handleFilter,
  handleSearch,
}: CallFiltersProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex md:flex-row gap-4 w-full">
          <div className="flex  items-center gap-2 ">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by agent name or phone number"
                className="pl-10  w-[500px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch} className="w-44" variant="outline"><SearchCheck />Search</Button>
          </div>

          <div className="block ml-auto ">
            <Select value={statusFilter} onValueChange={handleFilter}>
              <SelectTrigger className='w-[180px] border border-gray-300 rounded-lg'>
                {/* <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Status</span>
                </div> */}
               <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="SUCCESS">Success</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
{/* 
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Agent</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="appointment">Appointment Bot</SelectItem>
                <SelectItem value="support">Support Agent</SelectItem>
                <SelectItem value="news">News Summarizer</SelectItem>
              </SelectContent>
            </Select> */}

            {/* <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Date</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
