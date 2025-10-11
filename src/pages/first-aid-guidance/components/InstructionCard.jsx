import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const InstructionCard = ({ 
  step, 
  isActive, 
  isCompleted, 
  onNext, 
  onPrevious, 
  onRepeat, 
  onVoicePlay,
  callerConfirmed 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime(prev => prev + 1);
      }, 1000);
    } else {
      setPlaybackTime(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleVoicePlay = () => {
    setIsPlaying(true);
    onVoicePlay?.(step?.instruction);
    // Simulate voice playback duration
    setTimeout(() => {
      setIsPlaying(false);
    }, step?.estimatedDuration * 1000);
  };

  const getStepIcon = () => {
    if (isCompleted) return 'CheckCircle';
    if (isActive) return step?.icon || 'Circle';
    return 'Circle';
  };

  const getStepStatus = () => {
    if (isCompleted) return { bg: 'bg-success', text: 'text-success-foreground', border: 'border-success' };
    if (isActive) return { bg: 'bg-primary', text: 'text-primary-foreground', border: 'border-primary' };
    return { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-muted' };
  };

  const status = getStepStatus();

  return (
    <div className={`
      relative bg-card border-2 rounded-lg shadow-medical transition-all duration-300
      ${isActive ? 'border-primary shadow-emergency animate-breathing' : 'border-border'}
      ${isCompleted ? 'border-success' : ''}
    `}>
      {/* Step Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center border-2
            ${status?.bg} ${status?.text} ${status?.border}
          `}>
            <Icon name={getStepIcon()} size={20} color="currentColor" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Step {step?.number}: {step?.title}
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                <span className="text-sm text-muted-foreground">
                  {step?.estimatedDuration}s duration
                </span>
              </div>
              {step?.priority && (
                <div className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${step?.priority === 'CRITICAL' ? 'bg-error text-error-foreground' : 
                    step?.priority === 'HIGH' ? 'bg-warning text-warning-foreground' : 
                    'bg-primary text-primary-foreground'}
                `}>
                  {step?.priority}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-2">
          {callerConfirmed && (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={16} color="currentColor" />
              <span className="text-sm font-medium">Confirmed</span>
            </div>
          )}
          {isActive && (
            <div className="w-2 h-2 bg-primary rounded-full animate-breathing"></div>
          )}
        </div>
      </div>
      {/* Instruction Content */}
      <div className="p-6">
        {/* Main Instruction */}
        <div className="mb-4">
          <p className="text-lg text-foreground leading-relaxed mb-3">
            {step?.instruction}
          </p>
          
          {/* Additional Details */}
          {step?.details && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">Important Details:</h4>
              <ul className="space-y-1">
                {step?.details?.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="ArrowRight" size={14} color="var(--color-muted-foreground)" className="mt-0.5" />
                    <span className="text-sm text-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Visual Cues */}
          {step?.visualCues && (
            <div className="bg-primary/10 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">What to Look For:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {step?.visualCues?.map((cue, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Eye" size={14} color="var(--color-primary)" />
                    <span className="text-sm text-foreground">{cue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {step?.warnings && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                <h4 className="text-sm font-semibold text-warning">Caution</h4>
              </div>
              <ul className="space-y-1">
                {step?.warnings?.map((warning, index) => (
                  <li key={index} className="text-sm text-foreground">• {warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Voice Controls */}
        <div className="flex items-center justify-between mb-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Button
              variant={isPlaying ? "destructive" : "primary"}
              size="sm"
              onClick={handleVoicePlay}
              iconName={isPlaying ? "Square" : "Play"}
              iconPosition="left"
              iconSize={16}
              disabled={!isActive}
            >
              {isPlaying ? "Stop Audio" : "Play to Caller"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onRepeat}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
              disabled={!isActive}
            >
              Repeat
            </Button>
          </div>

          {/* Playback Timer */}
          {isPlaying && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-breathing"></div>
              <span className="text-sm font-mono text-foreground">
                {Math.floor(playbackTime / 60)}:{(playbackTime % 60)?.toString()?.padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        {isActive && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onPrevious}
              iconName="ChevronLeft"
              iconPosition="left"
              iconSize={16}
              disabled={step?.number === 1}
            >
              Previous Step
            </Button>

            <div className="flex items-center space-x-2">
              {!callerConfirmed && (
                <Button
                  variant="warning"
                  size="sm"
                  iconName="AlertCircle"
                  iconPosition="left"
                  iconSize={16}
                >
                  Awaiting Confirmation
                </Button>
              )}
              
              <Button
                variant="success"
                onClick={onNext}
                iconName="ChevronRight"
                iconPosition="right"
                iconSize={16}
              >
                {step?.isLast ? "Complete Protocol" : "Next Step"}
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Progress Indicator */}
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted rounded-t-lg overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(playbackTime / (step?.estimatedDuration || 30)) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default InstructionCard;