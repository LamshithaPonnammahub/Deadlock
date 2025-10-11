import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyStatusBar from '../../components/ui/EmergencyStatusBar';
import WorkflowProgressIndicator from '../../components/ui/WorkflowProgressIndicator';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import CallContextSidebar from '../../components/ui/CallContextSidebar';
import IncidentDetailsCard from './components/IncidentDetailsCard';
import AmbulanceSelectionTable from './components/AmbulanceSelectionTable';
import RouteOptimizationPanel from './components/RouteOptimizationPanel';
import DispatchActionsPanel from './components/DispatchActionsPanel';
import Icon from '../../components/AppIcon.jsx';
import Button from '../../components/ui/Button';

const AmbulanceDispatch = () => {
  const navigate = useNavigate();
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState('selecting'); // selecting, dispatching, dispatched

  // Mock incident data
  const incidentData = {
    id: 'EMG-2025-0926-001',
    severity: 'HIGH',
    type: 'Cardiac Emergency',
    patientCount: 1,
    symptoms: ['Chest pain', 'Shortness of breath', 'Dizziness'],
    callTime: '14:02:34',
    caller: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567'
    },
    location: {
      address: '1234 Main Street, Downtown Medical District',
      coordinates: '40.7128, -74.0060'
    },
    aiSummary: `Emergency call analysis indicates a high-priority cardiac event. Caller reports 58-year-old male experiencing severe chest pain radiating to left arm, accompanied by shortness of breath and profuse sweating. Patient is conscious but appears distressed. Symptoms began approximately 15 minutes ago during light physical activity. Medical history includes diabetes and hypertension. Immediate ALS response recommended.`
  };

  // Mock ambulance data
  const ambulanceData = [
    {
      id: 'amb-001',
      unitNumber: 'AMB-101',
      type: 'Advanced Life Support',
      status: 'AVAILABLE',
      currentLocation: 'Central Station',
      distance: '2.1 miles',
      eta: 8,
      crew: {
        paramedic: 'Dr. Michael Chen',
        emt: 'Sarah Rodriguez'
      },
      equipment: ['Defibrillator', 'Ventilator', 'Cardiac Monitor', 'IV Supplies'],
      recommended: true
    },
    {
      id: 'amb-002',
      unitNumber: 'AMB-203',
      type: 'Basic Life Support',
      status: 'AVAILABLE',
      currentLocation: 'North District',
      distance: '3.4 miles',
      eta: 12,
      crew: {
        paramedic: 'James Wilson',
        emt: 'Lisa Thompson'
      },
      equipment: ['Basic Airway', 'Oxygen', 'Splints', 'First Aid'],
      recommended: false
    },
    {
      id: 'amb-003',
      unitNumber: 'AMB-305',
      type: 'Advanced Life Support',
      status: 'EN_ROUTE',
      currentLocation: 'Highway 101',
      distance: '1.8 miles',
      eta: 15,
      crew: {
        paramedic: 'Dr. Amanda Foster',
        emt: 'Robert Kim'
      },
      equipment: ['Defibrillator', 'Ventilator', 'Cardiac Monitor', 'Medications'],
      recommended: false
    },
    {
      id: 'amb-004',
      unitNumber: 'AMB-407',
      type: 'Critical Care Transport',
      status: 'AVAILABLE',
      currentLocation: 'University Hospital',
      distance: '4.7 miles',
      eta: 18,
      crew: {
        paramedic: 'Dr. Kevin Martinez',
        emt: 'Jennifer Lee'
      },
      equipment: ['ECMO', 'Ventilator', 'Cardiac Monitor', 'Blood Products'],
      recommended: false
    }
  ];

  const handleAmbulanceSelect = (ambulanceId) => {
    setSelectedAmbulance(ambulanceId);
  };

  const handleDispatchConfirm = async () => {
    setDispatchStatus('dispatching');
    
    // Simulate dispatch process
    setTimeout(() => {
      setDispatchStatus('dispatched');
      // Navigate to monitoring or next workflow step
      setTimeout(() => {
        navigate('/first-aid-guidance');
      }, 2000);
    }, 3000);
  };

  const handleHospitalNotify = async (hospitalId) => {
    console.log(`Notifying hospital: ${hospitalId}`);
    // Handle hospital notification logic
  };

  const handleNavigateToCall = () => {
    navigate('/emergency-call-interface');
  };

  const handleNavigateToGuidance = () => {
    navigate('/first-aid-guidance');
  };

  useEffect(() => {
    // Auto-select recommended ambulance after 3 seconds if none selected
    const timer = setTimeout(() => {
      if (!selectedAmbulance) {
        const recommended = ambulanceData?.find(amb => amb?.recommended);
        if (recommended) {
          setSelectedAmbulance(recommended?.id);
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [selectedAmbulance]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EmergencyStatusBar />
      <WorkflowProgressIndicator />
      
      {/* Main Content Area */}
      <div className={`
        pt-48 pb-6 transition-all duration-300 ease-out
        ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-84'}
        px-4 sm:px-6
      `}>
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-error/10 rounded-lg flex items-center justify-center">
                <Icon name="Truck" size={20} color="var(--color-error)" className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Ambulance Dispatch</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Coordinate emergency response for incident #{incidentData?.id}
                </p>
              </div>
            </div>
            
            {/* Quick Navigation - Mobile/Desktop Responsive */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNavigateToCall}
                iconName="Phone"
                iconSize={16}
                className="w-full sm:w-auto text-sm"
              >
                Back to Call
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleNavigateToGuidance}
                iconName="Heart"
                iconSize={16}
                className="w-full sm:w-auto text-sm"
              >
                Medical Guidance
              </Button>
            </div>
          </div>

          {/* Dispatch Status Alert */}
          {dispatchStatus === 'dispatching' && (
            <div className="mb-6 p-3 sm:p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Loader2" size={18} color="var(--color-warning)" className="animate-spin flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Dispatching ambulance unit...</p>
                  <p className="text-xs text-muted-foreground">Notifying crew and preparing route optimization</p>
                </div>
              </div>
            </div>
          )}

          {dispatchStatus === 'dispatched' && (
            <div className="mb-6 p-3 sm:p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={18} color="var(--color-success)" className="flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Ambulance successfully dispatched!</p>
                  <p className="text-xs text-muted-foreground">Unit is en route to incident location</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Incident & Ambulance Selection */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-2 lg:order-1">
              {/* Incident Details */}
              <IncidentDetailsCard incidentData={incidentData} />
              
              {/* Ambulance Selection */}
              <AmbulanceSelectionTable
                ambulances={ambulanceData}
                selectedAmbulance={selectedAmbulance}
                onAmbulanceSelect={handleAmbulanceSelect}
                onDispatch={handleDispatchConfirm}
              />
            </div>

            {/* Right Column - Route & Actions */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              {/* Route Optimization */}
              <RouteOptimizationPanel
                selectedAmbulance={selectedAmbulance}
                incidentLocation={incidentData?.location}
                ambulanceData={ambulanceData}
              />
              
              {/* Dispatch Actions */}
              <DispatchActionsPanel
                selectedAmbulance={selectedAmbulance}
                ambulanceData={ambulanceData}
                onDispatchConfirm={handleDispatchConfirm}
                onHospitalNotify={handleHospitalNotify}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Components */}
      <CallContextSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <QuickActionPanel
        isOpen={quickActionOpen}
        onToggle={() => setQuickActionOpen(!quickActionOpen)}
      />

      {/* Mobile-First Responsive Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .pt-48 {
            padding-top: 10rem;
          }
        }
        @media (max-width: 1024px) {
          .lg\\:pl-84 {
            padding-left: 0;
          }
          .lg\\:pl-20 {
            padding-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AmbulanceDispatch;