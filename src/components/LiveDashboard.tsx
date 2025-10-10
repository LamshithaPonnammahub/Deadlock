import { useState, useEffect } from "react";
import { Activity, MapPin, Clock, Heart, Thermometer, Droplets } from "lucide-react";

export const LiveDashboard = () => {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: { systolic: 120, diastolic: 80 },
    temperature: "98.6",
    oxygenSat: 98,
    location: "Emergency Route 1"
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setVitals(prev => ({
          ...prev,
          heartRate: Math.floor(Math.random() * 20) + 65,
          bloodPressure: {
            systolic: Math.floor(Math.random() * 30) + 110,
            diastolic: Math.floor(Math.random() * 20) + 70
          },
          temperature: (Math.random() * 2 + 97.5).toFixed(1),
          oxygenSat: Math.floor(Math.random() * 5) + 95
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="medical-card p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">Live Patient Monitor</h3>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-emergency-red animate-pulse' : 'bg-muted'}`} />
          <span className="text-sm text-muted-foreground">
            {isLive ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-emergency-red" />
            <span className="text-sm font-medium">Heart Rate</span>
          </div>
          <span className="text-lg font-bold text-emergency-red">
            {vitals.heartRate} BPM
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-medical-blue" />
            <span className="text-sm font-medium">Blood Pressure</span>
          </div>
          <span className="text-lg font-bold text-medical-blue">
            {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Droplets className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">Oxygen Sat</span>
          </div>
          <span className="text-lg font-bold text-accent">
            {vitals.oxygenSat}%
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-medical-blue" />
            <span className="text-sm font-medium">Location</span>
          </div>
          <span className="text-sm font-semibold text-foreground">
            {vitals.location}
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-medical-blue/10 rounded-lg text-center">
        <p className="text-xs text-medical-blue font-semibold">
          Hospital notified • ETA: 4 minutes
        </p>
      </div>
    </div>
  );
};