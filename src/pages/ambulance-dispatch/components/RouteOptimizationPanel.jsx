import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const RouteOptimizationPanel = ({ selectedAmbulance, incidentLocation, ambulanceData }) => {
  const [mapView, setMapView] = useState('route');
  const [trafficLayer, setTrafficLayer] = useState(true);

  const routeData = {
    distance: '4.2 miles',
    estimatedTime: '8 minutes',
    trafficDelay: '2 minutes',
    alternativeRoutes: 2,
    hazards: ['Construction on Main St', 'Heavy traffic on Highway 101']
  };

  const mapViews = [
    { id: 'route', label: 'Route', icon: 'Navigation' },
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'traffic', label: 'Traffic', icon: 'AlertTriangle' }
  ];

  if (!selectedAmbulance) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-medical p-6 sm:p-8">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={24} color="var(--color-muted-foreground)" className="sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Select Ambulance for Route</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Choose an ambulance unit to view optimized route and navigation details
          </p>
        </div>
      </div>
    );
  }

  const ambulance = ambulanceData?.find(a => a?.id === selectedAmbulance);

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b border-border space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Navigation" size={14} color="var(--color-primary)" className="sm:w-[18px] sm:h-[18px]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Route Optimization</h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              Unit {ambulance?.unitNumber} to incident location
            </p>
          </div>
        </div>
        
        {/* Map View Controls - Responsive */}
        <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
          {mapViews?.map((view) => (
            <button
              key={view?.id}
              onClick={() => setMapView(view?.id)}
              className={`
                flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs font-medium transition-all duration-150
                ${mapView === view?.id 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={view?.icon} size={12} color="currentColor" className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{view?.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Route Summary - Responsive Grid */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="MapPin" size={14} color="var(--color-success)" className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="text-sm font-semibold text-foreground truncate">{routeData?.distance}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={14} color="var(--color-primary)" className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">ETA</p>
              <p className="text-sm font-semibold text-foreground truncate">{routeData?.estimatedTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Traffic Delay</p>
              <p className="text-sm font-semibold text-foreground truncate">{routeData?.trafficDelay}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-muted/50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Route" size={14} color="var(--color-muted-foreground)" className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Alt Routes</p>
              <p className="text-sm font-semibold text-foreground">{routeData?.alternativeRoutes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container - Responsive Heights */}
      <div className="relative">
        <div className="h-48 sm:h-64 lg:h-80 bg-muted/20 rounded-b-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Emergency Route Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${incidentLocation?.coordinates}&z=14&output=embed`}
            className="border-0"
          />
        </div>

        {/* Map Overlay Controls - Responsive Positioning */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-2">
          <Button
            variant={trafficLayer ? "primary" : "outline"}
            size="sm"
            onClick={() => setTrafficLayer(!trafficLayer)}
            iconName="AlertTriangle"
            iconSize={12}
            className="bg-card/90 backdrop-blur-sm text-xs"
          >
            <span className="hidden sm:inline">Traffic</span>
          </Button>
        </div>

        {/* Route Info Overlay - Responsive */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h4 className="text-xs sm:text-sm font-semibold text-foreground">Optimal Route</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-breathing"></div>
                <span className="text-xs text-muted-foreground hidden sm:inline">Live updates</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">From:</span>
                <span className="text-foreground font-medium truncate ml-2">{ambulance?.currentLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">To:</span>
                <span className="text-foreground font-medium truncate ml-2">Incident Location</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Hazards & Alerts - Responsive */}
      {routeData?.hazards?.length > 0 && (
        <div className="p-4 sm:p-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2 sm:mb-3 flex items-center space-x-2">
            <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="flex-shrink-0" />
            <span>Route Alerts</span>
          </h4>
          <div className="space-y-2">
            {routeData?.hazards?.map((hazard, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 sm:p-3 bg-warning/5 border border-warning/20 rounded-lg">
                <Icon name="AlertCircle" size={14} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-foreground leading-tight">{hazard}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons - Responsive Layout */}
      <div className="p-4 sm:p-6 border-t border-border bg-muted/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconSize={14}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Refresh Route
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Route"
              iconSize={14}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Alternative Routes
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="secondary"
              size="sm"
              iconName="Navigation"
              iconSize={14}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Send to GPS
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconName="Phone"
              iconSize={14}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Contact Unit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizationPanel;