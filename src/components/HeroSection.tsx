import { useEffect, useState } from "react";
import { PlayCircle, X } from "lucide-react";
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
    <section className="relative min-h-screen flex flex-col bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroAmbulance}
          alt="AI-powered smart ambulance in city traffic"
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          {/* Glowing dots scattered across */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-16 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse opacity-60" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-60" style={{ animationDelay: '3s' }} />
          <div className="absolute top-60 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-60" style={{ animationDelay: '4s' }} />
          <div className="absolute bottom-60 right-1/3 w-1 h-1 bg-red-300 rounded-full animate-pulse opacity-60" style={{ animationDelay: '5s' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-6 py-20">
        <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Emergency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 rounded-full text-white text-xs font-bold mb-8">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            EMERGENCY INNOVATION
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight leading-none">
            <span className="text-blue-500">AI-Powered</span>
            <br />
            <span className="text-white">Smart Ambulance</span>
            <br />
            <span className="text-blue-500">System</span>
          </h1>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl mb-12 font-medium max-w-4xl mx-auto leading-relaxed">
            <p className="text-orange-400 mb-2">Every second matters in saving lives.</p>
            <p className="text-white">
              Revolutionary AI technology for <span className="text-blue-400 font-semibold">faster emergency response.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white border-0 text-lg px-8 py-4 h-auto rounded-none font-semibold"
              onClick={() => setIsVideoOpen(true)}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              See Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto rounded-none font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="relative z-20 bg-black/90 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black text-blue-500">50%</div>
              <div className="text-white font-semibold">Faster Response Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black text-blue-500">90%</div>
              <div className="text-white font-semibold">Traffic Clearance Success</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black text-blue-500">24/7</div>
              <div className="text-white font-semibold">AI Monitoring</div>
            </div>
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