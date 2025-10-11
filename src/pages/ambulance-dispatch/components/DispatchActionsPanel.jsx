import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const DispatchActionsPanel = ({ selectedAmbulance, ambulanceData, onDispatchConfirm, onHospitalNotify }) => {
  const [notifyingHospital, setNotifyingHospital] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const hospitalData = [
    {
      id: 'hospital-1',
      name: 'General Hospital',
      distance: '3.2 miles',
      capacity: 'High',
      specialties: ['Emergency', 'Cardiology', 'Trauma'],
      eta: '12 min'
    },
    {
      id: 'hospital-2',
      name: 'Medical Center',
      distance: '5.1 miles',
      capacity: 'Medium',
      specialties: ['Emergency', 'Internal Medicine'],
      eta: '18 min'
    }
  ];

  const handleHospitalNotify = async (hospitalId) => {
    setNotifyingHospital(hospitalId);
    await onHospitalNotify(hospitalId);
    setTimeout(() => setNotifyingHospital(null), 2000);
  };

  const selectedAmbulanceData = ambulanceData?.find(a => a?.id === selectedAmbulance);

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={14} color="var(--color-warning)" className="sm:w-[18px] sm:h-[18px]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Dispatch Actions</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {selectedAmbulance ? 'Ready to dispatch' : 'Select ambulance first'}
            </p>
          </div>
        </div>
      </div>

      {selectedAmbulance ? (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Selected Unit Summary - Responsive */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4">
            <h4 className="text-sm sm:text-md font-semibold text-foreground mb-2 sm:mb-3">Selected Unit</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-muted-foreground">Unit:</span>
                <p className="text-foreground font-medium">{selectedAmbulanceData?.unitNumber}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <p className="text-foreground font-medium">{selectedAmbulanceData?.type}</p>
              </div>
              <div>
                <span className="text-muted-foreground">ETA:</span>
                <p className="text-foreground font-medium">{selectedAmbulanceData?.eta} min</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="text-foreground font-medium">{selectedAmbulanceData?.status}</p>
              </div>
            </div>
          </div>

          {/* Hospital Notifications - Responsive Collapsible */}
          <div className="border border-border rounded-lg">
            <button 
              onClick={() => setExpandedSection(expandedSection === 'hospitals' ? null : 'hospitals')}
              className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-muted/10 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Building" size={16} color="var(--color-primary)" className="flex-shrink-0" />
                <div className="text-left">
                  <h4 className="text-sm sm:text-md font-semibold text-foreground">Hospital Notifications</h4>
                  <p className="text-xs text-muted-foreground">Alert receiving hospitals</p>
                </div>
              </div>
              <Icon 
                name={expandedSection === 'hospitals' ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                color="var(--color-muted-foreground)" 
              />
            </button>
            
            {expandedSection === 'hospitals' && (
              <div className="border-t border-border p-3 sm:p-4">
                <div className="space-y-2 sm:space-y-3">
                  {hospitalData?.map((hospital) => (
                    <div key={hospital?.id} className="bg-muted/20 rounded-lg p-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="min-w-0">
                          <h5 className="text-sm font-medium text-foreground">{hospital?.name}</h5>
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                            <span>{hospital?.distance}</span>
                            <span>•</span>
                            <span>{hospital?.eta} ETA</span>
                            <span>•</span>
                            <span>{hospital?.capacity} Capacity</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleHospitalNotify(hospital?.id)}
                          loading={notifyingHospital === hospital?.id}
                          iconName={notifyingHospital === hospital?.id ? "Loader2" : "Bell"}
                          iconSize={12}
                          className="w-full sm:w-auto text-xs"
                        >
                          Notify
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Emergency Contacts - Responsive Collapsible */}
          <div className="border border-border rounded-lg">
            <button 
              onClick={() => setExpandedSection(expandedSection === 'contacts' ? null : 'contacts')}
              className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-muted/10 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} color="var(--color-success)" className="flex-shrink-0" />
                <div className="text-left">
                  <h4 className="text-sm sm:text-md font-semibold text-foreground">Emergency Contacts</h4>
                  <p className="text-xs text-muted-foreground">Quick contact options</p>
                </div>
              </div>
              <Icon 
                name={expandedSection === 'contacts' ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                color="var(--color-muted-foreground)" 
              />
            </button>
            
            {expandedSection === 'contacts' && (
              <div className="border-t border-border p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Phone"
                    iconSize={14}
                    className="w-full text-xs sm:text-sm"
                  >
                    Contact Unit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Radio"
                    iconSize={14}
                    className="w-full text-xs sm:text-sm"
                  >
                    Radio Dispatch
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageSquare"
                    iconSize={14}
                    className="w-full text-xs sm:text-sm"
                  >
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="AlertTriangle"
                    iconSize={14}
                    className="w-full text-xs sm:text-sm"
                  >
                    Priority Alert
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Primary Dispatch Action - Responsive */}
          <div className="bg-error/5 border border-error/20 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={18} color="var(--color-error)" className="flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-md font-semibold text-foreground">Final Dispatch Confirmation</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Confirm to dispatch {selectedAmbulanceData?.unitNumber} to emergency scene
                  </p>
                </div>
              </div>
              
              <Button
                variant="destructive"
                size="lg"
                onClick={onDispatchConfirm}
                iconName="Truck"
                iconSize={20}
                className="w-full animate-breathing text-sm sm:text-base font-semibold"
              >
                DISPATCH UNIT NOW
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  This action will immediately notify the ambulance crew and dispatch center
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* No Selection State - Responsive */
        <div className="p-6 sm:p-8">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Icon name="Truck" size={20} color="var(--color-muted-foreground)" className="sm:w-8 sm:h-8" />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">Select Ambulance Unit</h4>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
              Choose an available ambulance from the list above to proceed with dispatch actions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispatchActionsPanel;