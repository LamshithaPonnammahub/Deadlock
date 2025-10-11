import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon.jsx';


const IncidentClassification = ({ detectedKeywords = [], onClassificationChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [severity, setSeverity] = useState('moderate');
  const [confidence, setConfidence] = useState(0);

  const incidentCategories = [
    {
      id: 'cardiac',
      name: 'Cardiac Emergency',
      icon: 'Heart',
      keywords: ['chest pain', 'heart attack', 'cardiac arrest', 'palpitations', 'shortness of breath'],
      color: 'error',
      description: 'Heart-related medical emergency'
    },
    {
      id: 'accident',
      name: 'Accident/Trauma',
      icon: 'AlertTriangle',
      keywords: ['accident', 'crash', 'bleeding', 'broken', 'injured', 'trauma'],
      color: 'warning',
      description: 'Physical injury or trauma'
    },
    {
      id: 'stroke',
      name: 'Stroke/Neurological',
      icon: 'Brain',
      keywords: ['stroke', 'seizure', 'unconscious', 'paralysis', 'speech problems'],
      color: 'primary',
      description: 'Brain or nervous system emergency'
    },
    {
      id: 'other',
      name: 'Other Emergency',
      icon: 'HelpCircle',
      keywords: ['emergency', 'help', 'urgent', 'critical'],
      color: 'secondary',
      description: 'General emergency situation'
    }
  ];

  const severityLevels = [
    { id: 'critical', label: 'Critical', color: 'error', icon: 'AlertTriangle' },
    { id: 'moderate', label: 'Moderate', color: 'warning', icon: 'AlertCircle' },
    { id: 'stable', label: 'Stable', color: 'success', icon: 'CheckCircle' }
  ];

  // Auto-classify based on detected keywords
  useEffect(() => {
    if (detectedKeywords?.length === 0) return;

    let bestMatch = null;
    let highestScore = 0;

    incidentCategories?.forEach(category => {
      const matchingKeywords = detectedKeywords?.filter(detected => 
        category?.keywords?.some(keyword => 
          detected?.word?.toLowerCase()?.includes(keyword?.toLowerCase())
        )
      );

      if (matchingKeywords?.length > 0) {
        const score = matchingKeywords?.reduce((sum, kw) => sum + kw?.confidence, 0) / matchingKeywords?.length;
        if (score > highestScore) {
          highestScore = score;
          bestMatch = category;
        }
      }
    });

    if (bestMatch && highestScore > 0.7) {
      setSelectedCategory(bestMatch?.id);
      setConfidence(highestScore);
      
      // Auto-determine severity based on keywords
      const criticalKeywords = ['cardiac arrest', 'unconscious', 'not breathing', 'severe bleeding'];
      const hasCriticalKeywords = detectedKeywords?.some(detected => 
        criticalKeywords?.some(critical => 
          detected?.word?.toLowerCase()?.includes(critical?.toLowerCase())
        )
      );
      
      if (hasCriticalKeywords || highestScore > 0.95) {
        setSeverity('critical');
      } else if (highestScore > 0.85) {
        setSeverity('moderate');
      } else {
        setSeverity('stable');
      }
    }
  }, [detectedKeywords]);

  useEffect(() => {
    if (onClassificationChange) {
      onClassificationChange({
        category: selectedCategory,
        severity,
        confidence
      });
    }
  }, [selectedCategory, severity, confidence, onClassificationChange]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setConfidence(1.0); // Manual selection has full confidence
  };

  const getColorClasses = (color, isSelected = false) => {
    const baseClasses = {
      error: isSelected ? 'bg-error text-error-foreground border-error' : 'border-error/20 text-error hover:bg-error/5',
      warning: isSelected ? 'bg-warning text-warning-foreground border-warning' : 'border-warning/20 text-warning hover:bg-warning/5',
      primary: isSelected ? 'bg-primary text-primary-foreground border-primary' : 'border-primary/20 text-primary hover:bg-primary/5',
      secondary: isSelected ? 'bg-secondary text-secondary-foreground border-secondary' : 'border-secondary/20 text-secondary hover:bg-secondary/5',
      success: isSelected ? 'bg-success text-success-foreground border-success' : 'border-success/20 text-success hover:bg-success/5'
    };
    return baseClasses?.[color] || baseClasses?.secondary;
  };

  return (
    <div className="card-modern border border-border/20 rounded-xl p-6 shadow-glow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gradient">Incident Classification</h3>
        {confidence > 0 && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/20 px-3 py-1.5 rounded-full">
            <Icon name="Zap" size={14} />
            <span className="font-semibold">Confidence: {Math.round(confidence * 100)}%</span>
          </div>
        )}
      </div>
      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {incidentCategories?.map((category) => {
          const isSelected = selectedCategory === category?.id;
          const matchingKeywords = detectedKeywords?.filter(detected => 
            category?.keywords?.some(keyword => 
              detected?.word?.toLowerCase()?.includes(keyword?.toLowerCase())
            )
          );

          return (
            <button
              key={category?.id}
              onClick={() => handleCategorySelect(category?.id)}
              className={`
                p-4 border-2 rounded-xl transition-all duration-300 text-left hover:shadow-glow
                ${getColorClasses(category?.color, isSelected)}
                ${isSelected ? 'shadow-glow' : 'hover:shadow-medical'}
              `}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name={category?.icon} 
                  size={22} 
                  color="currentColor"
                />
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h4 className="font-bold text-sm mb-1 truncate">{category?.name}</h4>
                  <p className="text-xs opacity-80 mb-2 line-clamp-2">{category?.description}</p>
                  
                  {matchingKeywords?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {matchingKeywords?.slice(0, 2)?.map((keyword, index) => (
                        <span
                          key={index}
                          className="text-xs px-1.5 py-0.5 bg-current/10 rounded truncate max-w-20"
                        >
                          {keyword?.word}
                        </span>
                      ))}
                      {matchingKeywords?.length > 2 && (
                        <span className="text-xs opacity-60">
                          +{matchingKeywords?.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {isSelected && (
                  <Icon name="CheckCircle" size={18} color="currentColor" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      {/* Severity Assessment */}
      {selectedCategory && (
        <div className="border-t border-border/20 pt-6">
          <h4 className="text-sm font-bold text-gradient mb-4">Severity Assessment</h4>
          <div className="grid grid-cols-3 gap-3">
            {severityLevels?.map((level) => {
              const isSelected = severity === level?.id;
              return (
                <button
                  key={level?.id}
                  onClick={() => setSeverity(level?.id)}
                  className={`
                    p-3 border-2 rounded-xl transition-all duration-300 text-center hover:shadow-glow
                    ${getColorClasses(level?.color, isSelected)}
                    ${isSelected ? 'shadow-glow' : 'hover:shadow-medical'}
                  `}
                >
                  <Icon 
                    name={level?.icon} 
                    size={18} 
                    color="currentColor"
                    className="mx-auto mb-1"
                  />
                  <span className="text-xs font-bold truncate">{level?.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* Classification Summary */}
      {selectedCategory && (
        <div className="mt-6 p-4 bg-muted/20 rounded-xl">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-semibold">Classification:</span>
            <span className="font-bold text-foreground truncate max-w-48">
              {incidentCategories?.find(c => c?.id === selectedCategory)?.name} - {severityLevels?.find(s => s?.id === severity)?.label}
            </span>
          </div>
          {confidence > 0 && confidence < 1 && (
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground font-semibold">Auto-detected:</span>
              <span className="text-primary font-bold">{Math.round(confidence * 100)}% confidence</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IncidentClassification;