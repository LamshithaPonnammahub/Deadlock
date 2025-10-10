import { useEffect, useState } from "react";
import { ArrowDown, PlayCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import heroAmbulance from "@/assets/hero-ambulance.jpg";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroAmbulance}
          alt="AI-powered smart ambulance in city traffic"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-2 h-2 bg-medical-blue rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-emergency-red rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-16 w-1.5 h-1.5 bg-accent rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-medical-blue-light rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Emergency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emergency-red/20 border border-emergency-red/30 rounded-full text-emergency-red mb-6 medical-glow">
            <div className="w-2 h-2 bg-emergency-red rounded-full animate-emergency-pulse" />
            <span className="text-sm font-semibold">EMERGENCY INNOVATION</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            <span className="hero-text">AI-Powered</span>
            <br />
            <span className="text-medical-white">Smart Ambulance</span>
            <br />
            <span className="text-medical-blue">System</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium max-w-3xl mx-auto">
            <span className="text-emergency-red font-bold">Every second matters</span> in saving lives.
            <br />
            Revolutionary AI technology for <span className="text-medical-blue font-semibold">faster emergency response.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-medical hover:shadow-glow-medical text-white border-0 text-lg px-8 py-4 h-auto group"
              onClick={() => setIsVideoOpen(true)}
            >
              <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              See Demo
            </Button>
            <Button variant="outline" size="lg" className="border-medical-blue text-medical-blue hover:bg-medical-blue/10 text-lg px-8 py-4 h-auto">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "50%", label: "Faster Response Time", color: "text-medical-blue" },
              { value: "90%", label: "Traffic Clearance Success", color: "text-emergency-red" },
              { value: "24/7", label: "AI Monitoring", color: "text-accent" }
            ].map((stat, index) => (
              <div key={index} className={`medical-card p-6 transition-all duration-500 hover:shadow-glow-intense ${isLoaded ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`text-3xl md:text-4xl font-black mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <span className="text-sm font-medium">Discover More</span>
          <ArrowDown className="h-5 w-5" />
        </div>
      </div>

      {/* Video Demo Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-white text-xl font-semibold">
              AI-Powered Smart Ambulance Demo
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 text-white hover:bg-white/10"
              onClick={() => setIsVideoOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="relative w-full aspect-video bg-gray-900">
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              poster="/placeholder.svg"
            >
              {/* You can replace this with your actual demo video */}
              <source src="src\assets\Screen Recording 2025-09-19 231340.mp4" type="video/mp4" />
              <source src="src\assets\Screen Recording 2025-09-19 231340.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-6 pt-4">
            <p className="text-gray-300 text-sm">
              Watch how our AI-powered smart ambulance system navigates through traffic, 
              optimizes routes, and provides real-time emergency response coordination.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};