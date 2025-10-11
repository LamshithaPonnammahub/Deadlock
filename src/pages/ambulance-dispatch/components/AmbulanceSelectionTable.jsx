import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const AmbulanceSelectionTable = ({ ambulances, selectedAmbulance, onAmbulanceSelect, onDispatch }) => {
  const [contactingCrew, setContactingCrew] = useState(null);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return { bg: 'bg-success', text: 'text-success-foreground', icon: 'CheckCircle' };
      case 'EN_ROUTE':
        return { bg: 'bg-primary', text: 'text-primary-foreground', icon: 'Navigation' };
      case 'BUSY':
        return { bg: 'bg-warning', text: 'text-warning-foreground', icon: 'Clock' };
      case 'MAINTENANCE':
        return { bg: 'bg-muted', text: 'text-muted-foreground', icon: 'Wrench' };
      default:
        return { bg: 'bg-muted', text: 'text-muted-foreground', icon: 'Circle' };
    }
  };

  const handleContactCrew = (ambulanceId) => {
    setContactingCrew(ambulanceId);
    setTimeout(() => setContactingCrew(null), 2000);
  };

  const formatETA = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b border-border space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Truck" size={14} color="var(--color-primary)" className="sm:w-[18px] sm:h-[18px]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Available Ambulances</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Select unit for dispatch</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-breathing"></div>
          <span>Real-time updates</span>
        </div>
      </div>

      {/* Desktop Table View - Hidden on Mobile/Tablet */}
      <div className="hidden xl:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Select</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Unit</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ETA</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Crew</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Equipment</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ambulances?.map((ambulance) => {
              const statusConfig = getStatusConfig(ambulance?.status);
              const isSelected = selectedAmbulance === ambulance?.id;
              const isRecommended = ambulance?.recommended;
              
              return (
                <tr 
                  key={ambulance?.id}
                  className={`
                    border-b border-border hover:bg-muted/20 transition-colors duration-150
                    ${isSelected ? 'bg-primary/5 border-primary/20' : ''}
                    ${isRecommended ? 'bg-success/5' : ''}
                  `}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="ambulance"
                        value={ambulance?.id}
                        checked={isSelected}
                        onChange={() => onAmbulanceSelect(ambulance?.id)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                        disabled={ambulance?.status !== 'AVAILABLE'}
                      />
                      {isRecommended && (
                        <div className="flex items-center space-x-1 text-xs text-success">
                          <Icon name="Star" size={12} color="var(--color-success)" />
                          <span className="hidden lg:inline">Recommended</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{ambulance?.unitNumber}</span>
                      <span className="text-xs text-muted-foreground">{ambulance?.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`
                      inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                      ${statusConfig?.bg} ${statusConfig?.text}
                    `}>
                      <Icon name={statusConfig?.icon} size={12} color="currentColor" />
                      <span>{ambulance?.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground">{ambulance?.currentLocation}</span>
                      <span className="text-xs text-muted-foreground">{ambulance?.distance} away</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {formatETA(ambulance?.eta)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground">{ambulance?.crew?.paramedic}</span>
                      <span className="text-xs text-muted-foreground">{ambulance?.crew?.emt}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {ambulance?.equipment?.map((item, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactCrew(ambulance?.id)}
                      iconName={contactingCrew === ambulance?.id ? "Loader2" : "Phone"}
                      iconSize={14}
                      loading={contactingCrew === ambulance?.id}
                      disabled={ambulance?.status !== 'AVAILABLE'}
                    >
                      Contact
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View - Responsive Layout */}
      <div className="xl:hidden p-3 sm:p-4 space-y-3 sm:space-y-4">
        {ambulances?.map((ambulance) => {
          const statusConfig = getStatusConfig(ambulance?.status);
          const isSelected = selectedAmbulance === ambulance?.id;
          const isRecommended = ambulance?.recommended;
          
          return (
            <div 
              key={ambulance?.id}
              className={`
                border border-border rounded-lg p-3 sm:p-4 transition-all duration-150
                ${isSelected ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/30'}
                ${isRecommended ? 'bg-success/5 border-success/30' : ''}
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <input
                    type="radio"
                    name="ambulance"
                    value={ambulance?.id}
                    checked={isSelected}
                    onChange={() => onAmbulanceSelect(ambulance?.id)}
                    className="w-4 h-4 text-primary focus:ring-primary flex-shrink-0"
                    disabled={ambulance?.status !== 'AVAILABLE'}
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-medium text-foreground truncate">{ambulance?.unitNumber}</h4>
                    <p className="text-xs text-muted-foreground truncate">{ambulance?.type}</p>
                  </div>
                </div>
                <div className={`
                  inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0
                  ${statusConfig?.bg} ${statusConfig?.text}
                `}>
                  <Icon name={statusConfig?.icon} size={10} color="currentColor" />
                  <span className="hidden sm:inline">{ambulance?.status}</span>
                </div>
              </div>

              {/* Details Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <p className="text-foreground font-medium truncate">{ambulance?.currentLocation}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">ETA:</span>
                  <p className="text-foreground font-medium">{formatETA(ambulance?.eta)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Crew:</span>
                  <p className="text-foreground truncate">{ambulance?.crew?.paramedic}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Distance:</span>
                  <p className="text-foreground">{ambulance?.distance}</p>
                </div>
              </div>

              {/* Equipment - Responsive Tags */}
              <div className="mb-3">
                <span className="text-xs sm:text-sm text-muted-foreground">Equipment:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ambulance?.equipment?.slice(0, 3)?.map((item, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                    >
                      {item}
                    </span>
                  ))}
                  {ambulance?.equipment?.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      +{ambulance?.equipment?.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions - Responsive Button Layout */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                {isRecommended && (
                  <div className="flex items-center space-x-1 text-xs text-success order-2 sm:order-1">
                    <Icon name="Star" size={12} color="var(--color-success)" />
                    <span>AI Recommended</span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContactCrew(ambulance?.id)}
                  iconName={contactingCrew === ambulance?.id ? "Loader2" : "Phone"}
                  iconSize={14}
                  loading={contactingCrew === ambulance?.id}
                  disabled={ambulance?.status !== 'AVAILABLE'}
                  className={`w-full sm:w-auto text-xs sm:text-sm ${isRecommended ? 'order-1 sm:order-2 sm:ml-auto' : ''}`}
                >
                  Contact Crew
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dispatch Actions - Responsive Footer */}
      {selectedAmbulance && (
        <div className="p-4 sm:p-6 border-t border-border bg-muted/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={18} color="var(--color-success)" className="flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Unit {ambulances?.find(a => a?.id === selectedAmbulance)?.unitNumber} selected
                </p>
                <p className="text-xs text-muted-foreground">Ready for dispatch</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAmbulanceSelect(null)}
                iconName="X"
                iconSize={14}
                className="w-full sm:w-auto text-sm"
              >
                Clear Selection
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onDispatch}
                iconName="Truck"
                iconSize={14}
                className="w-full sm:w-auto text-sm animate-breathing"
              >
                Dispatch Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmbulanceSelectionTable;