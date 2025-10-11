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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero bg-pattern">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroAmbulance}
          alt="AI-powered smart ambulance in city traffic"
          className="w-full h-full object-cover opacity-60 transition-all duration-1000 hover:opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/5 via-transparent to-emergency-red/5" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-medical-blue rounded-full animate-float shadow-glow-medical" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-emergency-red rounded-full animate-float shadow-glow-emergency" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-16 w-2.5 h-2.5 bg-accent rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-medical-blue-light rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-medical-white rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-60 right-1/3 w-1.5 h-1.5 bg-emergency-red-light rounded-full animate-float" style={{ animationDelay: '5s' }} />
        
        {/* Geometric Shapes */}
        <div className="absolute top-32 right-16 w-8 h-8 border border-medical-blue/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-32 left-24 w-6 h-6 border border-emergency-red/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-8 w-4 h-4 bg-gradient-to-r from-medical-blue to-emergency-red rounded-lg rotate-12 animate-float" style={{ animationDelay: '6s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Emergency Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emergency-red/20 border border-emergency-red/30 rounded-full text-emergency-red mb-8 medical-glow hover-lift animated-border backdrop-blur-sm">
            <div className="w-3 h-3 bg-emergency-red rounded-full animate-emergency-pulse shadow-glow-emergency" />
            <span className="text-sm font-bold tracking-wide">EMERGENCY INNOVATION</span>
            <div className="w-1 h-1 bg-emergency-red rounded-full animate-pulse" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight text-shadow">
            <span className="hero-text text-reveal">
              <span style={{ animationDelay: '0.2s' }}>AI-Powered</span>
            </span>
            <br />
            <span className="text-medical-white text-reveal">
              <span style={{ animationDelay: '0.4s' }}>Smart Ambulance</span>
            </span>
            <br />
            <span className="text-medical-blue text-reveal">
              <span style={{ animationDelay: '0.6s' }}>System</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-medium max-w-4xl mx-auto leading-relaxed">
            <span className="text-emergency-red font-bold text-glow">Every second matters</span> in saving lives.
            <br />
            Revolutionary AI technology for <span className="text-medical-blue font-semibold">faster emergency response.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-medical hover:shadow-glow-medical text-white border-0 text-lg px-10 py-5 h-auto group hover-lift shimmer rounded-full"
              onClick={() => setIsVideoOpen(true)}
            >
              <PlayCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              See Demo
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
            <Button variant="outline" size="lg" className="border-medical-blue text-medical-blue hover:bg-medical-blue/10 text-lg px-10 py-5 h-auto hover-lift glass rounded-full backdrop-blur-sm">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: "50%", label: "Faster Response Time", color: "text-medical-blue", icon: "⚡" },
              { value: "90%", label: "Traffic Clearance Success", color: "text-emergency-red", icon: "🚦" },
              { value: "24/7", label: "AI Monitoring", color: "text-accent", icon: "🤖" }
            ].map((stat, index) => (
              <div key={index} className={`medical-card p-8 transition-all duration-500 hover:shadow-glow-intense hover-lift perspective transform-3d ${isLoaded ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className={`text-4xl md:text-5xl font-black mb-3 ${stat.color} text-glow`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-semibold text-lg">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/5 to-emergency-red/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-3 text-muted-foreground animate-bounce hover-lift cursor-pointer">
          <span className="text-sm font-semibold tracking-wide">Discover More</span>
          <div className="w-8 h-8 rounded-full border-2 border-medical-blue/50 flex items-center justify-center hover:border-medical-blue hover:bg-medical-blue/10 transition-all duration-300">
            <ArrowDown className="h-4 w-4" />
          </div>
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