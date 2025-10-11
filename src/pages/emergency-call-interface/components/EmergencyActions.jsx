import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const EmergencyActions = ({ 
  classification = null, 
  extractedInfo = null, 
  onDispatch, 
  onProtocolAccess,
  onClarificationSent 
}) => {
  const navigate = useNavigate();
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);

  const emergencyProtocols = [
    {
      id: 'cpr',
      name: 'CPR Instructions',
      icon: 'Heart',
      category: 'cardiac',
      description: 'Cardiopulmonary resuscitation guidance'
    },
    {
      id: 'bleeding',
      name: 'Bleeding Control',
      icon: 'Droplets',
      category: 'accident',
      description: 'Stop severe bleeding techniques'
    },
    {
      id: 'choking',
      name: 'Choking Response',
      icon: 'Wind',
      category: 'other',
      description: 'Heimlich maneuver instructions'
    },
    {
      id: 'stroke',
      name: 'Stroke Assessment',
      icon: 'Brain',
      category: 'stroke',
      description: 'FAST stroke evaluation'
    }
  ];

  const clarificationQuestions = [
    "Can you confirm the exact address?",
    "Is the patient conscious and breathing?",
    "Are there any visible injuries?",
    "How many people need medical attention?",
    "Is the scene safe for responders?",
    "Does the patient have any known medical conditions?"
  ];

  const handleDispatch = async () => {
    if (!classification || !extractedInfo) {
      alert('Please ensure incident classification and location information are complete.');
      return;
    }

    setIsDispatching(true);
    
    try {
      // Simulate dispatch API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDispatchStatus('dispatched');
      setIsDispatching(false);
      
      if (onDispatch) {
        onDispatch({
          classification,
          location: extractedInfo?.location,
          patientCount: extractedInfo?.patientCount?.count,
          severity: classification?.severity
        });
      }

      // Navigate to dispatch tracking
      setTimeout(() => {
        navigate('/ambulance-dispatch');
      }, 1500);
      
    } catch (error) {
      setIsDispatching(false);
      alert('Dispatch failed. Please try again.');
    }
  };

  const handleProtocolSelect = (protocol) => {
    setSelectedProtocol(protocol);
    if (onProtocolAccess) {
      onProtocolAccess(protocol);
    }
    // Navigate to first aid guidance
    navigate('/first-aid-guidance', { 
      state: { 
        protocol: protocol?.id,
        classification 
      } 
    });
  };

  const handleClarificationQuestion = (question) => {
    if (onClarificationSent) {
      onClarificationSent(question);
    }
    // In a real app, this would send the question via TTS or display it prominently
    alert(`Clarification sent: "${question}"`);
  };

  const getRecommendedProtocols = () => {
    if (!classification) return emergencyProtocols?.slice(0, 2);
    
    return emergencyProtocols?.filter(protocol => 
      protocol?.category === classification?.category || protocol?.category === 'other'
    );
  };

  const getDispatchPriority = () => {
    if (!classification) return 'standard';
    
    switch (classification?.severity) {
      case 'critical':
        return 'emergency';
      case 'moderate':
        return 'urgent';
      default:
        return 'standard';
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Dispatch Action */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-medical">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Emergency Dispatch</h3>
          {dispatchStatus && (
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Dispatched</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Dispatch Status */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Priority Level:</span>
              <span className={`ml-2 font-medium ${
                getDispatchPriority() === 'emergency' ? 'text-error' :
                getDispatchPriority() === 'urgent' ? 'text-warning' : 'text-primary'
              }`}>
                {getDispatchPriority()?.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">ETA:</span>
              <span className="ml-2 font-medium text-foreground">
                {getDispatchPriority() === 'emergency' ? '4-6 min' : 
                 getDispatchPriority() === 'urgent' ? '6-8 min' : '8-12 min'}
              </span>
            </div>
          </div>

          {/* Dispatch Button */}
          <Button
            variant={getDispatchPriority() === 'emergency' ? 'destructive' : 'primary'}
            size="lg"
            fullWidth
            onClick={handleDispatch}
            loading={isDispatching}
            disabled={dispatchStatus === 'dispatched'}
            iconName={dispatchStatus === 'dispatched' ? 'CheckCircle' : 'Truck'}
            iconPosition="left"
            iconSize={20}
            className={getDispatchPriority() === 'emergency' ? 'animate-breathing' : ''}
          >
            {isDispatching ? 'Dispatching...' : 
             dispatchStatus === 'dispatched'? 'Ambulance Dispatched' : 'Dispatch Ambulance'}
          </Button>

          {/* Quick Info Summary */}
          <div className="bg-muted/20 rounded-lg p-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-medium text-foreground">
                  {extractedInfo?.location?.address || 'Not specified'}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Patients:</span>
                <p className="font-medium text-foreground">
                  {extractedInfo?.patientCount?.count || 1}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <p className="font-medium text-foreground">
                  {classification?.category || 'Unclassified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Protocols */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-medical">
        <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Protocols</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {getRecommendedProtocols()?.map((protocol) => (
            <button
              key={protocol?.id}
              onClick={() => handleProtocolSelect(protocol)}
              className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200 text-left"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={protocol?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm">{protocol?.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{protocol?.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
              </div>
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => navigate('/first-aid-guidance')}
          iconName="Book"
          iconPosition="left"
          iconSize={16}
          className="mt-4"
        >
          View All Protocols
        </Button>
      </div>
      {/* Clarification Questions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-medical">
        <h3 className="text-lg font-semibold text-foreground mb-4">Clarification Questions</h3>
        
        <div className="space-y-2">
          {clarificationQuestions?.slice(0, 4)?.map((question, index) => (
            <button
              key={index}
              onClick={() => handleClarificationQuestion(question)}
              className="w-full p-3 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{question}</span>
                <Icon name="Send" size={14} color="var(--color-muted-foreground)" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Mic"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Voice Prompt
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Type"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Text Message
          </Button>
        </div>
      </div>
      {/* Voice Synthesis Controls */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-medical">
        <h3 className="text-lg font-semibold text-foreground mb-4">Voice Instructions</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="success"
              size="sm"
              iconName="Volume2"
              iconPosition="left"
              iconSize={16}
            >
              Start Instructions
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Pause"
              iconPosition="left"
              iconSize={16}
            >
              Pause
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="VolumeX"
              iconPosition="left"
              iconSize={16}
            >
              Mute
            </Button>
          </div>

          <div className="bg-muted/20 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Voice Speed:</span>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="xs" iconName="Minus" iconSize={12} />
                <span className="text-foreground font-medium">Normal</span>
                <Button variant="ghost" size="xs" iconName="Plus" iconSize={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyActions;