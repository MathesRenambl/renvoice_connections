import { Ban, Dot, Download, Pause, PauseIcon, Play, Trash } from 'lucide-react';
import React, { useState } from 'react';
// import Modal from '../Modal/deleteModal';
import Modal from "@/components/ui/modal";
import { useRouter } from 'next/navigation';
import ConfirmActionModal from './ConfirmActionModal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

// Sample data for demonstration

const formatDate = (ts: number) =>
  new Date(ts).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
  });


const CampaignTable = ({campaignData}:{campaignData:Array<any>}) => {
  const router=useRouter()
  const [pauseModal,setPause] = useState(false)
  const [resumeModal,setResume] = useState(false)
  const [stopModal,setStop] = useState(false)
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-50';
      case 'Inactive':
        return 'text-red-600 bg-red-50';
      case 'Paused':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
 
  return (
    <div className="w-full max-w-full overflow-x-auto">
      <Table className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden bg-white">
        <TableHeader className="bg-gray-100">
          <TableRow>
             <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
              Campaign ID
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
              Campaign Name
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
              Date
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
              Status
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {campaignData.map((campaign, index) => (
            <TableRow key={campaign.id}  className="hover:bg-gray-50 hover:cursor-pointer transition-colors duration-150">
              <TableCell onClick={() => router.push('/campaign/CampaignInsights')} className="px-6 py-4 text-sm text-gray-900 font-medium">
                {campaign.id}
              </TableCell>
              <TableCell onClick={() => router.push('/campaign/CampaignInsights')} className="px-6 py-4 text-sm text-gray-900 font-medium">
                {campaign.name}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-900">
                {(campaign.date)}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-xs flex flex-row gap-2">
                <button className="text-black gap-2 flex flex-row hover:underline font-normal transition-colors duration-150">
                 
                  {campaign.status==='Active'?<><Pause onClick={()=>{setPause(true)}} size={20} /> </> : campaign.status==='Inactive'?
                  <><Play onClick={()=>setResume(true)} size={20} /> </>:<><Play onClick={()=>setResume(true)} size={20} /></>}
                </button>
                <button><Download  size={20} /></button>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* {pauseModal && <Trash onClick={()=>{setStop(true)}} size={20} /> <ConfirmActionModal modalConfig={{title:"Pause Campaign",message:"Do You want to pause the campaign",confirmText:"Pause",icon:<Pause/>}} onConfirm={()=>{setPause(false),console.log("Job Paused")}} onClose={()=>{setPause(false)}}/>}
        {resumeModal && <ConfirmActionModal modalConfig={{title:"Resume Campaign",message:"Do You want to Resume the campaign",confirmText:"Resume",icon:<Play/>}} onConfirm={()=>{setResume(false),console.log("Job Paused")}} onClose={()=>{setResume(false)}}/>}
      <Modal open={stopModal} onClose={()=>{setStop(false)}} onConfirm={()=>{setStop(false), console.log('job Stoped')}}></Modal> */}
      <Modal
        isOpen={pauseModal}
        onClose={()=>{setPause(false)}}
        title={`Pause Campaign`}
        onSave={()=>{setPause(false),console.log("paused")}}
        btnName='Pause'
      >
        <div className="mb-4 p-5 text-gray-700">
          {`Are you sure you want to Pause the campaign  ?`}
        </div>
      
      </Modal>
      <Modal
        isOpen={resumeModal}
        onClose={()=>{setResume(false)}}
        title={`Resume Campaign`}
        onSave={()=>{setResume(false),console.log("Resumed")}}
        btnName='Resume'
      >
        <div className="mb-4 p-5 text-gray-700">
          {`Are you sure you want to Resume the campaign  ?`}
        </div>
      
      </Modal>
    </div>
  );
};

export default CampaignTable;