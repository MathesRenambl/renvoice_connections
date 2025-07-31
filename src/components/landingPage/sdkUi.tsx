import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Play, Square, Volume2, VolumeX } from "lucide-react";
import { Noto_Sans_Mende_Kikakui } from "next/font/google";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const SdkUi = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [status, setStatus] = useState("Ready to start");
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
 

    const [selected, setSelected] = useState("bestie");

  const handleSelect = (option) => {
    setSelected(option);
  };

  // Audio context and analysis refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  // WebSocket and audio processing refs
  const socketRef = useRef<WebSocket | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  
  // TTS audio handling refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioChunksRef = useRef<Uint8Array[]>([]);
  const audioContextForPlaybackRef = useRef<AudioContext | null>(null);
  const currentAudioUrlRef = useRef<string | null>(null);
  const isCleaningUpRef = useRef<boolean>(false);

//   const startStreaming = async () => {
//     try {
//       setStatus("Starting...");
//       // setIsStreaming(true);
//       setConversationHistory([]);

//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: {
//           sampleRate: 16000,
//           channelCount: 1,
//           echoCancellation: true,
//           noiseSuppression: true,
//           autoGainControl: true,
//         },
//       });

//       audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
//         sampleRate: 16000,
//       });

//       // Initialize playback audio context
//       audioContextForPlaybackRef.current = new (window.AudioContext || window.webkitAudioContext)();

//       streamRef.current = stream;
//       setIsPermissionGranted(true);

//       analyserRef.current = audioContextRef.current.createAnalyser();
//       const source = audioContextRef.current.createMediaStreamSource(stream);
//       source.connect(analyserRef.current);

//       analyserRef.current.fftSize = 2048;
//       analyserRef.current.smoothingTimeConstant = 0.8;

//       const bufferLength = analyserRef.current.frequencyBinCount;
//       dataArrayRef.current = new Uint8Array(bufferLength);

//       setIsRecording(true);
//       analyzeAudio();

//       // WebSocket connection
     
//       // socketRef.current = new WebSocket(`ws://localhost:8000/ws/${selected}`);
//       // socketRef.current = new WebSocket(`ws://192.168.1.24:8000/ws/${selected}`);
// // socketRef.current = new WebSocket(`wss://f028-115-96-101-8.ngrok-free.app/ws/${selected}`);
// socketRef.current = new WebSocket(`wss://a163-115-96-101-8.ngrok-free.app/ws/${selected}`);
      
    
//       socketRef.current.binaryType = "arraybuffer";

//       socketRef.current.onopen = () => {
//         console.log("WebSocket connected");
//         setStatus("Connected - streaming audio...");

//         const source = audioContextRef.current!.createMediaStreamSource(stream);
//         processorRef.current = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
        
//         processorRef.current.onaudioprocess = (event) => {
//           if (socketRef.current?.readyState === WebSocket.OPEN && !isPlayingTTS) {
//             const inputBuffer = event.inputBuffer.getChannelData(0);
//             const pcmData = new Int16Array(inputBuffer.length);
//             for (let i = 0; i < inputBuffer.length; i++) {
//               pcmData[i] = Math.max(-32768, Math.min(32767, inputBuffer[i] * 32768));
//             }
//             socketRef.current.send(pcmData.buffer);
//           }
//         };

//         source.connect(processorRef.current);
//         processorRef.current.connect(audioContextRef.current!.destination);
//         setIsStreaming(true);
//       };



// let audioContext = null;
// let audioQueue = [];
// let audioSampleRate = 24000; // Match this with TTS backend
// let isPlaying = false;
// let waitingForPrebuffer = true;
// let scheduledTime = 0;
// const MIN_BUFFER_CHUNKS = 3;
// let audioEndedReceived = false;

// let lastAudioSource = null; // Track the last audio source
// let audioPlaybackCallback = null; // Callback for when audio truly ends

// // socketRef.current.onmessage = async (event) => {
// //   if (typeof event.data === "string") {
// //     const msg = JSON.parse(event.data);

// //     if (msg.type === "audio_start") {
// //       console.log("🔊 Audio streaming started");

// //       // setIsPlayingTTS(true);
// //       setStatus("Receiving and playing audio...");

    
// //       if (audioContext) {
// //         await audioContext.close();
// //       }

// //       audioContext = new (window.AudioContext || window.webkitAudioContext)({
// //         sampleRate: audioSampleRate,
// //       });

// //       audioQueue = [];
// //       isPlaying = false;
// //       waitingForPrebuffer = true;
// //       scheduledTime = audioContext.currentTime;
// //       audioEndedReceived = false;

// //     } else if (msg.type === "audio_end") {
// //       console.log("🔚 Audio stream ended");
// //       audioEndedReceived = true;

// //       // If queue is empty and not playing, finalize
// //       if (!isPlaying && audioQueue.length === 0) {
// //         finalizePlayback();
// //       }
// //     }

// //   } else if (event.data instanceof ArrayBuffer) {
// //     const pcmData = new Int16Array(event.data);
// //     const float32Data = new Float32Array(pcmData.length);
// //     for (let i = 0; i < pcmData.length; i++) {
// //       float32Data[i] = pcmData[i] / 32768;
// //     }

// //     audioQueue.push(float32Data);

// //     if (waitingForPrebuffer && audioQueue.length >= MIN_BUFFER_CHUNKS) {
// //       isPlaying = true;
// //       waitingForPrebuffer = false;
// //       playBufferedAudio();
// //     } else if (!isPlaying) {
// //       // just buffer, not yet started
// //     } else {
// //       playBufferedAudio(); // Continue playback for later chunks
// //     }
// //   }
// // };

// // function playBufferedAudio() {
// //   if (!audioContext) return;

// //   while (audioQueue.length > 0) {
// //     const data = audioQueue.shift();
// //     const buffer = audioContext.createBuffer(1, data.length, audioSampleRate);
// //     buffer.copyToChannel(data, 0);

// //     const source = audioContext.createBufferSource();
// //     source.buffer = buffer;
// //     source.connect(audioContext.destination);

// //     source.start(scheduledTime);
// //     const duration = data.length / audioSampleRate;
// //     scheduledTime += duration;

// //     // source.onended = () => {
// //     //   if (audioQueue.length === 0 && audioEndedReceived) {
// //     //     finalizePlayback();
// //     //     console.log("🔚 Playback ended");
// //     //   }
// //     // };
// //     console.log("🔊 Playing audio chunk, scheduled at:", audioQueue,audioEndedReceived);
// //     if (audioQueue.length === 0 && audioEndedReceived) {
// //   source.onended = () => {
// //     console.log("✅ Actual voice playback just ended");
// //     finalizePlayback();
// //   };
// // }

// //   }
// // }


// socketRef.current.onmessage = async (event) => {
//     if (typeof event.data === "string") {
//         const msg = JSON.parse(event.data);
//         if (msg.type === "audio_start") {
//             console.log("🔊 Audio streaming started");
//             setIsPlayingTTS(true);
//             setStatus("Receiving and playing audio...");
//             if (audioContext) {
//                 await audioContext.close();
//             }
//             audioContext = new (window.AudioContext || window.webkitAudioContext)({
//                 sampleRate: audioSampleRate,
//             });
//             audioQueue = [];
//             isPlaying = false;
//             waitingForPrebuffer = true;
//             scheduledTime = audioContext.currentTime;
//             audioEndedReceived = false;
//             lastAudioSource = null; // Reset
//         } else if (msg.type === "audio_end") {
//             console.log("🔚 Audio stream ended");
//             audioEndedReceived = true;
//             // Don't finalize here - wait for actual audio to finish
//             if (!isPlaying && audioQueue.length === 0) {
//                 finalizePlayback();
//             }
//         }
//     } else if (event.data instanceof ArrayBuffer) {
//         const pcmData = new Int16Array(event.data);
//         const float32Data = new Float32Array(pcmData.length);
//         for (let i = 0; i < pcmData.length; i++) {
//             float32Data[i] = pcmData[i] / 32768;
//         }
//         audioQueue.push(float32Data);
        
//         if (waitingForPrebuffer && audioQueue.length >= MIN_BUFFER_CHUNKS) {
//             isPlaying = true;
//             waitingForPrebuffer = false;
//             playBufferedAudio();
//         } else if (!isPlaying) {
//             // just buffer, not yet started
//         } else {
//             playBufferedAudio();
//         }
//     }
// };

// function playBufferedAudio() {
//     if (!audioContext) return;
    
//     while (audioQueue.length > 0) {
//         const data = audioQueue.shift();
//         const buffer = audioContext.createBuffer(1, data.length, audioSampleRate);
//         buffer.copyToChannel(data, 0);
        
//         const source = audioContext.createBufferSource();
//         source.buffer = buffer;
//         source.connect(audioContext.destination);
//         source.start(scheduledTime);
        
//         const duration = data.length / audioSampleRate;
//         scheduledTime += duration;
        
//         // Keep track of the last source
//         lastAudioSource = source;
        
//         source.onended = () => {
//             // Only finalize if this is the last source AND stream has ended
//             if (source === lastAudioSource && audioEndedReceived && audioQueue.length === 0) {
//                 finalizePlayback();
//                 console.log("🔚 Audio truly finished playing");
//             }
//         };
//     }
// }

// function finalizePlayback() {
//     console.log("🔚 Playback completely finished");
//     setStatus("Audio playback completed");
//     isPlaying = false;
    
//     // Call your callback when audio is truly done
//     if (audioPlaybackCallback) {
//         audioPlaybackCallback();
//         audioPlaybackCallback = null;
//     }
// }

// // Function to set a callback for when audio finishes
// function onAudioFinished(callback) {
//     audioPlaybackCallback = callback;
// }

// // Usage:
// onAudioFinished(() => {
//     console.log("Audio has completely finished playing!");
//     setIsPlayingTTS(false);
//     setStatus("Playback finished");
//     // Your code here
// });

// // function finalizePlayback() {
// //   console.log("✅ Playback fully completed.");
// //   isPlaying = false;
// //   // Optionally reset UI status
// // }

//       socketRef.current.onclose = () => {
//         console.log("WebSocket disconnected");
//         setStatus("Disconnected");
//         setIsStreaming(false);
//         // setIsRecording(false);
//         // setIsPlayingTTS(false);
//       };

//       socketRef.current.onerror = (error) => {
//         console.error("WebSocket error:", error);
//         console.log("Cleaning up previous audio...");
//         setStatus("Connection error");
//         setIsStreaming(false);
//         // setIsRecording(false);
//         // setIsPlayingTTS(false);
//       };

//     } catch (error) {
//       console.error("Error starting stream:", error);
//       setStatus("Error: " + (error as Error).message);
//     }
//   };

  
const startStreaming = async () => {
  try {
    setStatus("Starting...");

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 16000,
    });

    // Initialize playback audio context
    audioContextForPlaybackRef.current = new (window.AudioContext || window.webkitAudioContext)();

    streamRef.current = stream;
    setIsPermissionGranted(true);

    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);

    analyserRef.current.fftSize = 2048;
    analyserRef.current.smoothingTimeConstant = 0.8;

    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    setIsRecording(true);
    analyzeAudio();

    // WebSocket connection
    socketRef.current = new WebSocket(`wss://a163-115-96-101-8.ngrok-free.app/ws/${selected}`);
    socketRef.current.binaryType = "arraybuffer";

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setStatus("Connected - streaming audio...");

      const source = audioContextRef.current!.createMediaStreamSource(stream);
      processorRef.current = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
      
      processorRef.current.onaudioprocess = (event) => {
        if (socketRef.current?.readyState === WebSocket.OPEN && !isPlayingTTS) {
          const inputBuffer = event.inputBuffer.getChannelData(0);
          const pcmData = new Int16Array(inputBuffer.length);
          for (let i = 0; i < inputBuffer.length; i++) {
            pcmData[i] = Math.max(-32768, Math.min(32767, inputBuffer[i] * 32768));
          }
          socketRef.current.send(pcmData.buffer);
        }
      };

      source.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current!.destination);
      setIsStreaming(true);
    };

    // Improved audio playback variables
    let audioContext = null;
    let audioQueue = [];
    let audioSampleRate = 24000;
    let isPlaying = false;
    let waitingForPrebuffer = true;
    let scheduledTime = 0;
    const MIN_BUFFER_CHUNKS = 5; // Increased buffer size
    let audioEndedReceived = false;
    let lastAudioSource = null;
    let audioPlaybackCallback = null;
    let gainNode = null; // Add gain node for volume control

    socketRef.current.onmessage = async (event) => {
      if (typeof event.data === "string") {
        const msg = JSON.parse(event.data);
        if (msg.type === "audio_start") {
          console.log("🔊 Audio streaming started");
          setIsPlayingTTS(true);
          setStatus("Receiving and playing audio...");
          
          // Clean up previous audio context
          if (audioContext) {
            try {
              await audioContext.close();
            } catch (e) {
              console.log("Audio context already closed");
            }
          }
          
          // Create new audio context with proper settings
          audioContext = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: audioSampleRate,
            latencyHint: 'interactive'
          });
          
          // Create gain node for smoother audio transitions
          gainNode = audioContext.createGain();
          gainNode.connect(audioContext.destination);
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          
          // Reset all variables
          audioQueue = [];
          isPlaying = false;
          waitingForPrebuffer = true;
          scheduledTime = audioContext.currentTime + 0.1; // Small delay to prevent glitches
          audioEndedReceived = false;
          lastAudioSource = null;
          
        } else if (msg.type === "audio_end") {
          console.log("🔚 Audio stream ended");
          audioEndedReceived = true;
          if (!isPlaying && audioQueue.length === 0) {
            finalizePlayback();
          }
        }
      } else if (event.data instanceof ArrayBuffer) {
        // Skip empty or very small buffers that might cause glitches
        if (event.data.byteLength < 64) {
          console.log("Skipping small/empty audio buffer");
          return;
        }
        
        const pcmData = new Int16Array(event.data);
        const float32Data = new Float32Array(pcmData.length);
        
        // Improved PCM to float conversion with bounds checking
        for (let i = 0; i < pcmData.length; i++) {
          let sample = pcmData[i] / 32768.0;
          // Clamp to prevent clipping
          sample = Math.max(-1.0, Math.min(1.0, sample));
          float32Data[i] = sample;
        }
        
        audioQueue.push(float32Data);
        
        if (waitingForPrebuffer && audioQueue.length >= MIN_BUFFER_CHUNKS) {
          console.log("Starting playback with sufficient buffer");
          isPlaying = true;
          waitingForPrebuffer = false;
          // Fade in the audio to prevent click/pop
          if (gainNode) {
            gainNode.gain.linearRampToValueAtTime(1.0, audioContext.currentTime + 0.05);
          }
          playBufferedAudio();
        } else if (isPlaying) {
          playBufferedAudio();
        }
      }
    };

    function playBufferedAudio() {
      if (!audioContext || !gainNode) return;
      
      while (audioQueue.length > 0) {
        const data = audioQueue.shift();
        
        // Skip empty or corrupted data
        if (!data || data.length === 0) {
          continue;
        }
        
        try {
          const buffer = audioContext.createBuffer(1, data.length, audioSampleRate);
          buffer.copyToChannel(data, 0);
          
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(gainNode); // Connect to gain node instead of destination
          
          // Ensure scheduled time is valid
          const startTime = Math.max(scheduledTime, audioContext.currentTime);
          source.start(startTime);
          
          const duration = data.length / audioSampleRate;
          scheduledTime = startTime + duration;
          
          lastAudioSource = source;
          
          source.onended = () => {
            if (source === lastAudioSource && audioEndedReceived && audioQueue.length === 0) {
              finalizePlayback();
              console.log("🔚 Audio truly finished playing");
              setIsPlayingTTS(false);
            }
          };
          
        } catch (error) {
          console.error("Error playing audio buffer:", error);
        }
      }
    }

    function finalizePlayback() {
      console.log("🔚 Playbook completely finished");
      
      // Fade out to prevent click/pop
      if (gainNode && audioContext) {
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05);
      }
      
      setStatus("Audio playback completed");
      isPlaying = false;
      
      if (audioPlaybackCallback) {
        audioPlaybackCallback();
        audioPlaybackCallback = null;
      }
    }

    function onAudioFinished(callback) {
      audioPlaybackCallback = callback;
    }

    onAudioFinished(() => {
      console.log("Audio has completely finished playing!");
      setIsPlayingTTS(false);
      setStatus("Playback finished");
    });

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      setStatus("Disconnected");
      setIsStreaming(false);
      
      // Clean up audio context
      if (audioContext) {
        audioContext.close();
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("Connection error");
      setIsStreaming(false);
      
      // Clean up audio context
      if (audioContext) {
        audioContext.close();
      }
    };

  } catch (error) {
    console.error("Error starting stream:", error);
    setStatus("Error: " + (error as Error).message);
  }
};


  const cleanupPreviousAudio = async () => {
    isCleaningUpRef.current = true;
    
    try {
      // Stop and cleanup previous audio
      if (audioRef.current) {
        const audio = audioRef.current;
        
        // Remove event listeners first to prevent error events
        audio.onended = null;
        audio.onerror = null;
        audio.oncanplaythrough = null;
        audio.onloadstart = null;
        audio.onloadeddata = null;
        
        // Pause the audio if it's playing
        if (!audio.paused) {
          audio.pause();
        }
        
        // Reset current time
        audio.currentTime = 0;
        
        // Clear src to stop any loading
        audio.src = '';
        audio.load(); // This ensures the audio element is reset
        
        audioRef.current = null;
      }

      // Clean up previous blob URL
      if (currentAudioUrlRef.current) {
        URL.revokeObjectURL(currentAudioUrlRef.current);
        currentAudioUrlRef.current = null;
      }
      
      // Add a small delay to ensure cleanup is complete
      await new Promise(resolve => setTimeout(resolve, 50));
      
    } finally {
      isCleaningUpRef.current = false;
    }
  };

 
 

  const stopStreaming = () => {
    setStatus("Stopping...");

    // Clean up audio playback
    cleanupPreviousAudio();

    // Clean up audio processing
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (audioContextForPlaybackRef.current) {
      audioContextForPlaybackRef.current.close();
      audioContextForPlaybackRef.current = null;
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
    setStatus("Stopped");
    audioChunksRef.current = [];
  };

  const handleToggle = () => {
    if (!isStreaming) {
      startStreaming();
    } else {
      stopStreaming();
    }
  };

  const analyzeAudio = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    const average = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / dataArrayRef.current.length;
    setAudioLevel(average / 255);

    // Calculate pitch
    let maxIndex = 0;
    let maxValue = 0;

    if (!audioContextRef.current) return;
    const startIndex = Math.floor((80 * dataArrayRef.current.length) / (audioContextRef.current.sampleRate / 2));
    const endIndex = Math.floor((1000 * dataArrayRef.current.length) / (audioContextRef.current.sampleRate / 2));

    for (let i = startIndex; i < endIndex && i < dataArrayRef.current.length; i++) {
      if (dataArrayRef.current[i] > maxValue) {
        maxValue = dataArrayRef.current[i];
        maxIndex = i;
      }
    }

    const pitchValue = maxIndex / (endIndex - startIndex);
    setPitch(pitchValue);
    animationRef.current = requestAnimationFrame(analyzeAudio);
  };

  useEffect(() => {
    return () => {
      stopStreaming();
    };
  }, []);

  type NeonOrbStyleProps = {
    isActive: boolean;
    volume: number;
    pitch: number;
    onToggle: () => void;
    isPlayingTTS: boolean;
  };

  const NeonOrbStyle = ({ isActive, volume, pitch, onToggle, isPlayingTTS }: NeonOrbStyleProps) => {
    const pulseSize = 1 + (volume + pitch) * 0.3;
    const glowIntensity = (volume + pitch) * 30;

    const getColors = () => {
      if (isPlayingTTS) {
        return { main: "#059669", glow: "#10b981", shadow: "shadow-emerald-800/40" };
      }
      if (isActive) {
        return { main: "#1e3a8a", glow: "#1d4ed8", shadow: "shadow-blue-800/40" };
      }
      return { main: "#666666", glow: "#666666", shadow: "shadow-gray-500/30" };
    };

    const colors = getColors();

    return (
      <div className="flex flex-col  items-center space-y-8">
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
                  scale: 1 + ring * 0.2,
                  animationDuration: `${2 + ring}s`,
                }}
              />
            ))}

          {/* Main Orb */}
          <div
            className={`w-48 h-48 rounded-full relative ${colors.shadow} shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105`}
            style={{
              transform: `scale(${pulseSize})`,
              background: `radial-gradient(circle, ${colors.main}40, ${colors.main}20, transparent)`,
              boxShadow: `0 0 ${glowIntensity}px ${colors.glow}80, inset 0 0 ${glowIntensity / 2}px ${colors.glow}40`,
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
                  <Volume2 className="w-16 h-16 text-white drop-shadow-lg animate-pulse" />
                ) : isActive ? (
                  <Mic className="w-16 h-16 text-white drop-shadow-lg" />
                ) : (
                  <MicOff className="w-16 h-16 text-white/60 drop-shadow-lg" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
   <div className="flex gap-4 justify-center mb-[4rem]">
        <button
          onClick={() => handleSelect('bestie')}
          // className={`px-8 cursor-pointer py-0 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
          //   selected === 'webSearch'
          //     ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
          //     : 'bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-400'
          // }`}
          className={` h-[45px] cursor-pointer text-black px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105
            ${
                 selected === 'bestie'
              ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
              : 'bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-400'
            }
            `}
        >
           Bestie
        </button>
        <button
          onClick={() => handleSelect('car')}
         className={` h-[45px] cursor-pointer text-black px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105
            ${
                 selected === 'car'
              ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
              : 'bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-400'
            }
            `}
        >
           Car Intelligence
        </button>
        <button
          onClick={() => handleSelect('rag')}
          className={` h-[45px] cursor-pointer text-black px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105
            ${
                 selected === 'rag'
              ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
              : 'bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-400'
            }
            `}
        >
           Mykaasu Rag
        </button>
       
        <button
          onClick={() => handleSelect('webSearch')}
         className={`h-[45px] cursor-pointer text-black px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105
            ${
                 selected === 'webSearch'
              ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
              : 'bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-400'
            }
            `}
        >
           webSearch
        </button>
        
        <button
          onClick={() => handleSelect('translate')}
          className={` h-[45px] cursor-pointer text-black px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105
            ${
                 selected === 'translate'
              ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
              : 'bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-400'
            }
            `}
        >
          Translate
        </button>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Voice Assistant
        </h1>
        <p className="text-gray-300">Speak naturally and get intelligent responses</p>
      </div>

       

      {/* Main Orb Interface */}
      <div className="flex items-center justify-center h-64 mb-8 px-4">
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
            className=" cursor-pointer flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Play size={20} />
            <span>Start Voice Chat</span>
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

export default SdkUi;


// import { useState, useEffect, useRef } from "react";

// const AudioStreamingComponent = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlayingTTS, setIsPlayingTTS] = useState(false);
//   const [status, setStatus] = useState("Ready");
//   const [transcription, setTranscription] = useState("");

//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const audioChunksRef = useRef<Uint8Array[]>([]);
//   const socketRef = useRef<WebSocket | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const processorRef = useRef<ScriptProcessorNode | null>(null);
//   const audioContextRef = useRef<AudioContext | null>(null);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;

//       const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//       audioContextRef.current = audioContext;

//       const source = audioContext.createMediaStreamSource(stream);
//       const processor = audioContext.createScriptProcessor(4096, 1, 1);
//       processor.onaudioprocess = (e) => {
//         const input = e.inputBuffer.getChannelData(0);
//         const int16 = new Int16Array(input.length);
//         for (let i = 0; i < input.length; i++) {
//           int16[i] = input[i] * 32767;
//         }
//         if (socketRef.current?.readyState === WebSocket.OPEN && !isPlayingTTS) {
//           socketRef.current.send(int16.buffer);
//         }
//       };

//       source.connect(processor);
//       processor.connect(audioContext.destination);
//       processorRef.current = processor;

//       socketRef.current = new WebSocket("ws://localhost:8000/ws/audio");
//       socketRef.current.binaryType = "arraybuffer";

//       socketRef.current.onopen = () => {
//         setStatus("Connected & recording...");
//         setIsRecording(true);
//       };

//       socketRef.current.onmessage = async (event) => {
//         if (typeof event.data === "string") {
//           try {
//             const msg = JSON.parse(event.data);
//             if (msg.type === "transcription") {
//               setTranscription(msg.text);
//             } else if (msg.type === "audio_start") {
//               audioChunksRef.current = [];
//               setIsPlayingTTS(true);
//               setStatus("Receiving audio...");
//             } else if (msg.type === "audio_end") {
//               await playTTSChunks();
//             }
//           } catch (err) {
//             console.log("Received non-JSON string:", event.data);
//           }
//         } else if (event.data instanceof ArrayBuffer) {
//           audioChunksRef.current.push(new Uint8Array(event.data));
//         }
//       };

//       socketRef.current.onclose = () => {
//         setStatus("Disconnected");
//       };

//     } catch (err) {
//       console.error("Mic error:", err);
//       setStatus("Microphone access error");
//     }
//   };

//   const playTTSChunks = async () => {
//     const allData = audioChunksRef.current.reduce((acc, chunk) => {
//       const tmp = new Uint8Array(acc.length + chunk.length);
//       tmp.set(acc, 0);
//       tmp.set(chunk, acc.length);
//       return tmp;
//     }, new Uint8Array());

//     const blob = new Blob([allData], { type: "audio/mpeg" });
//     const url = URL.createObjectURL(blob);

//     const audio = new Audio();
//     audio.src = url;
//     audioRef.current = audio;

//     return new Promise<void>((resolve) => {
//       audio.onended = () => {
//         setIsPlayingTTS(false);
//         setStatus("Ready");
//         resolve();
//       };
//       audio.onerror = () => {
//         console.error("Playback failed");
//         setStatus("Playback error");
//         resolve();
//       };
//       audio.play().catch((e) => {
//         console.error("Autoplay failed", e);
//         setStatus("Playback error");
//         resolve();
//       });
//     });
//   };

//   const stopRecording = () => {
//     setStatus("Stopping...");
//     if (processorRef.current) {
//       processorRef.current.disconnect();
//     }
//     if (audioContextRef.current) {
//       audioContextRef.current.close();
//     }
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => t.stop());
//     }
//     if (socketRef.current) {
//       socketRef.current.close();
//     }
//     setIsRecording(false);
//     setIsPlayingTTS(false);
//     setStatus("Stopped");
//   };

//   useEffect(() => {
//     return () => stopRecording();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🎙️ Voice Assistant</h2>
//       <p>Status: {status}</p>
//       <button onClick={isRecording ? stopRecording : startRecording}>
//         {isRecording ? "Stop" : "Start"} Recording
//       </button>
//       <div style={{ marginTop: 20 }}>
//         <strong>Transcription:</strong>
//         <p>{transcription}</p>
//       </div>
//     </div>
//   );
// };

// export default AudioStreamingComponent;

