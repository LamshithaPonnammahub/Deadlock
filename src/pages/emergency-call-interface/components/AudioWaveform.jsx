import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const AudioWaveform = ({ isCallActive, audioLevel = 0.5, onMute, onRecord, onEndCall, isMuted = false, isRecording = false }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [waveformData, setWaveformData] = useState(Array(50)?.fill(0));

  useEffect(() => {
    if (!isCallActive) return;

    const updateWaveform = () => {
      setWaveformData(prev => {
        const newData = [...prev?.slice(1)];
        const amplitude = isCallActive ? (Math.random() * audioLevel + 0.1) : 0;
        newData?.push(amplitude);
        return newData;
      });
    };

    const interval = setInterval(updateWaveform, 100);
    return () => clearInterval(interval);
  }, [isCallActive, audioLevel]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const { width, height } = canvas;

    const draw = () => {
      ctx?.clearRect(0, 0, width, height);
      
      const barWidth = width / waveformData?.length;
      const centerY = height / 2;

      waveformData?.forEach((amplitude, index) => {
        const barHeight = amplitude * (height * 0.8);
        const x = index * barWidth;
        const y = centerY - barHeight / 2;

        // Gradient for active call
        if (isCallActive) {
          const gradient = ctx?.createLinearGradient(0, 0, 0, height);
          gradient?.addColorStop(0, '#2563EB');
          gradient?.addColorStop(0.5, '#3B82F6');
          gradient?.addColorStop(1, '#60A5FA');
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = '#E2E8F0';
        }

        ctx?.fillRect(x, y, barWidth - 2, barHeight);
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [waveformData, isCallActive]);

  return (
    <div className="card-modern border border-border/20 rounded-xl p-6 shadow-glow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`
            w-5 h-5 rounded-full transition-all duration-300 shadow-medical
            ${isCallActive ? 'bg-gradient-success animate-breathing shadow-glow-success' : 'bg-muted'}
          `} />
          <h3 className="text-xl font-bold text-gradient">
            {isCallActive ? 'Live Audio Stream' : 'Audio Inactive'}
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
          <Icon name="Volume2" size={16} />
          <span className="font-semibold">Level: {Math.round(audioLevel * 100)}%</span>
        </div>
      </div>

      {/* Waveform Visualization */}
      <div className="relative mb-8">
        <canvas
          ref={canvasRef}
          width={800}
          height={120}
          className="w-full h-32 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border/20 shadow-medical"
        />
        {!isCallActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Icon name="PhoneOff" size={40} color="var(--color-muted-foreground)" className="animate-float" />
              <p className="text-sm text-muted-foreground mt-3 font-medium">No active call</p>
            </div>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="flex items-center justify-center space-x-6">
        <Button
          variant={isMuted ? "destructive" : "outline"}
          size="lg"
          onClick={onMute}
          iconName={isMuted ? "MicOff" : "Mic"}
          iconPosition="left"
          iconSize={22}
          disabled={!isCallActive}
          className={`min-w-36 btn-gradient ${isMuted ? 'shadow-glow-error' : 'hover:shadow-glow'}`}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </Button>

        <Button
          variant={isRecording ? "warning" : "outline"}
          size="lg"
          onClick={onRecord}
          iconName={isRecording ? "Square" : "Circle"}
          iconPosition="left"
          iconSize={22}
          disabled={!isCallActive}
          className={`min-w-36 btn-gradient ${isRecording ? 'animate-pulse-emergency shadow-glow-error' : 'hover:shadow-glow'}`}
        >
          {isRecording ? 'Stop Recording' : 'Record'}
        </Button>

        <Button
          variant="destructive"
          size="lg"
          onClick={onEndCall}
          iconName="PhoneOff"
          iconPosition="left"
          iconSize={22}
          disabled={!isCallActive}
          className="min-w-36 btn-gradient shadow-glow-error hover:shadow-glow-error"
        >
          End Call
        </Button>
      </div>

      {/* Audio Quality Indicator */}
      <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1.5 bg-muted/20 px-3 py-1.5 rounded-full">
          <Icon name="Wifi" size={14} />
          <span className="font-semibold">Connection: Strong</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-muted/20 px-3 py-1.5 rounded-full">
          <Icon name="Volume2" size={14} />
          <span className="font-semibold">Quality: HD</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-muted/20 px-3 py-1.5 rounded-full">
          <Icon name="Clock" size={14} />
          <span className="font-semibold">Latency: 45ms</span>
        </div>
      </div>
    </div>
  );
};

export default AudioWaveform;