import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExtractedInformation = ({ transcriptionText = "", onInformationUpdate }) => {
  const [extractedData, setExtractedData] = useState({
    location: {
      address: "",
      coordinates: "",
      confidence: 0,
      verified: false
    },
    patientCount: {
      count: 1,
      confidence: 0,
      details: ""
    },
    callerDetails: {
      name: "",
      phone: "",
      relationship: "",
      confidence: 0
    }
  });

  const [isEditing, setIsEditing] = useState({
    location: false,
    patientCount: false,
    callerDetails: false
  });

  // Mock extraction logic based on transcription
  useEffect(() => {
    if (!transcriptionText) return;

    const text = transcriptionText?.toLowerCase();
    
    // Extract location information
    const addressMatch = text?.match(/(\d+\s+[\w\s]+(?:street|st|avenue|ave|road|rd|drive|dr|boulevard|blvd|lane|ln|court|ct|place|pl))/i);
    const apartmentMatch = text?.match(/apartment\s+(\w+)|apt\s+(\w+)|unit\s+(\w+)/i);
    
    if (addressMatch) {
      const baseAddress = addressMatch?.[0];
      const apartment = apartmentMatch ? `, ${apartmentMatch?.[0]}` : '';
      setExtractedData(prev => ({
        ...prev,
        location: {
          ...prev?.location,
          address: baseAddress + apartment,
          coordinates: "40.7128, -74.0060", // Mock coordinates
          confidence: 0.92
        }
      }));
    }

    // Extract patient count
    const patientMatches = text?.match(/(\d+)\s+(?:people|person|patient|victim)/i);
    if (patientMatches) {
      setExtractedData(prev => ({
        ...prev,
        patientCount: {
          count: parseInt(patientMatches?.[1]),
          confidence: 0.88,
          details: `${patientMatches?.[1]} person(s) involved`
        }
      }));
    }

    // Extract caller details
    const nameMatch = text?.match(/my name is (\w+\s+\w+)|i'm (\w+\s+\w+)|this is (\w+\s+\w+)/i);
    const relationshipMatch = text?.match(/my (husband|wife|son|daughter|father|mother|brother|sister|friend)/i);
    
    if (nameMatch) {
      const name = nameMatch?.[1] || nameMatch?.[2] || nameMatch?.[3];
      setExtractedData(prev => ({
        ...prev,
        callerDetails: {
          ...prev?.callerDetails,
          name: name,
          phone: "+1 (555) 123-4567", // Mock phone from call system
          relationship: relationshipMatch ? relationshipMatch?.[1] : "caller",
          confidence: 0.85
        }
      }));
    }
  }, [transcriptionText]);

  useEffect(() => {
    if (onInformationUpdate) {
      onInformationUpdate(extractedData);
    }
  }, [extractedData, onInformationUpdate]);

  const handleEdit = (section) => {
    setIsEditing(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleSave = (section) => {
    setIsEditing(prev => ({
      ...prev,
      [section]: false
    }));
    
    // Mark as verified when manually edited
    setExtractedData(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        verified: true,
        confidence: 1.0
      }
    }));
  };

  const handleLocationChange = (field, value) => {
    setExtractedData(prev => ({
      ...prev,
      location: {
        ...prev?.location,
        [field]: value
      }
    }));
  };

  const handlePatientCountChange = (field, value) => {
    setExtractedData(prev => ({
      ...prev,
      patientCount: {
        ...prev?.patientCount,
        [field]: value
      }
    }));
  };

  const handleCallerDetailsChange = (field, value) => {
    setExtractedData(prev => ({
      ...prev,
      callerDetails: {
        ...prev?.callerDetails,
        [field]: value
      }
    }));
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-success';
    if (confidence >= 0.7) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 0.9) return 'CheckCircle';
    if (confidence >= 0.7) return 'AlertCircle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-medical">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Extracted Information</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Zap" size={14} />
          <span>AI-Powered Extraction</span>
        </div>
      </div>
      <div className="space-y-6">
        {/* Location Information */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={20} color="var(--color-primary)" />
              <h4 className="font-semibold text-foreground">Location</h4>
              {extractedData?.location?.confidence > 0 && (
                <div className={`flex items-center space-x-1 text-sm ${getConfidenceColor(extractedData?.location?.confidence)}`}>
                  <Icon name={getConfidenceIcon(extractedData?.location?.confidence)} size={14} />
                  <span>{Math.round(extractedData?.location?.confidence * 100)}%</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => isEditing?.location ? handleSave('location') : handleEdit('location')}
              iconName={isEditing?.location ? "Check" : "Edit"}
              iconSize={16}
            >
              {isEditing?.location ? 'Save' : 'Edit'}
            </Button>
          </div>

          {isEditing?.location ? (
            <div className="space-y-3">
              <Input
                label="Address"
                value={extractedData?.location?.address}
                onChange={(e) => handleLocationChange('address', e?.target?.value)}
                placeholder="Enter full address"
              />
              <Input
                label="Coordinates"
                value={extractedData?.location?.coordinates}
                onChange={(e) => handleLocationChange('coordinates', e?.target?.value)}
                placeholder="Latitude, Longitude"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Icon name="Home" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">
                    {extractedData?.location?.address || "Address not detected"}
                  </p>
                  {extractedData?.location?.coordinates && (
                    <p className="text-xs text-muted-foreground font-mono">
                      {extractedData?.location?.coordinates}
                    </p>
                  )}
                </div>
              </div>
              {extractedData?.location?.verified && (
                <div className="flex items-center space-x-1 text-xs text-success">
                  <Icon name="Shield" size={12} />
                  <span>Verified by operator</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Patient Count */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} color="var(--color-warning)" />
              <h4 className="font-semibold text-foreground">Patient Count</h4>
              {extractedData?.patientCount?.confidence > 0 && (
                <div className={`flex items-center space-x-1 text-sm ${getConfidenceColor(extractedData?.patientCount?.confidence)}`}>
                  <Icon name={getConfidenceIcon(extractedData?.patientCount?.confidence)} size={14} />
                  <span>{Math.round(extractedData?.patientCount?.confidence * 100)}%</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => isEditing?.patientCount ? handleSave('patientCount') : handleEdit('patientCount')}
              iconName={isEditing?.patientCount ? "Check" : "Edit"}
              iconSize={16}
            >
              {isEditing?.patientCount ? 'Save' : 'Edit'}
            </Button>
          </div>

          {isEditing?.patientCount ? (
            <div className="space-y-3">
              <Input
                label="Number of Patients"
                type="number"
                value={extractedData?.patientCount?.count}
                onChange={(e) => handlePatientCountChange('count', parseInt(e?.target?.value) || 1)}
                min="1"
                max="50"
              />
              <Input
                label="Additional Details"
                value={extractedData?.patientCount?.details}
                onChange={(e) => handlePatientCountChange('details', e?.target?.value)}
                placeholder="Additional patient information"
              />
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full">
                <span className="text-xl font-bold text-warning">{extractedData?.patientCount?.count}</span>
              </div>
              <div>
                <p className="text-sm text-foreground font-medium">
                  {extractedData?.patientCount?.count} Patient{extractedData?.patientCount?.count !== 1 ? 's' : ''}
                </p>
                {extractedData?.patientCount?.details && (
                  <p className="text-xs text-muted-foreground">{extractedData?.patientCount?.details}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Caller Details */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={20} color="var(--color-success)" />
              <h4 className="font-semibold text-foreground">Caller Details</h4>
              {extractedData?.callerDetails?.confidence > 0 && (
                <div className={`flex items-center space-x-1 text-sm ${getConfidenceColor(extractedData?.callerDetails?.confidence)}`}>
                  <Icon name={getConfidenceIcon(extractedData?.callerDetails?.confidence)} size={14} />
                  <span>{Math.round(extractedData?.callerDetails?.confidence * 100)}%</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => isEditing?.callerDetails ? handleSave('callerDetails') : handleEdit('callerDetails')}
              iconName={isEditing?.callerDetails ? "Check" : "Edit"}
              iconSize={16}
            >
              {isEditing?.callerDetails ? 'Save' : 'Edit'}
            </Button>
          </div>

          {isEditing?.callerDetails ? (
            <div className="space-y-3">
              <Input
                label="Caller Name"
                value={extractedData?.callerDetails?.name}
                onChange={(e) => handleCallerDetailsChange('name', e?.target?.value)}
                placeholder="Full name"
              />
              <Input
                label="Phone Number"
                value={extractedData?.callerDetails?.phone}
                onChange={(e) => handleCallerDetailsChange('phone', e?.target?.value)}
                placeholder="+1 (555) 123-4567"
              />
              <Input
                label="Relationship to Patient"
                value={extractedData?.callerDetails?.relationship}
                onChange={(e) => handleCallerDetailsChange('relationship', e?.target?.value)}
                placeholder="e.g., spouse, friend, witness"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm text-foreground">
                  {extractedData?.callerDetails?.name || "Name not provided"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm font-mono text-foreground">
                  {extractedData?.callerDetails?.phone || "Phone not available"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="UserCheck" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm text-foreground capitalize">
                  {extractedData?.callerDetails?.relationship || "Relationship unknown"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Location Confidence</p>
            <p className={`text-sm font-semibold ${getConfidenceColor(extractedData?.location?.confidence)}`}>
              {Math.round(extractedData?.location?.confidence * 100)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Patient Count</p>
            <p className="text-sm font-semibold text-foreground">{extractedData?.patientCount?.count}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Caller Confidence</p>
            <p className={`text-sm font-semibold ${getConfidenceColor(extractedData?.callerDetails?.confidence)}`}>
              {Math.round(extractedData?.callerDetails?.confidence * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractedInformation;