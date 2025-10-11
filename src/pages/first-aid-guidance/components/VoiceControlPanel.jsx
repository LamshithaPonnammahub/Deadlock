import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const VoiceControlPanel = ({ 
  onVoiceCommand, 
  isListening = false, 
  onToggleListening,
  currentInstruction,
  onPlayInstruction,
  onStopInstruction,
  isPlaying = false 
}) => {
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [recognizedText, setRecognizedText] = useState("");
  const [lastCommand, setLastCommand] = useState(null);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechVolume, setSpeechVolume] = useState(0.8);

  // Simulate voice level changes when listening
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setVoiceLevel(Math.random() * 100);
      }, 100);
    } else {
      setVoiceLevel(0);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const voiceCommands = [
    { command: "next step", action: "next", description: "Move to next instruction" },
    { command: "previous step", action: "previous", description: "Go back one step" },
    { command: "repeat", action: "repeat", description: "Repeat current instruction" },
    { command: "play audio", action: "play", description: "Play instruction to caller" },
    { command: "stop audio", action: "stop", description: "Stop audio playback" },
    { command: "emergency", action: "emergency", description: "Emergency escalation" },
    { command: "transfer call", action: "transfer", description: "Transfer to specialist" }
  ];

  const handleVoiceCommand = (command) => {
    setLastCommand(command);
    onVoiceCommand?.(command);
    
    // Clear recognized text after processing
    setTimeout(() => {
      setRecognizedText("");
    }, 2000);
  };

  const handleSpeechRateChange = (rate) => {
    setSpeechRate(rate);
    // In a real implementation, this would update the speech synthesis settings
  };

  const handleVolumeChange = (volume) => {
    setSpeechVolume(volume);
    // In a real implementation, this would update the speech synthesis volume
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Mic" size={18} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Voice Control</h3>
            <p className="text-sm text-muted-foreground">Hands-free operation</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`
            w-2 h-2 rounded-full
            ${isListening ? 'bg-success animate-breathing' : 'bg-muted'}
          `}></div>
          <span className="text-xs text-muted-foreground">
            {isListening ? "Listening" : "Standby"}
          </span>
        </div>
      </div>
      {/* Voice Recognition Status */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">Voice Recognition</h4>
          <Button
            variant={isListening ? "destructive" : "success"}
            size="sm"
            onClick={onToggleListening}
            iconName={isListening ? "MicOff" : "Mic"}
            iconPosition="left"
            iconSize={16}
          >
            {isListening ? "Stop Listening" : "Start Listening"}
          </Button>
        </div>

        {/* Voice Level Indicator */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Voice Level</span>
            <span className="text-xs font-mono text-foreground">{Math.round(voiceLevel)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`
                h-2 rounded-full transition-all duration-100
                ${voiceLevel > 70 ? 'bg-success' : voiceLevel > 30 ? 'bg-warning' : 'bg-primary'}
              `}
              style={{ width: `${voiceLevel}%` }}
            />
          </div>
        </div>

        {/* Recognized Text */}
        <div className="bg-muted/30 rounded-lg p-3 min-h-12">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="MessageSquare" size={14} color="var(--color-muted-foreground)" />
            <span className="text-xs font-medium text-foreground">Recognized Speech</span>
          </div>
          <p className="text-sm text-foreground">
            {recognizedText || (isListening ? "Listening for voice commands..." : "Voice recognition inactive")}
          </p>
        </div>
      </div>
      {/* Audio Playback Controls */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Audio Playback</h4>
        
        <div className="space-y-3">
          {/* Playback Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant={isPlaying ? "destructive" : "primary"}
              size="sm"
              onClick={isPlaying ? onStopInstruction : onPlayInstruction}
              iconName={isPlaying ? "Square" : "Play"}
              iconPosition="left"
              iconSize={16}
            >
              {isPlaying ? "Stop Audio" : "Play to Caller"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              Replay
            </Button>
          </div>

          {/* Speech Settings */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Speech Rate</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSpeechRateChange(Math.max(0.5, speechRate - 0.1))}
                  iconName="Minus"
                  iconSize={12}
                />
                <span className="text-sm font-mono text-foreground min-w-12 text-center">
                  {speechRate?.toFixed(1)}x
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSpeechRateChange(Math.min(2.0, speechRate + 0.1))}
                  iconName="Plus"
                  iconSize={12}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Volume</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVolumeChange(Math.max(0.1, speechVolume - 0.1))}
                  iconName="VolumeX"
                  iconSize={12}
                />
                <span className="text-sm font-mono text-foreground min-w-12 text-center">
                  {Math.round(speechVolume * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVolumeChange(Math.min(1.0, speechVolume + 0.1))}
                  iconName="Volume2"
                  iconSize={12}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Available Voice Commands */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Available Commands</h4>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {voiceCommands?.map((cmd, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">"{cmd?.command}"</p>
                <p className="text-xs text-muted-foreground">{cmd?.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVoiceCommand(cmd?.action)}
                iconName="Play"
                iconSize={14}
              />
            </div>
          ))}
        </div>

        {/* Last Command */}
        {lastCommand && (
          <div className="mt-3 p-2 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
              <span className="text-sm text-success font-medium">
                Last command: "{lastCommand}"
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="warning"
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Emergency Override
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconSize={16}
          />
        </div>
      </div>
    </div>
  );
};

export default VoiceControlPanel;