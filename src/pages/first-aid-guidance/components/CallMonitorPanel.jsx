import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const CallMonitorPanel = ({ 
  callDuration = "00:03:42", 
  callerName = "Sarah Johnson",
  onEmergencyEscalation,
  onCallTransfer 
}) => {
  const [isRecording, setIsRecording] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcriptionEnabled, setTranscriptionEnabled] = useState(true);

  const [recentTranscription] = useState([
    {
      timestamp: "14:03:42",
      speaker: "Caller",
      text: "Okay, I'm checking his pulse now. It feels very weak and fast."
    },
    {
      timestamp: "14:03:35",
      speaker: "Operator",
      text: "Good. Now place two fingers on his wrist, just below his thumb. Can you feel a pulse?"
    },
    {
      timestamp: "14:03:28",
      speaker: "Caller", 
      text: "Yes, I can see his chest moving up and down, but it looks difficult."
    },
    {
      timestamp: "14:03:20",
      speaker: "Operator",
      text: "Perfect. Is he breathing? Look at his chest - is it rising and falling?"
    }
  ]);

  // Simulate audio level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
            <Icon name="Phone" size={18} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Active Call Monitor</h3>
            <p className="text-sm text-muted-foreground">Real-time call supervision</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-breathing"></div>
          <span className="text-xs text-muted-foreground">Call Active</span>
        </div>
      </div>
      {/* Call Status */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Call Duration */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={18} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Call Duration</p>
              <p className="text-lg font-semibold font-mono text-foreground">{callDuration}</p>
            </div>
          </div>

          {/* Caller Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="User" size={18} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Caller</p>
              <p className="text-lg font-semibold text-foreground">{callerName}</p>
            </div>
          </div>

          {/* Audio Level */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Volume2" size={18} color="var(--color-warning)" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Audio Level</p>
              <div className="w-full bg-muted rounded-full h-2 mt-1">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-200"
                  style={{ width: `${audioLevel}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Call Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="sm"
              onClick={handleMuteToggle}
              iconName={isMuted ? "MicOff" : "Mic"}
              iconPosition="left"
              iconSize={16}
            >
              {isMuted ? "Unmute" : "Mute"}
            </Button>

            <Button
              variant={isRecording ? "success" : "outline"}
              size="sm"
              onClick={handleRecordingToggle}
              iconName={isRecording ? "Circle" : "Square"}
              iconPosition="left"
              iconSize={16}
            >
              {isRecording ? "Recording" : "Start Recording"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              iconSize={16}
            >
              Audio Settings
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="warning"
              size="sm"
              onClick={onCallTransfer}
              iconName="PhoneForwarded"
              iconPosition="left"
              iconSize={16}
            >
              Transfer Call
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={onEmergencyEscalation}
              iconName="AlertTriangle"
              iconPosition="left"
              iconSize={16}
              className="animate-breathing"
            >
              Emergency Escalation
            </Button>
          </div>
        </div>
      </div>
      {/* Live Transcription */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">Live Transcription</h4>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTranscriptionEnabled(!transcriptionEnabled)}
              iconName={transcriptionEnabled ? "Eye" : "EyeOff"}
              iconSize={16}
            >
              {transcriptionEnabled ? "Hide" : "Show"}
            </Button>
          </div>
        </div>

        {transcriptionEnabled && (
          <div className="bg-muted/30 rounded-lg p-3 max-h-64 overflow-y-auto">
            <div className="space-y-3">
              {recentTranscription?.map((entry, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                      ${entry?.speaker === 'Caller' ?'bg-primary text-primary-foreground' :'bg-success text-success-foreground'
                      }
                    `}>
                      {entry?.speaker === 'Caller' ? 'C' : 'O'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium text-foreground">{entry?.speaker}</span>
                      <span className="text-xs font-mono text-muted-foreground">{entry?.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground">{entry?.text}</p>
                  </div>
                </div>
              ))}
              
              {/* Live indicator */}
              <div className="flex items-center space-x-2 pt-2 border-t border-border">
                <div className="w-2 h-2 bg-success rounded-full animate-breathing"></div>
                <span className="text-xs text-muted-foreground">Listening...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Call Quality Indicators */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-1">
              <Icon name="Wifi" size={14} color="var(--color-success)" />
              <span className="text-xs text-success font-medium">Excellent</span>
            </div>
            <span className="text-xs text-muted-foreground">Connection</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-1">
              <Icon name="Volume2" size={14} color="var(--color-success)" />
              <span className="text-xs text-success font-medium">Clear</span>
            </div>
            <span className="text-xs text-muted-foreground">Audio Quality</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={14} color="var(--color-warning)" />
              <span className="text-xs text-warning font-medium">12ms</span>
            </div>
            <span className="text-xs text-muted-foreground">Latency</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallMonitorPanel;