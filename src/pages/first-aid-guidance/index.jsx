import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyStatusBar from '../../components/ui/EmergencyStatusBar';
import WorkflowProgressIndicator from '../../components/ui/WorkflowProgressIndicator';
import CallContextSidebar from '../../components/ui/CallContextSidebar';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import ProtocolSelector from './components/ProtocolSelector';
import InstructionCard from './components/InstructionCard';
import CallMonitorPanel from './components/CallMonitorPanel';
import ProgressTracker from './components/ProgressTracker';
import VoiceControlPanel from './components/VoiceControlPanel';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon.jsx';

const FirstAidGuidance = () => {
  const navigate = useNavigate();
  const [activeProtocol, setActiveProtocol] = useState('cpr');
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [callerConfirmed, setCallerConfirmed] = useState(false);

  // Mock incident data
  const incidentData = {
    type: 'Cardiac',
    severity: 'HIGH',
    callerName: 'Sarah Johnson',
    patientName: 'Michael Johnson',
    location: '1234 Main Street, Downtown'
  };

  // Mock protocol steps data
  const protocolSteps = {
    cpr: [
      {
        number: 1,
        title: 'Check Responsiveness',
        instruction: 'Tap the person\'s shoulders firmly and shout "Are you okay?" Look for any response or movement.',
        details: [
          'Tap both shoulders with the palms of your hands',
          'Shout loudly and clearly',
          'Look for eye opening, verbal response, or movement',
          'If no response, proceed to next step immediately'
        ],
        visualCues: [
          'No eye opening',
          'No verbal response',
          'No purposeful movement'
        ],
        warnings: [
          'Do not shake if spinal injury is suspected',
          'Be firm but not aggressive with tapping'
        ],
        icon: 'User',
        estimatedDuration: 15,
        priority: 'CRITICAL'
      },
      {
        number: 2,
        title: 'Call for Help',
        instruction: 'If the person is unresponsive, immediately call 911 or have someone else do it. Request an AED if available.',
        details: [
          'Call 911 immediately if not already done',
          'Ask someone to find an AED (Automated External Defibrillator)',
          'Stay on the line with emergency services',
          'Provide clear location information'
        ],
        visualCues: [
          'Person remains unresponsive',
          'No normal breathing'
        ],
        warnings: [
          'Do not leave the person alone unless absolutely necessary',
          'Ensure someone is calling for help while you continue'
        ],
        icon: 'Phone',
        estimatedDuration: 30,
        priority: 'CRITICAL'
      },
      {
        number: 3,
        title: 'Position the Person',
        instruction: 'Place the person on their back on a firm, flat surface. Tilt their head back slightly by lifting their chin.',
        details: [
          'Roll person onto their back if necessary',
          'Place on firm surface (floor is ideal)',
          'Tilt head back by lifting chin with two fingers',
          'Open airway by lifting chin and tilting head back'
        ],
        visualCues: [
          'Person is flat on back',
          'Head tilted back',
          'Chin lifted up',
          'Airway appears open'
        ],
        warnings: [
          'Be careful if spinal injury is suspected',
          'Do not over-extend the neck'
        ],
        icon: 'Move',
        estimatedDuration: 20,
        priority: 'CRITICAL'
      },
      {
        number: 4,
        title: 'Hand Placement',
        instruction: 'Place the heel of one hand on the center of the chest between the nipples. Place your other hand on top, interlacing your fingers.',
        details: [
          'Locate center of chest between nipples',
          'Place heel of dominant hand on breastbone',
          'Place second hand on top',
          'Interlace fingers',
          'Keep arms straight and shoulders directly over hands'
        ],
        visualCues: [
          'Hands positioned in center of chest',
          'Fingers interlaced',
          'Arms straight',
          'Shoulders over hands'
        ],
        warnings: [
          'Do not place hands on ribs or stomach',
          'Keep fingers off the chest'
        ],
        icon: 'Hand',
        estimatedDuration: 15,
        priority: 'CRITICAL'
      },
      {
        number: 5,
        title: 'Begin Chest Compressions',
        instruction: 'Push hard and fast at least 2 inches deep at a rate of 100-120 compressions per minute. Allow complete chest recoil between compressions.',
        details: [
          'Compress at least 2 inches (5 cm) deep',
          'Rate of 100-120 compressions per minute',
          'Allow complete chest recoil',
          'Minimize interruptions',
          'Count out loud: "1 and 2 and 3..."'
        ],
        visualCues: [
          'Chest compressing visibly',
          'Complete recoil between compressions',
          'Steady rhythm maintained'
        ],
        warnings: [
          'Do not lean on chest between compressions',
          'Maintain consistent depth and rate'
        ],
        icon: 'Activity',
        estimatedDuration: 120,
        priority: 'CRITICAL',
        isLast: true
      }
    ]
  };

  const currentProtocolSteps = protocolSteps?.[activeProtocol] || [];
  const currentStepData = currentProtocolSteps?.find(step => step?.number === currentStep);

  useEffect(() => {
    // Reset to first step when protocol changes
    setCurrentStep(1);
    setCompletedSteps([]);
    setCallerConfirmed(false);
  }, [activeProtocol]);

  const handleProtocolChange = (protocolId) => {
    setActiveProtocol(protocolId);
  };

  const handleNextStep = () => {
    if (currentStep < currentProtocolSteps?.length) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
      setCallerConfirmed(false);
    } else {
      // Protocol completed, navigate to dispatch
      navigate('/ambulance-dispatch');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setCompletedSteps(prev => prev?.filter(step => step !== currentStep - 1));
      setCallerConfirmed(false);
    }
  };

  const handleRepeatInstruction = () => {
    // Simulate repeating instruction
    console.log('Repeating instruction for step:', currentStep);
  };

  const handleVoicePlay = (instruction) => {
    setIsAudioPlaying(true);
    console.log('Playing instruction:', instruction);
    // Simulate audio playback
    setTimeout(() => {
      setIsAudioPlaying(false);
    }, 3000);
  };

  const handleVoiceCommand = (command) => {
    switch (command) {
      case 'next':
        handleNextStep();
        break;
      case 'previous':
        handlePreviousStep();
        break;
      case 'repeat':
        handleRepeatInstruction();
        break;
      case 'play':
        handleVoicePlay(currentStepData?.instruction);
        break;
      case 'stop':
        setIsAudioPlaying(false);
        break;
      case 'emergency':
        handleEmergencyEscalation();
        break;
      case 'transfer':
        handleCallTransfer();
        break;
      default:
        console.log('Unknown voice command:', command);
    }
  };

  const handleEmergencyEscalation = () => {
    console.log('Emergency escalation triggered');
    // Handle emergency escalation logic
  };

  const handleCallTransfer = () => {
    console.log('Call transfer initiated');
    // Handle call transfer logic
  };

  const handleToggleVoiceListening = () => {
    setIsVoiceListening(!isVoiceListening);
  };

  const handlePlayInstruction = () => {
    if (currentStepData) {
      handleVoicePlay(currentStepData?.instruction);
    }
  };

  const handleStopInstruction = () => {
    setIsAudioPlaying(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Emergency Status Bar */}
      <EmergencyStatusBar />
      {/* Workflow Progress */}
      <WorkflowProgressIndicator />
      {/* Call Context Sidebar */}
      <CallContextSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`
        pt-48 transition-all duration-300
        ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-80'}
      `}>
        <div className="px-6 py-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">First Aid Guidance</h1>
              <p className="text-muted-foreground mt-1">
                Delivering real-time medical instructions for {incidentData?.patientName}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/emergency-call-interface')}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Call
              </Button>
              <Button
                variant="success"
                onClick={() => navigate('/ambulance-dispatch')}
                iconName="Truck"
                iconPosition="left"
                iconSize={16}
              >
                Proceed to Dispatch
              </Button>
            </div>
          </div>

          {/* Protocol Selection */}
          <ProtocolSelector
            activeProtocol={activeProtocol}
            onProtocolChange={handleProtocolChange}
            incidentType={incidentData?.type}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Instruction & Progress */}
            <div className="xl:col-span-2 space-y-6">
              {/* Current Instruction */}
              {currentStepData && (
                <InstructionCard
                  step={currentStepData}
                  isActive={true}
                  isCompleted={completedSteps?.includes(currentStep)}
                  onNext={handleNextStep}
                  onPrevious={handlePreviousStep}
                  onRepeat={handleRepeatInstruction}
                  onVoicePlay={handleVoicePlay}
                  callerConfirmed={callerConfirmed}
                />
              )}

              {/* Progress Tracker */}
              <ProgressTracker
                currentStep={currentStep}
                totalSteps={currentProtocolSteps?.length}
                completedSteps={completedSteps}
                protocolName={activeProtocol?.toUpperCase()}
                estimatedTimeRemaining="3-5 min"
                callerResponsiveness="Good"
              />
            </div>

            {/* Right Column - Monitoring & Controls */}
            <div className="space-y-6">
              {/* Call Monitor */}
              <CallMonitorPanel
                callDuration="00:04:23"
                callerName={incidentData?.callerName}
                onEmergencyEscalation={handleEmergencyEscalation}
                onCallTransfer={handleCallTransfer}
              />

              {/* Voice Control */}
              <VoiceControlPanel
                onVoiceCommand={handleVoiceCommand}
                isListening={isVoiceListening}
                onToggleListening={handleToggleVoiceListening}
                currentInstruction={currentStepData?.instruction}
                onPlayInstruction={handlePlayInstruction}
                onStopInstruction={handleStopInstruction}
                isPlaying={isAudioPlaying}
              />
            </div>
          </div>

          {/* Caller Confirmation Section */}
          <div className="bg-card border border-border rounded-lg shadow-medical p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                  <Icon name="MessageSquare" size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Caller Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    Waiting for caller to confirm step completion
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setCallerConfirmed(false)}
                  iconName="X"
                  iconPosition="left"
                  iconSize={16}
                >
                  Not Completed
                </Button>
                <Button
                  variant="success"
                  onClick={() => setCallerConfirmed(true)}
                  iconName="Check"
                  iconPosition="left"
                  iconSize={16}
                >
                  Confirmed
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Quick Action Panel */}
      <QuickActionPanel 
        isOpen={quickActionOpen}
        onToggle={() => setQuickActionOpen(!quickActionOpen)}
      />
    </div>
  );
};

export default FirstAidGuidance;