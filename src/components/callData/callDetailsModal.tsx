


'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Phone, User, Star, Calendar, CheckCircle, MessageCircle, X, Play, Pause } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { ArrowDownCircle } from 'lucide-react';
import { useAppContext } from "@/hooks/context";

interface Segment {
    speaker: string;
    text: string;
    timestamp?: string;
    language?: string;
}

export interface CallData {
    id: string;
    audioUrl: string;
    duration: string;
    callerNumber?: string;
    gender?: string;
    overall_performance_rating?: string;
    communicationQuality?: string;
    property_buying_interest?: string;
    call_outcome?: string;
    emotional_state?: string;
    positive_feedback?: string;
    improvement_feedback?: string;
    communication_feedback?: string;
    conversation_summary?: string;
    transcription?: Segment[];
    timestamp?: string;
    communication_quality?: string;
}

interface CallDetailsSheetProps {
    isOpen: boolean;
    call: CallData | null;
    onClose: () => void;
    
}

const CallDetailsSheet: React.FC<any> = ({ isOpen, call, onClose }) => {
    console.log("====>", call)
    const [activeTab, setActiveTab] = useState<'conversation' | 'overview'>('conversation');
    const [isPlaying, setIsPlaying] = useState(false);
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
const { LogUrl } = useAppContext();
    console.log("CallDetailsSheet mounted or updated", call?.audioUrl, waveformRef.current);


    // useEffect(() => {
    //     console.log("useeffect",waveformRef.current)
    //     if (!call?.audioUrl || !waveformRef.current) {
    //         // console.log("CallDetailsSheet mounted or updated", call?.audioUrl, waveformRef.current);

    //         return;
    //     }

    //     // Cleanup any previous instance
    //     if (wavesurferRef.current) {
    //         wavesurferRef.current.destroy();
    //     }

    //     const wave = WaveSurfer.create({
    //         container: waveformRef.current,
    //         waveColor: '#4b5563',
    //         progressColor: '#3b82f6',
    //         cursorColor: '#1e40af',
    //         barWidth: 2,
    //         barRadius: 3,
    //         cursorWidth: 1,
    //         height: 64, // Ensure height is set here
    //         barGap: 2,
    //         responsive: true,
    //     });

    //     wave.load(call.audioUrl);

    //     wave.on('ready', () => {
    //         console.log('WaveSurfer is ready');
    //     });

    //     wave.on('play', () => setIsPlaying(true));
    //     wave.on('pause', () => setIsPlaying(false));
    //     wave.on('finish', () => setIsPlaying(false));

    //     wavesurferRef.current = wave;

    //     return () => {
    //         wave.destroy();
    //     };
    // }, [isOpen]);


    useEffect(() => {
    if (!isOpen || !call?.audioUrl) return;

    const timeout = setTimeout(() => {
        if (!waveformRef.current) return;

        // Cleanup previous instance
        if (wavesurferRef.current) {
            wavesurferRef.current.destroy();
        }

        const wave = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#4b5563',
            progressColor: '#3b82f6',
            cursorColor: '#1e40af',
            barWidth: 2,
            barRadius: 3,
            cursorWidth: 1,
            height: 64,
            barGap: 2,
            // remove responsive if it's not valid
        });

        wave.load("http://192.168.1.55:8001/"+call.audioUrl);

        wave.on('ready', () => {
            console.log('WaveSurfer is ready');
        });

        wave.on('play', () => setIsPlaying(true));
        wave.on('pause', () => setIsPlaying(false));
        wave.on('finish', () => setIsPlaying(false));

        wavesurferRef.current = wave;
    }, 0); // delay until next tick

    return () => {
        clearTimeout(timeout);
        if (wavesurferRef.current) {
            wavesurferRef.current.destroy();
            wavesurferRef.current = null;
        }
    };
}, [isOpen, call?.audioUrl]);

    const togglePlayPause = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause();
        }
    };

    if (!call) return null;

    return (
      <>  

        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="min-w-[60vw] max-w-none p-0">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <SheetHeader className="p-6 border-b border-gray-200">
                        <SheetTitle className="text-xl font-semibold">Property Inquiry Call</SheetTitle>
                    </SheetHeader>
                    {/* Date Selector */}
                    <div className="flex items-center gap-4 p-6 border-b border-gray-200">
                        <div className="text-sm font-medium">Date :</div>
                        <div className="flex gap-2">
  <button className="px-3 py-1 bg-gray-100 rounded text-sm">
    {new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}
  </button>
</div>

                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'conversation'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setActiveTab('conversation')}
                        >
                            Call
                        </button>
                        <button
                            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'overview'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {activeTab === 'conversation' ? (
                            <>
                                {/* Sticky Audio Player */}
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                                    <div className="flex items-center gap-4">
                                        {/* Play/Pause */}
                                        <button
                                            onClick={togglePlayPause}
                                            className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                                        >
                                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                        </button>

                                        {/* Waveform */}
                                        <div className="flex-1">
                                          <div ref={waveformRef} />
                                        </div>

                                        {/* Duration */}
                                        <div className="text-sm text-gray-500">{call.duration}</div>

                                        {/* Download */}
                                        {call.audioUrl && (
                                            <a
                                                href={call.audioUrl}
                                                download
                                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                                title="Download Recording"
                                            >
                                                <ArrowDownCircle className="w-5 h-5 text-gray-600" />
                                            </a>
                                        )}
                                    </div>
                                </div>


                                {/* Scrollable Transcription */}
                                <div className="flex-1 overflow-y-auto p-6">
                                    <div className="space-y-4">
                                        {Array.isArray(call.transcription) && call.transcription.map((segment, index) => (
                                            <div key={index} className="flex flex-col">
                                                <div className={`flex items-center gap-2 mb-2 ${segment.speaker === 'agent' ? 'justify-end' : 'justify-start'
                                                    }`}>
                                                    <span className="text-sm font-medium">
                                                        {segment.speaker === 'agent' ? 'Agent' : 'Public'}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{segment.timestamp}</span>
                                                    {segment.language && (
                                                        <span className="text-xs text-gray-500">({segment.language})</span>
                                                    )}
                                                </div>
                                                <div className={`p-3 rounded-lg max-w-md ${segment.speaker === 'agent'
                                                        ? 'bg-black text-white ml-auto'
                                                        : 'bg-gray-100 text-black mr-auto'
                                                    }`}>
                                                    <p className="text-sm">{segment.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="space-y-6">
                                    {/* Call Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="border border-gray-200 p-4 rounded">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Phone className="w-4 h-4 text-black" />
                                                <span className="text-sm font-medium text-black">Phone Number</span>
                                            </div>
                                            <p className="font-mono text-sm text-gray-700">{call.customerPhone}</p>
                                        </div>

                                        <div className="border border-gray-200 p-4 rounded">
                                            <div className="flex items-center gap-2 mb-2">
                                                <User className="w-4 h-4 text-black" />
                                                <span className="text-sm font-medium text-black">Gender</span>
                                            </div>
                                            <p className="text-sm text-gray-700 capitalize">{call.callSummary.gender}</p>
                                        </div>

                                        <div className="border border-gray-200 p-4 rounded">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Star className="w-4 h-4 text-black" />
                                                <span className="text-sm font-medium text-black">Performance Rating</span>
                                            </div>
                                            <p className="text-sm font-semibold text-black">{call.callSummary.overall_rating}</p>
                                        </div>
                                    </div>

                                    {/* Performance Overview */}
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 ">
                                        <div className="border border-gray-200 p-4 rounded w-full">
                                            <h3 className="text-sm font-medium text-black mb-2">Issue Urgency</h3>
                                            <span className={`px-2 py-1 text-xs font-medium uppercase tracking-wide rounded bg-black  text-white
                                                }`}>
                                                {call.callSummary.issue_urgency}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Feedback Section */}
                                    <div className="space-y-4">
                                        <div className="border border-gray-200 p-4 rounded">
                                            <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                                Positive Feedback
                                            </h3>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {call.callSummary.positive_feedback}
                                            </p>
                                        </div>

                                        <div className="border border-gray-200 p-4 rounded">
                                            <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                                Areas for Improvement
                                            </h3>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {call.callSummary.improvement_feedback}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Communication Feedback */}
                                    <div className="border border-gray-200 p-4 rounded">
                                        <h3 className="text-sm font-medium text-black mb-3">Communication Feedback</h3>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {call.callSummary.communication_analysis || 'No feedback provided.'}
                                        </p>
                                    </div>

                                    {/* Call Summary */}
                                    <div className="border border-gray-200 p-4 rounded">
                                        <h3 className="text-sm font-medium text-black mb-3">Call Summary</h3>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {call.callSummary.conversation_summary}
                                        </p>
                                    </div>

                                    {/* Call Outcome */}
                                    <div className="border border-gray-200 p-4 rounded bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-sm font-medium text-black mb-2">Call Outcome</h3>
                                                <div className="flex items-center gap-2">
                                                    {call.callSummary.follow_up_action === 'appointment_scheduled' ? (
                                                        <Calendar className="w-4 h-4 text-black" />
                                                    ) : call.callSummary.follow_up_action === 'call_completed' ? (
                                                        <CheckCircle className="w-4 h-4 text-black" />
                                                    ) : (
                                                        <MessageCircle className="w-4 h-4 text-black" />
                                                    )}
                                                    <span className="text-sm text-gray-700 capitalize font-medium">
                                                        {call.callSummary.follow_up_action}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-600 mb-1">Emotional State</div>
                                                <span className={`px-2 py-1 text-xs font-medium uppercase tracking-wide rounded ${call.callSummary.emotional_state === 'positive' ? 'bg-black text-white' :
                                                        call.callSummary.emotional_state === 'neutral' ? 'bg-gray-500 text-white' :
                                                            'bg-gray-400 text-white'
                                                    }`}>
                                                    {call.callSummary.emotional_state}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 p-4 rounded">
                                        <h3 className="text-sm font-medium text-black mb-3">Call Metadata</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            {/* <div>
                                                <span className="text-gray-600">Date:</span>
                                                <span className="ml-2 text-gray-900">{call.callStartTime}</span>
                                            </div> */}
                                            <div>
                                                <span className="text-gray-600">Date:</span>
                                                <span className="ml-2 text-gray-900">
                                                    {new Date(call.callStartTime).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                    })}
                                                </span>
                                                </div>
                                            <div>
                                                <span className="text-gray-600">Communication Quality:</span>
                                                <span className="ml-2 text-gray-900">{call.callSummary.communication_quality}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
        </>
    );
};

export default CallDetailsSheet;