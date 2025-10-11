import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon.jsx';

const EmergencyStatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [callDuration, setCallDuration] = useState('00:02:34');
  const [incidentId, setIncidentId] = useState('EMG-2025-0926-001');
  const [severity, setSeverity] = useState('HIGH');
  const [dispatchStatus, setDispatchStatus] = useState('EN_ROUTE');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getSeverityConfig = (level) => {
    switch (level) {
      case 'CRITICAL':
        return { 
          bg: 'bg-error', 
          text: 'text-error-foreground', 
          icon: 'AlertTriangle',
          pulse: true 
        };
      case 'HIGH':
        return { 
          bg: 'bg-warning', 
          text: 'text-warning-foreground', 
          icon: 'AlertCircle',
          pulse: false 
        };
      case 'MEDIUM':
        return { 
          bg: 'bg-primary', 
          text: 'text-primary-foreground', 
          icon: 'Info',
          pulse: false 
        };
      default:
        return { 
          bg: 'bg-muted', 
          text: 'text-muted-foreground', 
          icon: 'Circle',
          pulse: false 
        };
    }
  };

  const getDispatchConfig = (status) => {
    switch (status) {
      case 'DISPATCHED':
        return { 
          bg: 'bg-success', 
          text: 'text-success-foreground', 
          label: 'Dispatched',
          icon: 'CheckCircle' 
        };
      case 'EN_ROUTE':
        return { 
          bg: 'bg-primary', 
          text: 'text-primary-foreground', 
          label: 'En Route',
          icon: 'Navigation' 
        };
      case 'PENDING':
        return { 
          bg: 'bg-warning', 
          text: 'text-warning-foreground', 
          label: 'Pending',
          icon: 'Clock' 
        };
      default:
        return { 
          bg: 'bg-muted', 
          text: 'text-muted-foreground', 
          label: 'Standby',
          icon: 'Pause' 
        };
    }
  };

  const severityConfig = getSeverityConfig(severity);
  const dispatchConfig = getDispatchConfig(dispatchStatus);

  return (
    <div className="fixed top-16 left-0 right-0 z-1100 glass-card border-b border-border/20 shadow-glow">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Active Call Info */}
        <div className="flex items-center space-x-6">
          {/* Call Duration */}
          <div className="flex items-center space-x-3">
            <div className="w-3.5 h-3.5 bg-gradient-success rounded-full animate-breathing shadow-glow-success"></div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-mono">Call Duration</span>
              <span className="text-sm font-bold text-foreground font-mono">{callDuration}</span>
            </div>
          </div>

          {/* Incident ID */}
          <div className="flex items-center space-x-2">
            <Icon name="Hash" size={16} color="var(--color-muted-foreground)" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Incident ID</span>
              <span className="text-sm font-semibold text-foreground font-mono">{incidentId}</span>
            </div>
          </div>

          {/* Severity Level */}
          <div className="flex items-center space-x-2">
            <div className={`
              flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold
              ${severityConfig?.bg} ${severityConfig?.text}
              ${severityConfig?.pulse ? 'animate-pulse-emergency shadow-glow-error' : 'shadow-medical'}
            `}>
              <Icon 
                name={severityConfig?.icon} 
                size={14} 
                color="currentColor" 
              />
              <span>{severity}</span>
            </div>
          </div>
        </div>

        {/* Center Section - Location Info */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Location</span>
              <span className="text-sm font-medium text-foreground">Downtown Medical Center</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Navigation" size={16} color="var(--color-muted-foreground)" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Coordinates</span>
              <span className="text-sm font-mono text-foreground">40.7128, -74.0060</span>
            </div>
          </div>
        </div>

        {/* Right Section - Dispatch Status & Time */}
        <div className="flex items-center space-x-6">
          {/* Dispatch Status */}
          <div className="flex items-center space-x-2">
            <div className={`
              flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold shadow-medical
              ${dispatchConfig?.bg} ${dispatchConfig?.text}
            `}>
              <Icon 
                name={dispatchConfig?.icon} 
                size={14} 
                color="currentColor" 
              />
              <span>{dispatchConfig?.label}</span>
            </div>
          </div>

          {/* Current Time */}
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Current Time</span>
              <span className="text-sm font-semibold text-foreground font-mono">
                {currentTime?.toLocaleTimeString('en-US', { 
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Compact View */}
      <div className="lg:hidden px-6 pb-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-muted-foreground">Location:</span>
            <span className="text-foreground font-medium">Downtown Medical</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-muted-foreground">Coords:</span>
            <span className="text-foreground font-mono">40.7128, -74.0060</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyStatusBar;