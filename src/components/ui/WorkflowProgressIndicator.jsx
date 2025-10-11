import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon.jsx';

const WorkflowProgressIndicator = () => {
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const workflowSteps = [
    {
      id: 'call',
      label: 'Active Call',
      path: '/emergency-call-interface',
      icon: 'Phone',
      description: 'Initial call processing'
    },
    {
      id: 'guidance',
      label: 'Medical Guidance',
      path: '/first-aid-guidance',
      icon: 'Heart',
      description: 'Life-saving instructions'
    },
    {
      id: 'dispatch',
      label: 'Dispatch',
      path: '/ambulance-dispatch',
      icon: 'Truck',
      description: 'Response coordination'
    }
  ];

  const getCurrentStepIndex = () => {
    const currentStep = workflowSteps?.findIndex(step => step?.path === location?.pathname);
    return currentStep !== -1 ? currentStep : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'active';
    return 'pending';
  };

  const getStepConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-success',
          text: 'text-success-foreground',
          border: 'border-success',
          icon: 'CheckCircle'
        };
      case 'active':
        return {
          bg: 'bg-primary',
          text: 'text-primary-foreground',
          border: 'border-primary',
          icon: null
        };
      case 'pending':
        return {
          bg: 'bg-muted',
          text: 'text-muted-foreground',
          border: 'border-muted',
          icon: null
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-muted-foreground',
          border: 'border-muted',
          icon: null
        };
    }
  };

  return (
    <div className="fixed top-32 left-0 right-0 z-1000 glass-card border-b border-border/20 shadow-glow">
      <div className="px-6 py-5">
        {/* Desktop Progress Indicator */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {workflowSteps?.map((step, index) => {
            const status = getStepStatus(index);
            const config = getStepConfig(status);
            const isActive = status === 'active';
            const isCompleted = status === 'completed';

            return (
              <div key={step?.id} className="flex items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center space-y-3">
                  <div className={`
                    relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-medical
                    ${isCompleted ? 'bg-gradient-success text-success-foreground border-success shadow-glow-success' : 
                      isActive ? 'bg-gradient-primary text-primary-foreground border-primary shadow-glow animate-breathing' : 
                      'bg-muted text-muted-foreground border-muted'}
                  `}>
                    {isCompleted ? (
                      <Icon name="CheckCircle" size={22} color="currentColor" />
                    ) : (
                      <Icon name={step?.icon} size={20} color="currentColor" />
                    )}
                    
                    {isActive && (
                      <div className="absolute -inset-1 rounded-full border-2 border-primary/40 animate-pulse-emergency"></div>
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="flex flex-col items-center">
                    <span className={`
                      text-sm font-bold transition-colors duration-300
                      ${isActive ? 'text-gradient' : isCompleted ? 'text-success' : 'text-muted-foreground'}
                    `}>
                      {step?.label}
                    </span>
                    <span className="text-xs text-muted-foreground text-center max-w-28 font-medium">
                      {step?.description}
                    </span>
                  </div>
                </div>
                {/* Connector Line */}
                {index < workflowSteps?.length - 1 && (
                  <div className={`
                    w-20 h-1 mx-6 transition-all duration-300 rounded-full
                    ${index < currentStepIndex ? 'bg-gradient-success shadow-glow-success' : 'bg-border/50'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Trigger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center justify-between w-full p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 shadow-medical hover:shadow-glow"
          >
            {/* Current Step Info */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground shadow-glow animate-breathing">
                <Icon 
                  name={workflowSteps?.[currentStepIndex]?.icon} 
                  size={18} 
                  color="currentColor" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gradient">
                  {workflowSteps?.[currentStepIndex]?.label}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  Step {currentStepIndex + 1} of {workflowSteps?.length}
                </span>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center space-x-2">
              {workflowSteps?.map((_, index) => {
                const status = getStepStatus(index);
                
                return (
                  <div
                    key={index}
                    className={`
                      w-3 h-3 rounded-full transition-all duration-300 shadow-medical
                      ${status === 'completed' ? 'bg-gradient-success shadow-glow-success' : 
                        status === 'active' ? 'bg-gradient-primary shadow-glow animate-breathing' : 
                        'bg-muted'}
                    `}
                  />
                );
              })}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Progress Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          />
          
          {/* Popup Content */}
          <div className="relative w-full max-w-sm glass-card border border-border/20 shadow-glow rounded-2xl p-6 animate-in slide-in-from-bottom-4 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={16} color="currentColor" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gradient mb-2">Workflow Progress</h3>
              <p className="text-sm text-muted-foreground">
                Track your emergency response progress
              </p>
            </div>

            {/* Current Step Info */}
            <div className="flex items-center space-x-4 mb-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground shadow-glow animate-breathing">
                <Icon 
                  name={workflowSteps?.[currentStepIndex]?.icon} 
                  size={20} 
                  color="currentColor" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-gradient">
                  {workflowSteps?.[currentStepIndex]?.label}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  {workflowSteps?.[currentStepIndex]?.description}
                </span>
                <span className="text-xs text-muted-foreground">
                  Step {currentStepIndex + 1} of {workflowSteps?.length}
                </span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4 mb-6">
              {workflowSteps?.map((step, index) => {
                const status = getStepStatus(index);
                const isActive = status === 'active';
                const isCompleted = status === 'completed';
                
                return (
                  <div key={step?.id} className="flex items-center space-x-3">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-medical
                      ${isCompleted ? 'bg-gradient-success text-success-foreground border-success shadow-glow-success' : 
                        isActive ? 'bg-gradient-primary text-primary-foreground border-primary shadow-glow animate-breathing' : 
                        'bg-muted text-muted-foreground border-muted'}
                    `}>
                      {isCompleted ? (
                        <Icon name="CheckCircle" size={16} color="currentColor" />
                      ) : (
                        <Icon name={step?.icon} size={14} color="currentColor" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className={`
                        text-sm font-medium transition-colors duration-300
                        ${isActive ? 'text-gradient' : isCompleted ? 'text-success' : 'text-muted-foreground'}
                      `}>
                        {step?.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {step?.description}
                      </span>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-emergency" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted/50 rounded-full h-3 shadow-medical">
              <div 
                className="bg-gradient-primary h-3 rounded-full transition-all duration-500 ease-out shadow-glow"
                style={{ 
                  width: `${((currentStepIndex + 1) / workflowSteps?.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowProgressIndicator;