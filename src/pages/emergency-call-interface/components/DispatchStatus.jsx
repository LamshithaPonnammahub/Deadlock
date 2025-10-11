import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const DispatchStatus = ({ isActive = false, dispatchData = null }) => {
  const [currentStatus, setCurrentStatus] = useState('standby');
  const [estimatedArrival, setEstimatedArrival] = useState(null);
  const [ambulanceUnits, setAmbulanceUnits] = useState([]);

  const statusConfig = {
    standby: {
      label: 'Standby',
      color: 'muted',
      icon: 'Clock',
      description: 'Ready for dispatch'
    },
    dispatching: {
      label: 'Dispatching',
      color: 'warning',
      icon: 'Radio',
      description: 'Contacting units'
    },
    dispatched: {
      label: 'Dispatched',
      color: 'primary',
      icon: 'Truck',
      description: 'Unit en route'
    },
    arrived: {
      label: 'On Scene',
      color: 'success',
      icon: 'MapPin',
      description: 'Unit arrived'
    }
  };

  useEffect(() => {
    if (dispatchData && isActive) {
      setCurrentStatus('dispatched');
      setEstimatedArrival(new Date(Date.now() + 6 * 60 * 1000)); // 6 minutes from now
      
      // Mock ambulance units
      setAmbulanceUnits([
        {
          id: 'AMB-001',
          callSign: 'Rescue 1',
          crew: ['EMT Johnson', 'Paramedic Smith'],
          location: '2.3 miles away',
          eta: '6 min',
          status: 'en_route'
        }
      ]);
    }
  }, [dispatchData, isActive]);

  const getStatusClasses = (status) => {
    const config = statusConfig?.[status];
    switch (config?.color) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'primary':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatETA = (date) => {
    if (!date) return 'Calculating...';
    const now = new Date();
    const diff = Math.max(0, Math.floor((date - now) / 1000 / 60));
    return `${diff} min`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-medical">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Dispatch Status</h3>
        <div className={`
          flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium
          ${getStatusClasses(currentStatus)}
          ${currentStatus === 'dispatching' ? 'animate-pulse' : ''}
        `}>
          <Icon 
            name={statusConfig?.[currentStatus]?.icon} 
            size={14} 
            color="currentColor" 
          />
          <span>{statusConfig?.[currentStatus]?.label}</span>
        </div>
      </div>
      {/* Status Timeline */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {Object.entries(statusConfig)?.map(([key, config], index) => {
            const isCompleted = Object.keys(statusConfig)?.indexOf(currentStatus) >= index;
            const isActive = currentStatus === key;
            
            return (
              <div key={key} className="flex flex-col items-center flex-1">
                <div className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${isCompleted 
                    ? isActive 
                      ? 'bg-primary border-primary text-primary-foreground animate-breathing' 
                      : 'bg-success border-success text-success-foreground' :'bg-muted border-muted text-muted-foreground'
                  }
                `}>
                  <Icon 
                    name={isCompleted && !isActive ? 'Check' : config?.icon} 
                    size={16} 
                    color="currentColor" 
                  />
                </div>
                <span className={`
                  text-xs mt-1 text-center
                  ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}
                `}>
                  {config?.label}
                </span>
                {index < Object.keys(statusConfig)?.length - 1 && (
                  <div className={`
                    absolute w-full h-0.5 top-4 left-1/2 transform -translate-y-1/2 -z-10
                    ${isCompleted ? 'bg-success' : 'bg-border'}
                  `} style={{ width: '25%', marginLeft: '12.5%' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Current Status Details */}
      <div className="bg-muted/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Current Status:</span>
          <span className="text-sm font-medium text-foreground">
            {statusConfig?.[currentStatus]?.description}
          </span>
        </div>
        
        {estimatedArrival && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Estimated Arrival:</span>
            <span className="text-sm font-medium text-foreground">
              {formatETA(estimatedArrival)}
            </span>
          </div>
        )}
      </div>
      {/* Ambulance Units */}
      {ambulanceUnits?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Responding Units</h4>
          
          {ambulanceUnits?.map((unit) => (
            <div key={unit?.id} className="border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Truck" size={16} color="var(--color-primary)" />
                  <span className="font-medium text-foreground">{unit?.callSign}</span>
                  <span className="text-xs text-muted-foreground">({unit?.id})</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-success">
                  <Icon name="Navigation" size={12} />
                  <span>ETA: {unit?.eta}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span>Crew: {unit?.crew?.join(', ')}</span>
                </div>
                <div>
                  <span>Distance: {unit?.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Action Buttons */}
      <div className="mt-4 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Phone"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
          disabled={currentStatus === 'standby'}
        >
          Contact Unit
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MapPin"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
          disabled={currentStatus === 'standby'}
        >
          Track Location
        </Button>
      </div>
      {/* Emergency Override */}
      {currentStatus !== 'standby' && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="destructive"
            size="sm"
            fullWidth
            iconName="AlertTriangle"
            iconPosition="left"
            iconSize={16}
          >
            Emergency Override
          </Button>
        </div>
      )}
    </div>
  );
};

export default DispatchStatus;