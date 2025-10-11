import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const ProgressTracker = ({ 
  currentStep, 
  totalSteps, 
  completedSteps = [], 
  protocolName,
  estimatedTimeRemaining,
  callerResponsiveness = "Good"
}) => {
  const progressPercentage = (completedSteps?.length / totalSteps) * 100;
  
  const getResponsivenessConfig = (level) => {
    switch (level?.toLowerCase()) {
      case 'excellent':
        return { bg: 'bg-success', text: 'text-success-foreground', icon: 'CheckCircle' };
      case 'good':
        return { bg: 'bg-primary', text: 'text-primary-foreground', icon: 'Circle' };
      case 'fair':
        return { bg: 'bg-warning', text: 'text-warning-foreground', icon: 'AlertCircle' };
      case 'poor':
        return { bg: 'bg-error', text: 'text-error-foreground', icon: 'AlertTriangle' };
      default:
        return { bg: 'bg-muted', text: 'text-muted-foreground', icon: 'Circle' };
    }
  };

  const responsivenessConfig = getResponsivenessConfig(callerResponsiveness);

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={18} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Progress Tracker</h3>
            <p className="text-sm text-muted-foreground">Protocol execution status</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">
            Step {currentStep} of {totalSteps}
          </p>
          <p className="text-xs text-muted-foreground">{protocolName}</p>
        </div>
      </div>
      {/* Progress Overview */}
      <div className="p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm font-semibold text-primary">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Completed Steps */}
          <div className="bg-success/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">Completed</span>
            </div>
            <p className="text-2xl font-bold text-success">{completedSteps?.length}</p>
            <p className="text-xs text-muted-foreground">Steps finished</p>
          </div>

          {/* Current Step */}
          <div className="bg-primary/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Play" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Current</span>
            </div>
            <p className="text-2xl font-bold text-primary">{currentStep}</p>
            <p className="text-xs text-muted-foreground">Active step</p>
          </div>

          {/* Remaining Steps */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm font-medium text-foreground">Remaining</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalSteps - currentStep}</p>
            <p className="text-xs text-muted-foreground">Steps left</p>
          </div>
        </div>

        {/* Caller Responsiveness */}
        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${responsivenessConfig?.bg} ${responsivenessConfig?.text}
              `}>
                <Icon name={responsivenessConfig?.icon} size={16} color="currentColor" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Caller Responsiveness</h4>
                <p className="text-xs text-muted-foreground">Following instructions and responding</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-foreground">{callerResponsiveness}</p>
              <p className="text-xs text-muted-foreground">Status</p>
            </div>
          </div>
        </div>

        {/* Time Estimation */}
        <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Timer" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-foreground">Estimated Time Remaining</span>
          </div>
          <span className="text-lg font-semibold font-mono text-warning">
            {estimatedTimeRemaining || "2-4 min"}
          </span>
        </div>
      </div>
      {/* Step Timeline */}
      <div className="px-4 pb-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Step Timeline</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = completedSteps?.includes(stepNumber);
            const isCurrent = stepNumber === currentStep;
            const isPending = stepNumber > currentStep;

            return (
              <div key={stepNumber} className="flex items-center space-x-3">
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                  ${isCompleted ? 'bg-success text-success-foreground' :
                    isCurrent ? 'bg-primary text-primary-foreground animate-breathing': 'bg-muted text-muted-foreground'}
                `}>
                  {isCompleted ? (
                    <Icon name="Check" size={12} color="currentColor" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="flex-1">
                  <div className={`
                    h-1 rounded-full
                    ${isCompleted ? 'bg-success' : isCurrent ?'bg-primary': 'bg-muted'}
                  `} />
                </div>
                <span className={`
                  text-xs font-medium
                  ${isCompleted ? 'text-success' : isCurrent ?'text-primary': 'text-muted-foreground'}
                `}>
                  {isCompleted ? 'Done' : isCurrent ? 'Active' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;