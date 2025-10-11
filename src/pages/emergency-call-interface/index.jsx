import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import EmergencyStatusBar from '../../components/ui/EmergencyStatusBar';
import WorkflowProgressIndicator from '../../components/ui/WorkflowProgressIndicator';
import CallContextSidebar from '../../components/ui/CallContextSidebar';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import AudioWaveform from './components/AudioWaveform';
import LiveTranscription from './components/LiveTranscription';
import IncidentClassification from './components/IncidentClassification';
import ExtractedInformation from './components/ExtractedInformation';
import EmergencyActions from './components/EmergencyActions';
import DispatchStatus from './components/DispatchStatus';

const EmergencyCallInterface = () => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0.7);
  const [transcriptionText, setTranscriptionText] = useState("");
  const [classification, setClassification] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [dispatchData, setDispatchData] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  // Mock emergency keywords detected from transcription
  const [detectedKeywords, setDetectedKeywords] = useState([
    { word: "chest pain", confidence: 0.98, severity: "high" },
    { word: "can\'t breathe", confidence: 0.95, severity: "high" },
    { word: "pale", confidence: 0.92, severity: "medium" },
    { word: "sweating", confidence: 0.89, severity: "medium" }
  ]);

  // Simulate real-time transcription updates
  useEffect(() => {
    if (!isCallActive) return;

    const mockTranscription = `Hello, 911, what's your emergency? My husband is having chest pain and he can't breathe properly.

Okay, I understand. Is he conscious right now?

Yes, but he looks very pale and he's sweating a lot.

Can you tell me your exact location?

We're at 1234 Main Street, apartment 5B in downtown.

I'm dispatching an ambulance to your location right now.`;

    setTranscriptionText(mockTranscription);
  }, [isCallActive]);

  // Handle audio controls
  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setIsRecording(false);
    setAudioLevel(0);
  };

  // Handle classification updates
  const handleClassificationChange = (newClassification) => {
    setClassification(newClassification);
  };

  // Handle extracted information updates
  const handleInformationUpdate = (newInfo) => {
    setExtractedInfo(newInfo);
  };

  // Handle dispatch
  const handleDispatch = (dispatchInfo) => {
    setDispatchData(dispatchInfo);
  };

  // Handle protocol access
  const handleProtocolAccess = (protocol) => {
    console.log('Accessing protocol:', protocol);
  };

  // Handle clarification questions
  const handleClarificationSent = (question) => {
    console.log('Clarification sent:', question);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Fixed Header Components */}
      <Header />
      <EmergencyStatusBar />
      <WorkflowProgressIndicator />
      
      {/* Main Content Area */}
      <div className="pt-52 pb-8">
        <div className={`
          transition-all duration-300 ease-out
          ${sidebarCollapsed ? 'ml-16' : 'ml-80'}
          mr-6 lg:mr-0
        `}>
          <div className="max-w-7xl mx-auto px-8">
            {/* Primary Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              {/* Left Column - Audio & Transcription */}
              <div className="xl:col-span-2 space-y-8">
                {/* Audio Waveform */}
                <AudioWaveform
                  isCallActive={isCallActive}
                  audioLevel={audioLevel}
                  onMute={handleMute}
                  onRecord={handleRecord}
                  onEndCall={handleEndCall}
                  isMuted={isMuted}
                  isRecording={isRecording}
                />

                {/* Live Transcription */}
                <LiveTranscription
                  isCallActive={isCallActive}
                  transcriptionText={transcriptionText}
                  emergencyKeywords={detectedKeywords}
                />

                {/* Extracted Information */}
                <ExtractedInformation
                  transcriptionText={transcriptionText}
                  onInformationUpdate={handleInformationUpdate}
                />
              </div>

              {/* Right Column - Classification & Actions */}
              <div className="space-y-8">
                {/* Incident Classification */}
                <IncidentClassification
                  detectedKeywords={detectedKeywords}
                  onClassificationChange={handleClassificationChange}
                />

                {/* Dispatch Status */}
                <DispatchStatus
                  isActive={!!dispatchData}
                  dispatchData={dispatchData}
                />
              </div>
            </div>

            {/* Emergency Actions Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <EmergencyActions
                classification={classification}
                extractedInfo={extractedInfo}
                onDispatch={handleDispatch}
                onProtocolAccess={handleProtocolAccess}
                onClarificationSent={handleClarificationSent}
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

      {/* Quick Action Panel */}
      <QuickActionPanel
        isOpen={quickActionOpen}
        onToggle={() => setQuickActionOpen(!quickActionOpen)}
      />

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .pt-48 {
            padding-top: 12rem;
          }
          .ml-80 {
            margin-left: 0;
          }
          .ml-16 {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default EmergencyCallInterface;