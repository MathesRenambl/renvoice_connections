import React from 'react';
import {Mic, Radio, Volume2, Waves, AudioWaveform, Headset } from 'lucide-react';
import Preloader from './presloader';


const VoiceWaveLoader = ({ isLoading = true, variant = 'concentric' }) => {
  if (!isLoading) return null;

  const renderConcentricRings = () => (
    <div>
    <div className="relative flex items-center justify-center">
      {/* Outer ring */}
      <div className="absolute w-32 h-32 border-2 border-cyan-400 rounded-full animate-ping opacity-20"></div>
      <div className="absolute w-24 h-24 border-2 border-teal-500 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute w-16 h-16 border-2 border-cyan-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
      
      {/* Center microphone */}
      <div className="relative z-10 p-4 bg-gradient-to-br from-teal-700 to-cyan-600 rounded-full shadow-lg">
        <Headset size={32} className="text-white animate-pulse" />
      </div>
      </div>
      <div className=' text-center text-cyan-200'>loading</div>
    </div>
  );

  const renderOrbitingIcons = () => (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Central icon */}
      <div className="absolute z-10 p-3 bg-gradient-to-br from-teal-700 to-cyan-600 rounded-full">
        <AudioWaveform size={28} className="text-white" />
      </div>
      
      {/* Orbiting icons */}
      <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '3s' }}>
        <Mic size={20} className="absolute top-0 left-1/2 transform -translate-x-1/2 text-cyan-400" />
        <Volume2 size={20} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-teal-500" />
        <Radio size={20} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-cyan-300" />
        <Waves size={20} className="absolute left-0 top-1/2 transform -translate-y-1/2 text-teal-400" />
      </div>
      
      {/* Orbital path */}
      <div className="absolute w-full h-full border border-cyan-400 rounded-full opacity-30"></div>
    </div>
  );

  const renderPulsingWaves = () => (
    <div className="flex items-center justify-center space-x-6">
      {/* Left waves */}
      <div className="flex space-x-1">
        <Waves size={24} className="text-cyan-400 animate-pulse" style={{ animationDelay: '0s' }} />
        <Waves size={28} className="text-teal-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
      </div>
      
      {/* Center microphone */}
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-30"></div>
        <div className="relative z-10 p-4 bg-gradient-to-br from-teal-700 to-cyan-600 rounded-full">
          <Mic size={32} className="text-white" />
        </div>
      </div>
      
      {/* Right waves */}
      <div className="flex space-x-1">
        <Waves size={28} className="text-teal-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
        <Waves size={24} className="text-cyan-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
      </div>
    </div>
  );

  const renderFloatingIcons = () => (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-cyan-600 rounded-full opacity-20 animate-pulse"></div>
      
      {/* Floating icons */}
      <Mic 
        size={32} 
        className="absolute text-cyan-400 animate-bounce"
        style={{ 
          top: '20%', 
          left: '30%', 
          animationDelay: '0s',
          animationDuration: '2s' 
        }} 
      />
      <Volume2 
        size={28} 
        className="absolute text-teal-500 animate-bounce"
        style={{ 
          top: '60%', 
          right: '25%', 
          animationDelay: '0.5s',
          animationDuration: '2.5s' 
        }} 
      />
      <Radio 
        size={30} 
        className="absolute text-cyan-300 animate-bounce"
        style={{ 
          bottom: '20%', 
          left: '20%', 
          animationDelay: '1s',
          animationDuration: '2.2s' 
        }} 
      />
      <AudioWaveform 
        size={26} 
        className="absolute text-teal-400 animate-bounce"
        style={{ 
          top: '35%', 
          right: '30%', 
          animationDelay: '1.5s',
          animationDuration: '2.8s' 
        }} 
      />
      
      {/* Center dot */}
      <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
    </div>
  );

  const renderSpinningRecord = () => (
    <div className="relative flex items-center justify-center">
      {/* Spinning outer ring */}
      <div className="w-32 h-32 border-4 border-transparent border-t-cyan-400 border-r-teal-500 rounded-full animate-spin"></div>
      
      {/* Inner spinning ring */}
      <div className="absolute w-20 h-20 border-4 border-transparent border-b-cyan-300 border-l-teal-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      
      {/* Center icon */}
      <div className="absolute z-10 p-3 bg-gradient-to-br from-teal-700 to-cyan-600 rounded-full shadow-lg">
        <Volume2 size={28} className="text-white animate-pulse" />
      </div>
      
      {/* Decorative dots */}
      <div className="absolute w-2 h-2 bg-cyan-400 rounded-full" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)' }}></div>
      <div className="absolute w-2 h-2 bg-teal-500 rounded-full" style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}></div>
      <div className="absolute w-2 h-2 bg-cyan-300 rounded-full" style={{ top: '50%', right: '10%', transform: 'translateY(-50%)' }}></div>
      <div className="absolute w-2 h-2 bg-teal-400 rounded-full" style={{ top: '50%', left: '10%', transform: 'translateY(-50%)' }}></div>
    </div>
  );

  const variants = {
    concentric: renderConcentricRings,
    orbiting: renderOrbitingIcons,
    waves: renderPulsingWaves,
    floating: renderFloatingIcons,
    spinning: renderSpinningRecord
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-100 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <Preloader />
      </div>
    </div>
  );
};

export default VoiceWaveLoader;