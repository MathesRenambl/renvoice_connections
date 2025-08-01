import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { Play, Pause } from 'lucide-react'

interface Props {
  audioUrl: string
}

const AudioWaveform: React.FC<Props> = ({ audioUrl }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const waveSurferRef = useRef<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const createWaveSurfer = () => {
    if (!containerRef.current) return

    // Destroy old instance if any
    waveSurferRef.current?.destroy()

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#ccc',
      progressColor: '#000',
      height: 64,
      barWidth: 2,
      cursorColor: '#333',
    })

    wavesurfer.load(audioUrl)
    wavesurfer.on('finish', () => setIsPlaying(false))

    waveSurferRef.current = wavesurfer
  }

  const togglePlay = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause()
      setIsPlaying(waveSurferRef.current.isPlaying())
    }
  }

  useEffect(() => {
    createWaveSurfer()

    const handleResize = () => {
      createWaveSurfer()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      waveSurferRef.current?.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [audioUrl])

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-black text-white hover:bg-gray-800"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      <div ref={containerRef} className="flex-1 w-full" />
    </div>
  )
}

export default AudioWaveform
