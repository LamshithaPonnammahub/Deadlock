import { useState, useEffect, useRef } from "react";
import { 
  Brain, 
  Navigation, 
  Activity, 
  Hospital, 
  Phone,
  Zap,
  CheckCircle,
  ArrowRight,
  X,
  Clock,
  Users,
  Shield,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LiveDashboard } from "@/components/LiveDashboard";
import smartHospital from "@/assets/smart-hospital.jpg";
import aiTrafficSystem from "@/assets/ai-traffic-system.jpg";

const solutions = [
  {
    icon: Brain,
    title: "AI Traffic Management",
    subtitle: "Smart Path Clearing",
    description: "Smart traffic lights automatically clear the path when an ambulance is detected using computer vision and IoT sensors.",
    features: [
      "Real-time ambulance detection",
      "Automatic traffic light control",
      "Multi-intersection coordination",
      "Emergency vehicle priority"
    ],
    image: aiTrafficSystem,
    color: "medical-blue",
    delay: 0,
    detailedInfo: {
      overview: "Our AI Traffic Management system uses advanced computer vision and machine learning to detect emergency vehicles and automatically coordinate traffic signals across multiple intersections.",
      benefits: [
        "Reduces emergency response time by 40%",
        "Prevents traffic congestion during emergencies",
        "Works with existing traffic infrastructure",
        "24/7 automated monitoring"
      ],
      technology: [
        "Computer Vision AI",
        "IoT Sensor Network",
        "Real-time Data Processing",
        "Machine Learning Algorithms"
      ],
      stats: [
        { icon: Clock, label: "Response Time", value: "40% Faster" },
        { icon: Users, label: "Traffic Flow", value: "90% Improved" },
        { icon: Shield, label: "Safety Rate", value: "99.8%" },
        { icon: TrendingUp, label: "Efficiency", value: "85% Increase" }
      ]
    }
  },
  {
    icon: Navigation,
    title: "GPS & Smart Routing",
    subtitle: "Optimal Path Intelligence",
    description: "AI-powered routing finds the fastest, least congested route in real-time, considering traffic patterns and road conditions.",
    features: [
      "Dynamic route optimization",
      "Traffic pattern analysis",
      "Road condition monitoring",
      "ETA prediction accuracy"
    ],
    image: null,
    color: "accent",
    delay: 200
  },
  {
    icon: Activity,
    title: "IoT Patient Monitoring",
    subtitle: "Live Vital Streaming",
    description: "Continuous monitoring of vital signs (HR, BP, O2) with real-time data streaming directly to receiving hospitals.",
    features: [
      "Real-time vital signs",
      "ECG monitoring",
      "Blood pressure tracking",
      "Oxygen saturation levels"
    ],
    image: null,
    color: "emergency-red",
    delay: 400
  },
  {
    icon: Hospital,
    title: "Hospital Auto-Alert",
    subtitle: "Instant Preparation",
    description: "Nearby hospitals receive automatic notifications with patient condition updates, enabling immediate preparation.",
    features: [
      "Automatic hospital selection",
      "Real-time patient data",
      "Resource allocation",
      "Staff notification system"
    ],
    image: smartHospital,
    color: "medical-blue",
    delay: 600
  },
  {
    icon: Phone,
    title: "AI Call Assistant",
    subtitle: "Intelligent Emergency Handling",
    description: "AI detects critical keywords and automatically triggers dispatch while providing first-aid guidance to callers.",
    features: [
      "Keyword detection",
      "Automatic dispatch",
      "First-aid guidance",
      "Multi-language support"
    ],
    image: null,
    color: "accent",
    delay: 800,
    detailedInfo: {
      overview: "Our AI Call Assistant revolutionizes emergency call handling by using natural language processing to understand emergency situations and automatically dispatch appropriate resources while providing life-saving guidance.",
      benefits: [
        "Instant emergency recognition and dispatch",
        "Real-time first-aid instructions",
        "Reduces human error in emergency calls",
        "Supports 50+ languages worldwide"
      ],
      technology: [
        "Natural Language Processing",
        "Voice Recognition AI",
        "Emergency Keyword Detection",
        "Multi-language Translation"
      ],
      stats: [
        { icon: Clock, label: "Dispatch Time", value: "60% Faster" },
        { icon: Users, label: "Accuracy", value: "98.5%" },
        { icon: Shield, label: "Lives Saved", value: "2,500+" },
        { icon: TrendingUp, label: "Efficiency", value: "75% Increase" }
      ]
    }
  }
];

export const SolutionSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeItem, setActiveItem] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            solutions.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate active item for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % solutions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-muted/30 to-background bg-pattern relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-medical-blue/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emergency-red/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-medical-blue/20 border border-medical-blue/30 rounded-full text-medical-blue mb-8 medical-glow hover-lift animated-border backdrop-blur-sm">
            <Zap className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-bold tracking-wide">AI-POWERED SOLUTION</span>
            <div className="w-2 h-2 bg-medical-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-shadow">
            <span className="hero-text">Revolutionary</span> 
            <br />
            <span className="text-medical-blue">Emergency Response</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our comprehensive AI and IoT solution transforms every aspect of emergency response, 
            from detection to delivery with <span className="text-medical-blue font-semibold">cutting-edge technology</span>.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="space-y-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isVisible = visibleItems.includes(index);
            const isActive = activeItem === index;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`transition-all duration-1000 transform ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${solution.delay}ms` }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:grid-flow-col-reverse'}`}>
                  {/* Content */}
                  <div className={`space-y-8 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-6">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-${solution.color}/20 transition-all duration-500 hover-lift perspective transform-3d ${isActive ? `shadow-glow-medical bg-${solution.color}/30 scale-110` : 'hover:scale-105'}`}>
                        <Icon className={`h-10 w-10 text-${solution.color} transition-transform duration-300 ${isActive ? 'scale-110 animate-pulse' : ''}`} />
                      </div>
                      <div>
                        <h3 className="text-4xl font-black text-foreground text-shadow">
                          {solution.title}
                        </h3>
                        <p className={`text-xl font-semibold text-${solution.color} text-glow`}>
                          {solution.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="space-y-4">
                      {solution.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex} 
                          className={`flex items-center gap-4 transition-all duration-500 hover-lift ${
                            isActive ? 'translate-x-3' : ''
                          }`}
                          style={{ transitionDelay: `${featureIndex * 100}ms` }}
                        >
                          <CheckCircle className={`h-6 w-6 text-${solution.color} flex-shrink-0 animate-pulse`} />
                          <span className="text-foreground font-semibold text-lg">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`bg-gradient-${solution.color === 'medical-blue' ? 'medical' : 'emergency'} text-white border-0 group hover:shadow-glow-medical transition-all duration-300 hover-lift shimmer rounded-full px-8 py-4 text-lg`}
                      size="lg"
                      onClick={() => {
                        if (solution.title === "AI Call Assistant") {
                          window.open("https://smart-emergency-assistant-fwjzn52.public.builtwithrocket.new", "_blank");
                        } else {
                          setSelectedSolution(index);
                        }
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </Button>
                  </div>

                  {/* Image/Visual */}
                  <div className={`${isEven ? '' : 'lg:order-1'} relative perspective transform-3d`}>
                    {solution.image ? (
                      <div className={`medical-card overflow-hidden transition-all duration-700 hover-lift animated-border ${isActive ? 'shadow-glow-intense scale-105' : 'hover:scale-105'}`}>
                        <img 
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-96 object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-${solution.color}/30 via-transparent to-transparent`} />
                        <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/10 to-emergency-red/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ) : (
                      <div className={`medical-card p-16 h-96 flex items-center justify-center bg-gradient-to-br from-${solution.color}/15 to-${solution.color}/5 transition-all duration-700 hover-lift animated-border ${isActive ? 'shadow-glow-intense scale-105' : 'hover:scale-105'}`}>
                        {solution.title === "IoT Patient Monitoring" ? (
                          <div className="w-full h-full">
                            <LiveDashboard />
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="relative">
                              <Icon className={`h-32 w-32 text-${solution.color} mx-auto mb-6 transition-transform duration-500 ${isActive ? 'scale-110 animate-float' : 'hover:scale-110'}`} />
                              <div className={`absolute inset-0 bg-gradient-to-r from-${solution.color}/20 to-transparent rounded-full blur-2xl`} />
                            </div>
                            <p className={`text-xl font-bold text-${solution.color} text-glow`}>
                              {solution.subtitle}
                            </p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/5 to-emergency-red/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Solution Modal */}
      <Dialog open={selectedSolution !== null} onOpenChange={() => setSelectedSolution(null)}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {selectedSolution !== null && (() => {
            const solution = solutions[selectedSolution];
            const Icon = solution.icon;
            return (
              <>
                <DialogHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${solution.color}/20`}>
                      <Icon className={`h-8 w-8 text-${solution.color}`} />
                    </div>
                    <div>
                      <DialogTitle className="text-3xl font-black text-foreground">
                        {solution.title}
                      </DialogTitle>
                      <p className={`text-lg font-semibold text-${solution.color}`}>
                        {solution.subtitle}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-4"
                    onClick={() => setSelectedSolution(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogHeader>

                <div className="space-y-8">
                  {/* Overview */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {solution.detailedInfo?.overview || solution.description}
                    </p>
                  </div>

                  {/* Stats */}
                  {solution.detailedInfo?.stats && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-foreground">Key Performance Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {solution.detailedInfo.stats.map((stat, index) => {
                          const StatIcon = stat.icon;
                          return (
                            <div key={index} className="medical-card p-4 text-center">
                              <StatIcon className={`h-8 w-8 text-${solution.color} mx-auto mb-2`} />
                              <div className="text-2xl font-black text-foreground mb-1">{stat.value}</div>
                              <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {solution.detailedInfo?.benefits && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-foreground">Key Benefits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {solution.detailedInfo.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className={`h-5 w-5 text-${solution.color} flex-shrink-0`} />
                            <span className="text-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technology */}
                  {solution.detailedInfo?.technology && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-foreground">Technology Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {solution.detailedInfo.technology.map((tech, index) => (
                          <span 
                            key={index}
                            className={`px-3 py-1 bg-${solution.color}/20 text-${solution.color} rounded-full text-sm font-medium`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-foreground">Core Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {solution.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className={`h-5 w-5 text-${solution.color} flex-shrink-0`} />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </section>
  );
};