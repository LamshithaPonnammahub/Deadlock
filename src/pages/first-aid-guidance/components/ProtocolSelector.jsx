import React from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const ProtocolSelector = ({ activeProtocol, onProtocolChange, incidentType }) => {
  const protocols = [
    {
      id: 'cpr',
      name: 'CPR',
      icon: 'Heart',
      description: 'Cardiopulmonary Resuscitation',
      category: 'Cardiac',
      estimatedTime: '2-4 minutes per cycle',
      priority: 'CRITICAL'
    },
    {
      id: 'bleeding-control',
      name: 'Bleeding Control',
      icon: 'Droplets',
      description: 'Severe bleeding management',
      category: 'Trauma',
      estimatedTime: '1-3 minutes',
      priority: 'HIGH'
    },
    {
      id: 'airway-management',
      name: 'Airway Management',
      icon: 'Wind',
      description: 'Choking and breathing assistance',
      category: 'Respiratory',
      estimatedTime: '30 seconds - 2 minutes',
      priority: 'CRITICAL'
    },
    {
      id: 'stroke-response',
      name: 'Stroke Response',
      icon: 'Brain',
      description: 'Stroke recognition and positioning',
      category: 'Neurological',
      estimatedTime: '2-5 minutes',
      priority: 'HIGH'
    },
    {
      id: 'safe-positioning',
      name: 'Safe Positioning',
      icon: 'Move',
      description: 'Recovery position and stabilization',
      category: 'General',
      estimatedTime: '1-2 minutes',
      priority: 'MEDIUM'
    },
    {
      id: 'shock-management',
      name: 'Shock Management',
      icon: 'Zap',
      description: 'Treating shock symptoms',
      category: 'General',
      estimatedTime: '2-3 minutes',
      priority: 'HIGH'
    }
  ];

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return { bg: 'bg-error', text: 'text-error-foreground', pulse: true };
      case 'HIGH':
        return { bg: 'bg-warning', text: 'text-warning-foreground', pulse: false };
      case 'MEDIUM':
        return { bg: 'bg-primary', text: 'text-primary-foreground', pulse: false };
      default:
        return { bg: 'bg-muted', text: 'text-muted-foreground', pulse: false };
    }
  };

  const getRecommendedProtocols = () => {
    const recommended = protocols?.filter(protocol => {
      switch (incidentType?.toLowerCase()) {
        case 'cardiac':
          return ['cpr', 'safe-positioning']?.includes(protocol?.id);
        case 'trauma': case'accident':
          return ['bleeding-control', 'shock-management', 'safe-positioning']?.includes(protocol?.id);
        case 'respiratory':
          return ['airway-management', 'safe-positioning']?.includes(protocol?.id);
        case 'stroke': case'neurological':
          return ['stroke-response', 'safe-positioning']?.includes(protocol?.id);
        default:
          return protocol?.priority === 'CRITICAL';
      }
    });
    return recommended?.length > 0 ? recommended : protocols?.slice(0, 3);
  };

  const recommendedProtocols = getRecommendedProtocols();
  const otherProtocols = protocols?.filter(p => !recommendedProtocols?.includes(p));

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={18} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Protocol Selection</h3>
            <p className="text-sm text-muted-foreground">Choose appropriate first aid guidance</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-breathing"></div>
          <span className="text-xs text-muted-foreground">Protocols Active</span>
        </div>
      </div>
      {/* Recommended Protocols */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Star" size={16} color="var(--color-warning)" />
          <h4 className="text-sm font-semibold text-foreground">Recommended for {incidentType || 'Current Incident'}</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {recommendedProtocols?.map((protocol) => {
            const priorityConfig = getPriorityConfig(protocol?.priority);
            const isActive = activeProtocol === protocol?.id;
            
            return (
              <button
                key={protocol?.id}
                onClick={() => onProtocolChange(protocol?.id)}
                className={`
                  relative p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${isActive 
                    ? 'border-primary bg-primary/10 shadow-medical' 
                    : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                  }
                  ${priorityConfig?.pulse ? 'animate-breathing' : ''}
                `}
              >
                {/* Priority Badge */}
                <div className={`
                  absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium
                  ${priorityConfig?.bg} ${priorityConfig?.text}
                `}>
                  {protocol?.priority}
                </div>
                {/* Protocol Icon */}
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}>
                    <Icon 
                      name={protocol?.icon} 
                      size={20} 
                      color="currentColor" 
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground text-sm">{protocol?.name}</h5>
                    <p className="text-xs text-muted-foreground">{protocol?.category}</p>
                  </div>
                </div>
                {/* Protocol Details */}
                <p className="text-sm text-foreground mb-2">{protocol?.description}</p>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">{protocol?.estimatedTime}</span>
                </div>
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute inset-0 rounded-lg border-2 border-primary animate-pulse-emergency pointer-events-none"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Other Protocols */}
        {otherProtocols?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Other Available Protocols</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {otherProtocols?.map((protocol) => {
                const isActive = activeProtocol === protocol?.id;
                
                return (
                  <Button
                    key={protocol?.id}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onProtocolChange(protocol?.id)}
                    iconName={protocol?.icon}
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    {protocol?.name}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">
              Protocol auto-selected based on incident type
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
            onClick={() => onProtocolChange(recommendedProtocols?.[0]?.id)}
          >
            Reset to Recommended
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProtocolSelector;