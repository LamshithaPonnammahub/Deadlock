import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const IncidentDetailsCard = ({ incidentData }) => {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return { bg: 'bg-error', text: 'text-error-foreground', icon: 'AlertTriangle' };
      case 'HIGH':
        return { bg: 'bg-warning', text: 'text-warning-foreground', icon: 'AlertCircle' };
      case 'MEDIUM':
        return { bg: 'bg-primary', text: 'text-primary-foreground', icon: 'Info' };
      default:
        return { bg: 'bg-muted', text: 'text-muted-foreground', icon: 'Circle' };
    }
  };

  const severityConfig = getSeverityConfig(incidentData?.severity);

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-error/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Truck" size={16} color="var(--color-error)" className="sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Emergency Dispatch</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Incident #{incidentData?.id}</p>
          </div>
        </div>
        <div className={`
          flex items-center space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium
          ${severityConfig?.bg} ${severityConfig?.text} self-start sm:self-center
        `}>
          <Icon name={severityConfig?.icon} size={12} color="currentColor" className="sm:w-3.5 sm:h-3.5" />
          <span>{incidentData?.severity}</span>
        </div>
      </div>

      {/* Incident Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Caller Information */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-md font-semibold text-foreground flex items-center space-x-2">
            <Icon name="User" size={16} color="var(--color-primary)" className="flex-shrink-0" />
            <span>Caller Information</span>
          </h3>
          
          <div className="bg-muted/30 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm text-muted-foreground">Name:</span>
              <span className="text-xs sm:text-sm font-medium text-foreground break-words">{incidentData?.caller?.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm text-muted-foreground">Phone:</span>
              <span className="text-xs sm:text-sm font-mono text-foreground">{incidentData?.caller?.phone}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm text-muted-foreground">Location:</span>
              <span className="text-xs sm:text-sm text-foreground sm:text-right sm:max-w-48 break-words">{incidentData?.location?.address}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm text-muted-foreground">Coordinates:</span>
              <span className="text-xs sm:text-sm font-mono text-foreground break-all">{incidentData?.location?.coordinates}</span>
            </div>
          </div>
        </div>

        {/* Incident Classification */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-md font-semibold text-foreground flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-warning)" className="flex-shrink-0" />
            <span>Incident Details</span>
          </h3>
          
          <div className="bg-muted/30 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm text-muted-foreground">Type:</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">{incidentData?.type}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm text-muted-foreground">Patient Count:</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">{incidentData?.patientCount}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm text-muted-foreground">Symptoms:</span>
              <div className="sm:text-right sm:max-w-48">
                {incidentData?.symptoms?.map((symptom, index) => (
                  <div key={index} className="text-xs sm:text-sm text-foreground">{symptom}</div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm text-muted-foreground">Call Time:</span>
              <span className="text-xs sm:text-sm font-mono text-foreground">{incidentData?.callTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Analysis Summary */}
      <div className="mt-4 sm:mt-6">
        <h3 className="text-sm sm:text-md font-semibold text-foreground flex items-center space-x-2 mb-2 sm:mb-3">
          <Icon name="Mic" size={16} color="var(--color-success)" className="flex-shrink-0" />
          <span>AI Voice Analysis Summary</span>
        </h3>
        <div className="bg-success/5 border border-success/20 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-foreground leading-relaxed">{incidentData?.aiSummary}</p>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailsCard;