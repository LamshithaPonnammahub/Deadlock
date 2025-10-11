import { useState } from "react";
import { ArrowLeft, PlayCircle, CheckCircle, Users, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Emergency Detection",
      description: "AI system detects emergency calls and analyzes severity",
      icon: "🚨",
      features: ["Real-time call analysis", "Severity assessment", "Location triangulation"]
    },
    {
      title: "Route Optimization",
      description: "Smart algorithms find the fastest route to the emergency",
      icon: "🗺️",
      features: ["Traffic analysis", "Dynamic routing", "ETA calculation"]
    },
    {
      title: "Traffic Management",
      description: "Coordinate with traffic systems for priority clearance",
      icon: "🚦",
      features: ["Signal preemption", "Lane clearance", "Priority coordination"]
    },
    {
      title: "Patient Monitoring",
      description: "Continuous monitoring and data transmission to hospitals",
      icon: "🏥",
      features: ["Vital signs tracking", "Real-time updates", "Hospital preparation"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Badge className="bg-red-600 text-white">
              LIVE DEMO
            </Badge>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-blue-500">AI-Powered</span>
            <br />
            <span className="text-white">Smart Ambulance</span>
            <br />
            <span className="text-blue-500">Demo</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Experience how our revolutionary AI system transforms emergency response 
            in real-time scenarios.
          </p>
          
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 h-auto rounded-none font-semibold"
            onClick={() => setCurrentStep(0)}
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Start Interactive Demo
          </Button>
        </div>
      </div>

      {/* Demo Steps */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoSteps.map((step, index) => (
              <Card
                key={index}
                className={`bg-gray-900 border-gray-800 cursor-pointer transition-all duration-300 ${
                  currentStep === index 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'hover:border-gray-700'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <CardTitle className="text-white text-lg">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Current Step Details */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">{demoSteps[currentStep].icon}</div>
            <h2 className="text-4xl font-black text-blue-500 mb-6">
              {demoSteps[currentStep].title}
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {demoSteps[currentStep].description}
            </p>
            
            {/* Simulated Data */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-gray-400">Team Members</div>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
                <Clock className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white">2.3 min</div>
                <div className="text-gray-400">Response Time</div>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
                <MapPin className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white">0.8 km</div>
                <div className="text-gray-400">Distance</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{currentStep + 1} of {demoSteps.length}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
                disabled={currentStep === demoSteps.length - 1}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-black text-white mb-6">
            Ready to <span className="text-blue-500">Transform</span> Emergency Response?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us in revolutionizing healthcare with AI-powered smart ambulance technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4 h-auto rounded-none font-semibold"
              onClick={() => navigate("/")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10 text-lg px-8 py-4 h-auto rounded-none font-semibold"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
