import React, { useState } from 'react';
import Icon from '../AppIcon.jsx';
import Button from './Button';

const CallContextSidebar = ({ isCollapsed = false, onToggle }) => {
  const [activeTab, setActiveTab] = useState('caller');

  const callerInfo = {
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    location: '1234 Main Street, Downtown',
    coordinates: '40.7128, -74.0060',
    medicalHistory: ['Diabetes Type 2', 'Hypertension'],
    emergencyContact: 'Michael Johnson - Husband',
    contactPhone: '+1 (555) 987-6543'
  };

  const incidentDetails = {
    type: 'Medical Emergency',
    severity: 'HIGH',
    symptoms: ['Chest pain', 'Shortness of breath', 'Dizziness'],
    duration: '15 minutes',
    consciousness: 'Alert and responsive',
    breathing: 'Labored',
    pulse: 'Rapid and weak'
  };

  const communicationLog = [
    {
      timestamp: '14:02:34',
      type: 'incoming',
      message: 'Emergency call received from caller',
      operator: 'System'
    },
    {
      timestamp: '14:02:45',
      type: 'outgoing',
      message: 'What is your emergency?',
      operator: 'Operator'
    },
    {
      timestamp: '14:02:52',
      type: 'incoming',
      message: 'My husband is having chest pain and trouble breathing',
      operator: 'Caller'
    },
    {
      timestamp: '14:03:15',
      type: 'outgoing',
      message: 'I understand. Is he conscious and able to speak?',
      operator: 'Operator'
    },
    {
      timestamp: '14:03:22',
      type: 'incoming',
      message: 'Yes, but he looks very pale and sweaty',
      operator: 'Caller'
    }
  ];

  const tabs = [
    { id: 'caller', label: 'Caller Info', icon: 'User' },
    { id: 'incident', label: 'Incident', icon: 'AlertCircle' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' }
  ];

  const renderCallerInfo = () => (
    <div className="space-y-4">
      {/* Basic Info */}
      <div className="card-modern rounded-xl p-4 shadow-medical">
        <h4 className="text-sm font-bold text-gradient mb-3">Contact Details</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{callerInfo?.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm font-mono text-foreground">{callerInfo?.phone}</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="card-modern rounded-xl p-4 shadow-medical">
        <h4 className="text-sm font-bold text-gradient mb-3">Location</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" className="mt-0.5" />
            <span className="text-sm text-foreground">{callerInfo?.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Navigation" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm font-mono text-foreground">{callerInfo?.coordinates}</span>
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div className="card-modern rounded-xl p-4 shadow-medical">
        <h4 className="text-sm font-bold text-gradient mb-3">Medical History</h4>
        <div className="space-y-1">
          {callerInfo?.medicalHistory?.map((condition, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Heart" size={12} color="var(--color-warning)" />
              <span className="text-sm text-foreground">{condition}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="card-modern rounded-xl p-4 shadow-medical">
        <h4 className="text-sm font-bold text-gradient mb-3">Emergency Contact</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="UserCheck" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{callerInfo?.emergencyContact}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm font-mono text-foreground">{callerInfo?.contactPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIncidentDetails = () => (
    <div className="space-y-4">
      {/* Incident Type & Severity */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-foreground">Incident Classification</h4>
          <div className="bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium">
            {incidentDetails?.severity}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
          <span className="text-sm text-foreground">{incidentDetails?.type}</span>
        </div>
      </div>

      {/* Symptoms */}
      <div className="bg-muted/50 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-foreground mb-2">Reported Symptoms</h4>
        <div className="space-y-1">
          {incidentDetails?.symptoms?.map((symptom, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Circle" size={8} color="var(--color-error)" />
              <span className="text-sm text-foreground">{symptom}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vital Signs */}
      <div className="bg-muted/50 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-foreground mb-2">Current Status</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Consciousness:</span>
            <span className="text-sm text-foreground">{incidentDetails?.consciousness}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Breathing:</span>
            <span className="text-sm text-foreground">{incidentDetails?.breathing}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Pulse:</span>
            <span className="text-sm text-foreground">{incidentDetails?.pulse}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Duration:</span>
            <span className="text-sm text-foreground">{incidentDetails?.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunicationLog = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Call Transcript</h4>
        <div className="w-2 h-2 bg-success rounded-full animate-breathing"></div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {communicationLog?.map((entry, index) => (
          <div key={index} className={`
            flex space-x-3 p-3 rounded-lg
            ${entry?.type === 'incoming' ? 'bg-primary/10' : 'bg-muted/50'}
          `}>
            <div className="flex-shrink-0">
              <Icon 
                name={entry?.type === 'incoming' ? 'ArrowDown' : 'ArrowUp'} 
                size={14} 
                color={entry?.type === 'incoming' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">{entry?.operator}</span>
                <span className="text-xs font-mono text-muted-foreground">{entry?.timestamp}</span>
              </div>
              <p className="text-sm text-foreground">{entry?.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'caller':
        return renderCallerInfo();
      case 'incident':
        return renderIncidentDetails();
      case 'communication':
        return renderCommunicationLog();
      default:
        return renderCallerInfo();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`
        hidden lg:block fixed left-0 top-32 bottom-0 z-1000 glass-card border-r border-border/20 shadow-glow
        transition-all duration-300 ease-out
        ${isCollapsed ? 'w-16' : 'w-80'}
      `}>
        {isCollapsed ? (
          /* Collapsed State */
          (<div className="p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              iconName="ChevronRight"
              iconSize={20}
              className="w-full"
            />
            <div className="mt-6 space-y-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow animate-float">
                <Icon name="User" size={18} color="white" />
              </div>
              <div className="w-10 h-10 bg-gradient-warning rounded-full flex items-center justify-center mx-auto shadow-glow animate-float" style={{ animationDelay: '0.2s' }}>
                <Icon name="AlertCircle" size={18} color="white" />
              </div>
              <div className="w-10 h-10 bg-gradient-success rounded-full flex items-center justify-center mx-auto animate-breathing shadow-glow-success">
                <Icon name="MessageSquare" size={18} color="white" />
              </div>
            </div>
          </div>)
        ) : (
          /* Expanded State */
          (<div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/20">
              <h3 className="text-xl font-bold text-gradient">Call Context</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                iconName="ChevronLeft"
                iconSize={20}
                className="hover:shadow-glow"
              />
            </div>
            {/* Tabs */}
            <div className="flex border-b border-border/20 overflow-hidden">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex-1 flex items-center justify-center space-x-1 py-3 px-2 text-xs font-semibold transition-all duration-300 min-w-0
                    ${activeTab === tab?.id 
                      ? 'text-primary border-b-2 border-primary bg-primary/10 shadow-glow' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }
                  `}
                >
                  <Icon 
                    name={tab?.icon} 
                    size={16} 
                    color={activeTab === tab?.id ? 'var(--color-primary)' : 'currentColor'} 
                  />
                  <span className="hidden xl:inline truncate">{tab?.label}</span>
                </button>
              ))}
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderTabContent()}
            </div>
          </div>)
        )}
      </div>
      {/* Mobile Slide-in Panel */}
      <div className="lg:hidden">
        {/* Mobile trigger would be handled by parent component */}
      </div>
    </>
  );
};

export default CallContextSidebar;