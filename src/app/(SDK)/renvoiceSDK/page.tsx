                      
                                            

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Square, Volume2, MicOff, Mic, Globe } from "lucide-react";
import { useAppContext } from "@/hooks/context";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Type declarations
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

type AudioQueueItem = {
  type: "filler" | "tts";
  data: Float32Array;
};


// Component prop types
interface NeonOrbStyleProps {
  isActive: boolean;
  volume: number;
  pitch: number;
  onToggle: () => void;
  isPlayingTTS: boolean;
}

// WebSocket message types
interface AudioStartMessage {
  type: "audio_start";
}

interface AudioEndMessage {
  type: "audio_end";
}

interface StartRecordingMessage {
  type: "start_recording";
}

interface FillerStartMessage {
  type: "filler_start";
}

type WebSocketMessage =
  | AudioStartMessage
  | AudioEndMessage
  | StartRecordingMessage
  | FillerStartMessage;

interface MicrophoneWaveVisualizerProps {
  showTittle?: boolean;
}

const MicrophoneWaveVisualizer: React.FC<MicrophoneWaveVisualizerProps> = ({
  showTittle = true,
}) => {
  // State management
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(0);
  const [isPermissionGranted, setIsPermissionGranted] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Ready to start");
  const [isPlayingTTS, setIsPlayingTTS] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");



  const [loading,setloading]=useState(false)
  
  const mobile = useMediaQuery("mobile");
  const { WEBSOCKETURL } = useAppContext();

  // Language options
  const languages = [
    { value: "english", label: "English" },
    { value: "tamil", label: "Tamil (தமிழ்)" },
    { value: "hindi", label: "Hindi (हिन्दी)" },
    { value: "kannada", label: "Kannada (ಕನ್ನಡ)" },
    { value: "malayalam", label: "Malayalam (മലയാളം)" },
    { value: "telugu", label: "Telugu (తెలుగు)" },
  ];

  // Audio context and analysis refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const currentAudioTypeRef = useRef<"filler" | "tts" | null>(null);


  // WebSocket ref
  const socketRef = useRef<WebSocket | null>(null);

  // Audio playback refs
  const playbackAudioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioQueueRef = useRef<AudioQueueItem[]>([]);
  const isPlayingRef = useRef<boolean>(false);
  const scheduledTimeRef = useRef<number>(0);
  const audioEndedReceivedRef = useRef<boolean>(false);

  // Audio constants
  const AUDIO_SAMPLE_RATE = 24000;
  const MIN_BUFFER_CHUNKS = 3;

  // Handle language change
  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
  }, []);

  // Audio analysis function
  const analyzeAudio = useCallback((): void => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    const average =
      dataArrayRef.current.reduce((sum, value) => sum + value, 0) /
      dataArrayRef.current.length;
    setAudioLevel(average / 255);

    // Calculate pitch
    let maxIndex = 0;
    let maxValue = 0;

    if (!audioContextRef.current) return;
    const startIndex = Math.floor(
      (80 * dataArrayRef.current.length) / (audioContextRef.current.sampleRate / 2)
    );
    const endIndex = Math.floor(
      (1000 * dataArrayRef.current.length) / (audioContextRef.current.sampleRate / 2)
    );

    for (let i = startIndex; i < endIndex && i < dataArrayRef.current.length; i++) {
      if (dataArrayRef.current[i] > maxValue) {
        maxValue = dataArrayRef.current[i];
        maxIndex = i;
      }
    }

    const pitchValue = maxIndex / (endIndex - startIndex);
    setPitch(pitchValue);
    animationRef.current = requestAnimationFrame(analyzeAudio);
  }, []);

  // Initialize audio playback context
  const initializePlaybackContext = useCallback(async (): Promise<void> => {
    try {
      // Clean up existing context
      if (playbackAudioContextRef.current) {
        await playbackAudioContextRef.current.close();
      }

      // Create new audio context for playback
      playbackAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: AUDIO_SAMPLE_RATE,
        latencyHint: "interactive",
      });

      // Create gain node for volume control
      gainNodeRef.current = playbackAudioContextRef.current.createGain();
      gainNodeRef.current.connect(playbackAudioContextRef.current.destination);
      gainNodeRef.current.gain.setValueAtTime(0, playbackAudioContextRef.current.currentTime);

      // Reset playback state
      audioQueueRef.current = [];
      isPlayingRef.current = false;
      scheduledTimeRef.current = playbackAudioContextRef.current.currentTime + 0.1;
      audioEndedReceivedRef.current = false;

    } catch (error) {
      console.error("Error initializing playback context:", error);
    }
  }, []);

  // Play buffered audio chunks
  const playBufferedAudio = useCallback(() => {
  if (!playbackAudioContextRef.current || !gainNodeRef.current) return;


  while (audioQueueRef.current.length > 0) {
    const {  data } = audioQueueRef.current[0]; // peek

    // Priority logic
    // if (currentAudioTypeRef.current === "tts") {
    //   // Don't interrupt TTS for filler
    //   console.log("Skipping filler during TTS playback");
    //   audioQueueRef.current.shift(); // discard filler
    //   continue;
    // }

    const buffer = playbackAudioContextRef.current.createBuffer(1, data.length, AUDIO_SAMPLE_RATE);
    buffer.copyToChannel(data, 0);

    const source = playbackAudioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNodeRef.current);

    const startTime = Math.max(scheduledTimeRef.current, playbackAudioContextRef.current.currentTime);
    source.start(startTime);

    const duration = data.length / AUDIO_SAMPLE_RATE;
    scheduledTimeRef.current = startTime + duration;

    source.onended = () => {
      // Clear type if finished
      if (audioQueueRef.current.length === 0) {
        currentAudioTypeRef.current = null;
      }
      checkPlaybackComplete();
    };

    audioQueueRef.current.shift(); // remove after play
  }
}, []);


  // Check if playback is complete
  const checkPlaybackComplete = useCallback((): void => {
    const isComplete = 
      audioEndedReceivedRef.current && 
      audioQueueRef.current.length === 0 &&
      (!playbackAudioContextRef.current || 
       playbackAudioContextRef.current.currentTime >= scheduledTimeRef.current - 0.1);

    if (isComplete) {
      finalizePlayback();
    }
  }, []);

  // Finalize playback
  const finalizePlayback = useCallback((): void => {
    
    if (gainNodeRef.current && playbackAudioContextRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0,
        playbackAudioContextRef.current.currentTime + 0.05
      );
    }

    setIsPlayingTTS(false);
    setStatus("Audio playback completed");
    isPlayingRef.current = false;
  }, []);

  // Process WebSocket messages
  const processWebSocketMessage = useCallback(async (event: MessageEvent): Promise<void> => {
    try {
      if (typeof event.data === "string") {
        const msg: WebSocketMessage = JSON.parse(event.data);
        let audioType: "tts" | "filler" | null = null;

        
        switch (msg.type) {
          case "audio_start":
            audioType = "tts";
            currentAudioTypeRef.current = "tts";
            setIsPlayingTTS(true);
            await initializePlaybackContext();
            setStatus("Receiving and playing audio...");
            break;
          case "filler_start":
             currentAudioTypeRef.current = "filler";
            setIsPlayingTTS(true);
            setStatus("Receiving and playing audio...");
            await initializePlaybackContext();
            break;

          case "audio_end":
            audioEndedReceivedRef.current = true;
            checkPlaybackComplete();
            break;

          case "start_recording":
            if (playbackAudioContextRef.current) {
              await playbackAudioContextRef.current.close();
              playbackAudioContextRef.current = null;
            }
            break;
        }
      } else if (event.data instanceof ArrayBuffer) {
        // Process audio data
        if (event.data.byteLength < 64) {
          console.log("Skipping small audio buffer");
          return;
        }

        const pcmData = new Int16Array(event.data);
        const float32Data = new Float32Array(pcmData.length);

        // Convert PCM to float32 with proper clamping
        for (let i = 0; i < pcmData.length; i++) {
          float32Data[i] = Math.max(-1.0, Math.min(1.0, pcmData[i] / 32768.0));
        }

      audioQueueRef.current.push({
  type: currentAudioTypeRef.current!,
    data: float32Data,
  });

        // Start playback when we have enough buffered data
        if (!isPlayingRef.current && audioQueueRef.current.length >= MIN_BUFFER_CHUNKS) {
          isPlayingRef.current = true;
          
          if (gainNodeRef.current && playbackAudioContextRef.current) {
            gainNodeRef.current.gain.linearRampToValueAtTime(
              1.0,
              playbackAudioContextRef.current.currentTime + 0.05
            );
          }
        }

        // Play buffered audio
        if (isPlayingRef.current) {
          playBufferedAudio();
        }
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  }, [initializePlaybackContext, playBufferedAudio, checkPlaybackComplete]);

  // Start streaming
  const startStreaming = useCallback(async (): Promise<void> => {
    try {
      setStatus("Starting...");
      setloading(true);

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Create audio context for recording
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 16000,
      });

      streamRef.current = stream;
      setIsPermissionGranted(true);

      // Set up audio analysis
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.8;

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      setIsRecording(true);
      analyzeAudio();

      // Create WebSocket connection
socketRef.current = new WebSocket(`${WEBSOCKETURL}/ws/audio?lang=${selectedLanguage}`);
      socketRef.current.binaryType = "arraybuffer";

      socketRef.current.onopen = (): void => {
        setloading(false);
        setStatus("Connected - streaming audio...");

        if (!audioContextRef.current || !streamRef.current) return;

        // Set up audio processor
        const streamSource = audioContextRef.current.createMediaStreamSource(streamRef.current);
        processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

        processorRef.current.onaudioprocess = (event: AudioProcessingEvent): void => {
          if (socketRef.current?.readyState === WebSocket.OPEN && !isPlayingTTS) {
            const inputBuffer = event.inputBuffer.getChannelData(0);
            const pcmData = new Int16Array(inputBuffer.length);
            
            for (let i = 0; i < inputBuffer.length; i++) {
              pcmData[i] = Math.max(-32768, Math.min(32767, inputBuffer[i] * 32768));
            }
            
            socketRef.current.send(pcmData.buffer);
          }
        };

        streamSource.connect(processorRef.current);
        processorRef.current.connect(audioContextRef.current.destination);
        setIsStreaming(true);
      };

      socketRef.current.onmessage = processWebSocketMessage;

      socketRef.current.onclose = (): void => {
        setStatus("Disconnected");
        setIsStreaming(false);
      };

      socketRef.current.onerror = (error: Event): void => {
        console.error("WebSocket error:", error);
        setStatus("Connection error");
        setIsStreaming(false);
      };

    } catch (error) {
      console.error("Error starting stream:", error);
      setStatus("Error: " + (error as Error).message);
    }
  }, [selectedLanguage, WEBSOCKETURL, isPlayingTTS, analyzeAudio, processWebSocketMessage]);

  // Stop streaming
  const stopStreaming = useCallback((): void => {
    setStatus("Stopping...");

    // Clean up audio processor
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    // Clean up recording audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Clean up playback audio context
    if (playbackAudioContextRef.current) {
      playbackAudioContextRef.current.close();
      playbackAudioContextRef.current = null;
    }

    // Close WebSocket
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    // Stop media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Stop animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // Reset states
    setIsStreaming(false);
    setIsPlayingTTS(false);
    setIsRecording(false);
    setAudioLevel(0);
    setPitch(0);
    setStatus("Ready to start");
  }, []);

  // Handle toggle
  const handleToggle = useCallback((): void => {
    if (!isStreaming && loading) {
      startStreaming();

    } else {
      stopStreaming();
    }
  }, [isStreaming, startStreaming, stopStreaming]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStreaming();
    };
  }, [stopStreaming]);

  // Neon Orb Component
  const NeonOrbStyle: React.FC<NeonOrbStyleProps> = ({
    isActive,
    volume,
    pitch,
    onToggle,
    isPlayingTTS,
  }) => {
    const pulseSize = mobile ? 0.5 + (volume + pitch) * 0.3 : 0.8 + (volume + pitch) * 0.3;
    const glowIntensity = (volume + pitch) * 30;

    const getColors = (): { main: string; glow: string; shadow: string } => {
      if (isPlayingTTS) {
        return {
          main: "#059669",
          glow: "#10b981",
          shadow: "shadow-emerald-800/40",
        };
      }
      if (isActive) {
        return {
          main: "#1e3a8a",
          glow: "#1d4ed8",
          shadow: "shadow-blue-800/40",
        };
      }
      return { main: "#666666", glow: "#666666", shadow: "shadow-gray-500/30" };
    };

    const colors = getColors();

    return (
      <div className="flex flex-col items-center space-y-8 mb-4">
        <div className="relative">
          {/* Outer Rings */}
          {(isActive || isPlayingTTS) &&
            [1, 2, 3].map((ring) => (
              <div
                key={ring}
                className="absolute inset-0 rounded-full border-2 animate-ping"
                style={{
                  borderColor: colors.glow,
                  opacity: 0.3 / ring,
                  scale: mobile ? 0.5 + ring * 0.2 : 0.6 + ring * 0.2,
                  animationDuration: `${2 + ring}s`,
                }}
              />
            ))}

          {/* Main Orb */}
          <div
            className={`w-28 h-28  md:w-48 md:h-48 rounded-full relative ${colors.shadow} shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105`}
            style={{
              transform: `scale(${pulseSize})`,
              background: `radial-gradient(circle, ${colors.main}40, ${colors.main}20, transparent)`,
              boxShadow: `0 0 ${glowIntensity}px ${colors.glow}80, inset 0 0 ${
                glowIntensity / 2
              }px ${colors.glow}40`,
            }}
            
            onClick={onToggle}
          >
            {/* Inner Orb */}
            <div
              className="absolute inset-6 rounded-full"
              style={{
                background: `radial-gradient(circle, ${colors.main}, ${colors.main}80)`,
                boxShadow: `0 0 ${glowIntensity / 2}px ${colors.glow}`,
              }}
            >
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isPlayingTTS ? (
                  <Volume2 className="w-8 h-8 md:w-16 md:h-16 text-white drop-shadow-lg animate-pulse" />
                ) : isActive ? (
                  <Mic className="w-8 h-8 md:w-16 md:h-16 text-white drop-shadow-lg" />
                ) : (
                  <MicOff className="w-8 h-8 md:w-16 md:h-16 text-white/60 drop-shadow-lg" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 xl:p-6 h-auto w-full text-white bg-gradient-to-br from-gray-900 to-gray-800 lg:h-[91vh]">
      {showTittle && (
        <div className="text-center mb-4 lg:mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Voice Assistant
          </h1>
          <p className="text-gray-300">Speak naturally and get intelligent responses</p>
        </div>
      )}

      {/* Language Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 rounded-xl p-2 md:p-4 shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <Globe className="text-blue-400" size={20} />
            <span className="text-white font-medium">Select Language</span>
          </div>
          <div className={`${mobile ? " grid grid-cols-3" : "flex flex-wrap"}  gap-2 justify-evenly md:justify-center md:mb-2`}>
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageChange(lang.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-1/7 md:w-auto mb-2 md:mb-0 ${
                  selectedLanguage === lang.value
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
                disabled={isStreaming}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Orb Interface */}
      <div className="flex items-center justify-center h-auto mb-4 lg:mb-8 px-4">
        <NeonOrbStyle
          isActive={isRecording}
          volume={audioLevel}
          pitch={pitch}
          onToggle={handleToggle}
          isPlayingTTS={isPlayingTTS}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {!isStreaming ? (
          <button
            onClick={startStreaming}
            disabled={loading}
            className="cursor-pointer flex items-center md:space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Play size={mobile ? 18 : 20} />
            <span className="text-[12px] md:text-base">Start Voice Chat</span>
          </button>
        ) : (
          <button
            onClick={stopStreaming}
            className="cursor-pointer flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Square size={20} />
            <span>Stop Voice Chat</span>
          </button>
        )}
      </div>

      {/* Status Indicator */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2">
          {isPlayingTTS ? (
            <>
              <Volume2 className="text-green-500 animate-pulse" size={16} />
              <span className="text-green-400 font-medium">Playing Response...</span>
            </>
          ) : isRecording ? (
            <>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 font-medium">Listening...</span>
            </>
          ) : (
            <>
              {isPermissionGranted ? (
                <>
                  <MicOff className="text-gray-400" size={16} />
                  <span className="text-gray-400">Ready to record</span>
                </>
              ) : (
                <>
                  <Mic className="text-gray-400" size={16} />
                  <span className="text-gray-400">Click start to access microphone</span>
                </>
              )}
            </>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">{status}</p>
      </div>
    </div>
  );
};

export default MicrophoneWaveVisualizer;