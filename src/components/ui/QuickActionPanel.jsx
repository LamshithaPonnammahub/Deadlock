import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from './Button';

const QuickActionPanel = ({ isOpen = false, onToggle }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const getContextualActions = () => {
    const basePath = location?.pathname;
    
    switch (basePath) {
      case '/emergency-call-interface':
        return [
          { 
            id: 'escalate', 
            label: 'Emergency Escalation', 
            icon: 'AlertTriangle', 
            variant: 'destructive',
            urgent: true,
            description: 'Escalate to supervisor'
          },
          { 
            id: 'transfer', 
            label: 'Transfer Call', 
            icon: 'PhoneForwarded', 
            variant: 'outline',
            description: 'Transfer to specialist'
          },
          { 
            id: 'mute', 
            label: 'Mute Call', 
            icon: 'MicOff', 
            variant: 'secondary',
            description: 'Mute microphone'
          },
          { 
            id: 'record', 
            label: 'Start Recording', 
            icon: 'Circle', 
            variant: 'outline',
            description: 'Begin call recording'
          }
        ];
      
      case '/first-aid-guidance':
        return [
          { 
            id: 'emergency-dispatch', 
            label: 'Emergency Dispatch', 
            icon: 'Truck', 
            variant: 'destructive',
            urgent: true,
            description: 'Immediate dispatch'
          },
          { 
            id: 'medical-consult', 
            label: 'Medical Consult', 
            icon: 'Stethoscope', 
            variant: 'primary',
            description: 'Connect with doctor'
          },
          { 
            id: 'protocol-switch', 
            label: 'Switch Protocol', 
            icon: 'RefreshCw', 
            variant: 'outline',
            description: 'Change guidance protocol'
          },
          { 
            id: 'send-instructions', 
            label: 'Send Instructions', 
            icon: 'Send', 
            variant: 'success',
            description: 'Send written guidance'
          }
        ];
      
      case '/ambulance-dispatch':
        return [
          { 
            id: 'priority-dispatch', 
            label: 'Priority Override', 
            icon: 'Zap', 
            variant: 'destructive',
            urgent: true,
            description: 'Override dispatch priority'
          },
          { 
            id: 'additional-units', 
            label: 'Request Backup', 
            icon: 'Plus', 
            variant: 'warning',
            description: 'Request additional units'
          },
          { 
            id: 'update-location', 
            label: 'Update Location', 
            icon: 'MapPin', 
            variant: 'outline',
            description: 'Modify dispatch location'
          },
          { 
            id: 'contact-unit', 
            label: 'Contact Unit', 
            icon: 'Radio', 
            variant: 'primary',
            description: 'Direct communication'
          }
        ];
      
      default:
        return [
          { 
            id: 'emergency', 
            label: 'Emergency Alert', 
            icon: 'AlertTriangle', 
            variant: 'destructive',
            urgent: true,
            description: 'System-wide alert'
          }
        ];
    }
  };

  const contextualActions = getContextualActions();
  const urgentActions = contextualActions?.filter(action => action?.urgent);
  const regularActions = contextualActions?.filter(action => !action?.urgent);

  const handleActionClick = (actionId) => {
    console.log(`Quick action triggered: ${actionId}`);
    // Handle action logic here
  };

  return (
    <>
      {/* Desktop Panel */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-1200">
        {/* Trigger Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName="Zap"
          iconSize={24}
          className="w-16 h-16 rounded-full shadow-glow animate-breathing mb-4"
        >
          Quick Actions
        </Button>
        
        {/* Popup Panel */}
        {isExpanded && (
          <div className="glass-card border border-border/20 rounded-xl shadow-glow p-4 w-80 max-h-96 overflow-y-auto animate-slide-up">
            {/* Panel Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gradient">Quick Actions</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                iconName="X"
                iconSize={16}
                className="hover:shadow-glow"
              />
            </div>

            {/* Urgent Actions - Always Visible */}
            {urgentActions?.length > 0 && (
              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-semibold text-error mb-2">Urgent Actions</h4>
                {urgentActions?.map((action) => (
                  <Button
                    key={action?.id}
                    variant={action?.variant}
                    size="sm"
                    fullWidth
                    onClick={() => {
                      handleActionClick(action?.id);
                      setIsExpanded(false);
                    }}
                    iconName={action?.icon}
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start animate-breathing shadow-glow-error hover:shadow-glow-error text-xs"
                  >
                    <span className="truncate">{action?.label}</span>
                  </Button>
                ))}
              </div>
            )}

            {/* Regular Actions */}
            {regularActions?.length > 0 && (
              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">Regular Actions</h4>
                {regularActions?.map((action) => (
                  <Button
                    key={action?.id}
                    variant={action?.variant}
                    size="sm"
                    fullWidth
                    onClick={() => {
                      handleActionClick(action?.id);
                      setIsExpanded(false);
                    }}
                    iconName={action?.icon}
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start hover:shadow-glow text-xs"
                  >
                    <span className="truncate">{action?.label}</span>
                  </Button>
                ))}
              </div>
            )}

            {/* System Status */}
            <div className="mt-4 pt-3 border-t border-border/20">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-muted/20 px-2 py-1.5 rounded-lg">
                <div className="w-2 h-2 bg-gradient-success rounded-full animate-breathing shadow-glow-success"></div>
                <span className="font-semibold truncate">All systems operational</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-1200">
        <div className="relative">
          {/* Main FAB */}
          <Button
            variant="primary"
            size="lg"
            onClick={onToggle}
            iconName="Zap"
            iconSize={26}
            className="w-16 h-16 rounded-full shadow-glow-error animate-breathing"
          />

          {/* Expanded Actions */}
          {isOpen && (
            <div className="absolute bottom-20 right-0 glass-card border border-border/20 rounded-xl shadow-glow p-4 w-72 animate-slide-up">
              {/* Urgent Actions */}
              {urgentActions?.length > 0 && (
                <div className="space-y-2 mb-3">
                  {urgentActions?.map((action) => (
                    <Button
                      key={action?.id}
                      variant={action?.variant}
                      size="sm"
                      fullWidth
                      onClick={() => {
                        handleActionClick(action?.id);
                        onToggle();
                      }}
                      iconName={action?.icon}
                      iconPosition="left"
                      iconSize={16}
                      className="justify-start"
                    >
                      {action?.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Regular Actions */}
              {regularActions?.length > 0 && (
                <div className="space-y-2">
                  {regularActions?.slice(0, 3)?.map((action) => (
                    <Button
                      key={action?.id}
                      variant={action?.variant}
                      size="sm"
                      fullWidth
                      onClick={() => {
                        handleActionClick(action?.id);
                        onToggle();
                      }}
                      iconName={action?.icon}
                      iconPosition="left"
                      iconSize={16}
                      className="justify-start"
                    >
                      {action?.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Desktop Overlay */}
      {isExpanded && (
        <div 
          className="hidden lg:block fixed inset-0 bg-black/10 z-1150"
          onClick={() => setIsExpanded(false)}
        />
      )}
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-1150"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default QuickActionPanel;