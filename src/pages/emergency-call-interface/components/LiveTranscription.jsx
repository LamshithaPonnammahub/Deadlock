import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';

const LiveTranscription = ({ isCallActive, transcriptionText = "", emergencyKeywords = [] }) => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const transcriptionRef = useRef(null);
  const [confidence, setConfidence] = useState(0.95);

  const mockTranscriptionData = [
    "Hello, 911, what's your emergency?",
    "My husband is having chest pain and he can\'t breathe properly.",
    "Okay, I understand. Is he conscious right now?",
    "Yes, but he looks very pale and he's sweating a lot.",
    "Can you tell me your exact location?",
    "We're at 1234 Main Street, apartment 5B in downtown.",
    "I\'m dispatching an ambulance to your location right now.",
    "Please stay on the line with me. Is he still conscious?",
    "Yes, he's sitting on the couch but he says the pain is getting worse.",
    "I need you to help him take slow, deep breaths..."
  ];

  const detectedKeywords = [
    { word: "chest pain", confidence: 0.98, severity: "high" },
    { word: "can\'t breathe", confidence: 0.95, severity: "high" },
    { word: "pale", confidence: 0.92, severity: "medium" },
    { word: "sweating", confidence: 0.89, severity: "medium" },
    { word: "pain getting worse", confidence: 0.96, severity: "high" }
  ];

  useEffect(() => {
    if (!isCallActive) {
      setCurrentText("");
      return;
    }

    let textIndex = 0;
    const interval = setInterval(() => {
      if (textIndex < mockTranscriptionData?.length) {
        setIsTyping(true);
        setCurrentText(prev => {
          const newText = prev + (prev ? "\n\n" : "") + mockTranscriptionData?.[textIndex];
          return newText;
        });
        setConfidence(0.85 + Math.random() * 0.15);
        textIndex++;
        
        setTimeout(() => setIsTyping(false), 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isCallActive]);

  useEffect(() => {
    if (transcriptionRef?.current) {
      transcriptionRef.current.scrollTop = transcriptionRef?.current?.scrollHeight;
    }
  }, [currentText]);

  const highlightKeywords = (text) => {
    if (!text) return text;
    
    let highlightedText = text;
    detectedKeywords?.forEach(keyword => {
      const regex = new RegExp(`(${keyword.word})`, 'gi');
      const severityClass = keyword?.severity === 'high' ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning';
      highlightedText = highlightedText?.replace(regex, `<mark class="${severityClass} px-1 rounded font-medium">$1</mark>`);
    });
    
    return highlightedText;
  };

  const handleClearTranscription = () => {
    setCurrentText("");
  };

  const handleCopyTranscription = () => {
    navigator.clipboard?.writeText(currentText);
  };

  return (
    <div className="card-modern border border-border/20 rounded-xl shadow-glow">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/20">
        <div className="flex items-center space-x-3">
          <div className={`
            w-4 h-4 rounded-full transition-all duration-300 shadow-medical
            ${isCallActive ? 'bg-gradient-success animate-breathing shadow-glow-success' : 'bg-muted'}
          `} />
          <h3 className="text-xl font-bold text-gradient">Live Transcription</h3>
          {isTyping && (
            <div className="flex items-center space-x-2 text-primary bg-primary/10 px-3 py-1.5 rounded-full">
              <Icon name="Mic" size={16} />
              <span className="text-sm font-semibold animate-pulse">Listening...</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-sm text-muted-foreground bg-muted/20 px-3 py-1.5 rounded-full">
            <Icon name="Zap" size={14} />
            <span className="font-semibold">Confidence: {Math.round(confidence * 100)}%</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyTranscription}
            iconName="Copy"
            iconSize={18}
            disabled={!currentText}
            className="hover:shadow-glow"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearTranscription}
            iconName="Trash2"
            iconSize={18}
            disabled={!currentText}
            className="hover:shadow-glow-error"
          />
        </div>
      </div>
      {/* Transcription Content */}
      <div className="p-6">
        <div 
          ref={transcriptionRef}
          className="min-h-52 max-h-72 overflow-y-auto bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-6 border border-border/20 shadow-medical"
        >
          {currentText ? (
            <div 
              className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-medium"
              dangerouslySetInnerHTML={{ __html: highlightKeywords(currentText) }}
            />
          ) : (
            <div className="flex items-center justify-center h-40 text-center">
              <div>
                <Icon name="Mic" size={40} color="var(--color-muted-foreground)" className="animate-float" />
                <p className="text-sm text-muted-foreground mt-3 font-semibold">
                  {isCallActive ? "Waiting for speech..." : "Start a call to begin transcription"}
                </p>
              </div>
            </div>
          )}
          
          {isTyping && (
            <div className="flex items-center space-x-1 mt-4">
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-glow" />
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-glow" style={{ animationDelay: '0.1s' }} />
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-glow" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
        </div>

        {/* Emergency Keywords Detection */}
        {detectedKeywords?.length > 0 && currentText && (
          <div className="mt-6">
            <h4 className="text-sm font-bold text-gradient mb-3 flex items-center space-x-2">
              <Icon name="AlertTriangle" size={18} color="var(--color-warning)" />
              <span>Detected Emergency Keywords</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {detectedKeywords?.map((keyword, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-medical
                    ${keyword?.severity === 'high' ?'bg-gradient-error/20 text-error border border-error/30 shadow-glow-error' :'bg-gradient-warning/20 text-warning border border-warning/30 shadow-glow'
                    }
                  `}
                >
                  <span>"{keyword?.word}"</span>
                  <span className="text-muted-foreground">
                    {Math.round(keyword?.confidence * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transcription Stats */}
        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground bg-muted/20 px-4 py-3 rounded-xl">
          <div className="flex items-center space-x-6">
            <span className="font-semibold">Words: {currentText?.split(' ')?.filter(word => word?.length > 0)?.length}</span>
            <span className="font-semibold">Keywords: {detectedKeywords?.length}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Icon name="Clock" size={14} />
            <span className="font-semibold">Last updated: {new Date()?.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTranscription;