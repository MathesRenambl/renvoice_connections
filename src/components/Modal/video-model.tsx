import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Expand, Shrink, RotateCcw } from 'lucide-react';
import { useAppContext } from '@/hooks/context';

interface VideoModalProps {
  videoSrc: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ 
  videoSrc, 
  title = "Video Player" 
}) => {
    const {videoModel,setVideoModel}=useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout|null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Video model state:', videoModel);
    if (videoRef.current && videoModel) {
      videoRef.current.play().catch(console.error);
    }
  }, [videoModel]);

  // Handle orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      // Small delay to ensure the orientation change is complete
      setTimeout(() => {
        const isLandscape = window.innerWidth > window.innerHeight;
        setOrientation(isLandscape ? 'landscape' : 'portrait');
      }, 100);
    };

    // Initial check
    handleOrientationChange();

    // Listen for orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleMinimize = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFullscreen) {
      exitFullscreen();
    }
    setIsMinimized(!isMinimized);
  };

  const toggleFullscreen = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const requestLandscape = async () => {
    try {
      if (screen.orientation && (screen.orientation as any).lock) {
        await (screen.orientation as any).lock('landscape');
      }
    } catch (error) {
      console.log('Screen orientation lock not supported or failed');
    }
  };

  const onClose = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Unlock screen orientation when closing
    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    } catch (error) {
      console.log('Screen orientation unlock not supported');
    }
    
    setVideoModel(false);
    setIsPlaying(false);
    setIsMuted(true);
    setIsMinimized(false);
    setShowControls(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const enterFullscreen = async () => {
    if (containerRef.current) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen();
        } else if ((containerRef.current as any).msRequestFullscreen) {
          await (containerRef.current as any).msRequestFullscreen();
        }
        
        // On mobile, try to rotate to landscape for better video experience
        if (window.innerWidth < 768) {
          await requestLandscape();
        }
        
        setIsFullscreen(true);
        setIsMinimized(false);
      } catch (error) {
        console.log('Fullscreen request failed:', error);
      }
    }
  };

  const exitFullscreen = () => {
    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    } catch (error) {
      console.log('Screen orientation unlock not supported');
    }
    
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
      
      // If exiting fullscreen, unlock orientation
      if (!isCurrentlyFullscreen) {
        try {
          if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
          }
        } catch (error) {
          console.log('Screen orientation unlock not supported');
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleMouseEnter = () => {
    setShowControls(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    // Only hide controls on desktop, keep them visible on mobile
    if (window.innerWidth >= 768) {
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

  const handleVideoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // On mobile, toggle controls visibility
    if (window.innerWidth < 768) {
      setShowControls(!showControls);
    } else {
      // On desktop, toggle play/pause
      togglePlay(e);
    }
  };

  if (!videoModel) return null;

  // Determine video object-fit based on fullscreen state and device
  const getVideoObjectFit = () => {
    if (isFullscreen) {
      // In fullscreen, always use object-contain to prevent stretching
      return 'object-contain';
    }
    // For normal view, use object-cover to fill the container
    return 'object-cover';
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop for larger screens when not minimized */}
      {!isMinimized && !isFullscreen && (
        <div className="hidden md:block absolute inset-0 bg-black/20 pointer-events-auto" />
      )}
      
      {/* Video Modal */}
      <div 
        ref={containerRef}
        className={`
          fixed pointer-events-auto transition-all duration-300 ease-in-out
          ${isFullscreen 
            ? 'inset-0 w-full h-full bg-black flex items-center justify-center' 
            : isMinimized 
              ? 'bottom-4 right-4 w-48 h-28 sm:w-56 sm:h-32 md:w-64 md:h-36' 
              : 'bottom-4 right-4 w-80 h-48 sm:w-96 sm:h-56 md:bottom-8 md:right-8 md:w-[500px] md:h-80 lg:w-[600px] lg:h-96'
          }
        `}
      >
        <div className={`relative ${isFullscreen ? 'w-full h-full max-w-full max-h-full' : 'w-full h-full'} overflow-hidden shadow-2xl ${isFullscreen ? 'border-0 rounded-none bg-black' : 'border-2 rounded-lg bg-black'}`}>
          {/* Video Container */}
          <div className={`relative ${isFullscreen ? 'w-full h-full flex items-center justify-center' : 'h-full'}`}>
            {/* Mobile Fullscreen Rotation Hint */}
            {isFullscreen && window.innerWidth < 768 && orientation === 'portrait' && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black/80 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 pointer-events-none">
                <RotateCcw className="h-4 w-4" />
                Rotate device for better experience
              </div>
            )}
            
            {/* Video */}
            <video
              ref={videoRef}
              src={videoSrc}
              className={`
                ${isFullscreen 
                  ? `w-full h-full max-w-full max-h-full ${getVideoObjectFit()} bg-black` 
                  : `w-full h-full ${getVideoObjectFit()}`
                }
              `}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={handleVideoClick}
              onTouchEnd={handleVideoClick}
            />
          </div>
          
          {/* Controls Overlay */}
          <div
            className={`
              absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50
              transition-opacity duration-300 pointer-events-none
              ${showControls ? 'opacity-100' : 'opacity-0 md:opacity-0'}
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Top Controls */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-auto z-10">
              {!isMinimized && (
                <h3 className="text-white text-sm font-medium truncate flex-1 mr-2 pointer-events-none">
                  {title}
                </h3>
              )}
              <div className="flex gap-1">
                {!isMinimized && (
                  <button
                    onClick={toggleFullscreen}
                    onTouchEnd={toggleFullscreen}
                    className="h-8 w-8 p-0 rounded hover:bg-white/20 text-white flex items-center justify-center transition-colors touch-manipulation select-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {isFullscreen ? (
                      <Shrink className="h-4 w-4" />
                    ) : (
                      <Expand className="h-4 w-4" />
                    )}
                  </button>
                )}
                <button
                  onClick={toggleMinimize}
                  onTouchEnd={toggleMinimize}
                  className="h-8 w-8 p-0 rounded hover:bg-white/20 text-white flex items-center justify-center transition-colors touch-manipulation select-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  onTouchEnd={onClose}
                  className="h-8 w-8 p-0 rounded hover:bg-white/20 text-white flex items-center justify-center transition-colors touch-manipulation select-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Center Play Button (only when paused and not minimized) */}
            {!isPlaying && !isMinimized && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <button
                  onClick={togglePlay}
                  onTouchEnd={togglePlay}
                  className="h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm flex items-center justify-center transition-colors touch-manipulation select-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>
            )}
            
            {/* Bottom Controls */}
            <div className={`
              absolute bottom-2 left-2 right-2 flex justify-between items-center pointer-events-auto
              ${isMinimized ? 'gap-1' : 'gap-2'}
            `}>
              <div className="flex gap-1">
                <button
                  onClick={togglePlay}
                  onTouchEnd={togglePlay}
                  className="h-8 w-8 p-0 rounded hover:bg-white/20 text-white flex items-center justify-center transition-colors touch-manipulation select-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  onTouchEnd={toggleMute}
                  className="h-8 w-8 p-0 rounded hover:bg-white/20 text-white flex items-center justify-center transition-colors touch-manipulation select-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* Progress bar (only for larger screens when not minimized) */}
              {!isMinimized && (
                <div className="hidden sm:block flex-1 mx-2 pointer-events-none">
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div className="bg-white h-1 rounded-full w-0 transition-all duration-300" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
