import { useState, useEffect, useRef } from "react";
import { 
  Cpu, 
  Wifi, 
  Cloud, 
  Brain, 
  Map,
  Smartphone,
  Database,
  Shield,
  Zap
} from "lucide-react";

const techStack = [
  {
    category: "IoT Sensors",
    icon: Wifi,
    color: "medical-blue",
    technologies: [
      {
        name: "ECG Monitors",
        description: "Real-time heart activity monitoring"
      },
      {
        name: "Blood Pressure Sensors",
        description: "Continuous BP measurement"
      },
      {
        name: "Pulse Oximeters",
        description: "Oxygen saturation tracking"
      },
      {
        name: "Temperature Sensors",
        description: "Body temperature monitoring"
      }
    ]
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    color: "accent",
    technologies: [
      {
        name: "Computer Vision",
        description: "Ambulance detection & traffic analysis"
      },
      {
        name: "Predictive Models",
        description: "Traffic pattern prediction"
      },
      {
        name: "NLP Processing",
        description: "Emergency call analysis"
      },
      {
        name: "Deep Learning",
        description: "Real-time decision making"
      }
    ]
  },
  {
    category: "Smart Routing",
    icon: Map,
    color: "emergency-red",
    technologies: [
      {
        name: "Google Maps API",
        description: "Real-time navigation data"
      },
      {
        name: "Traffic Analytics",
        description: "Live traffic condition analysis"
      },
      {
        name: "Route Optimization",
        description: "Dynamic path calculation"
      },
      {
        name: "GPS Integration",
        description: "Precise location tracking"
      }
    ]
  },
  {
    category: "Cloud Infrastructure",
    icon: Cloud,
    color: "medical-blue",
    technologies: [
      {
        name: "Firebase/AWS",
        description: "Scalable cloud platform"
      },
      {
        name: "Real-time Database",
        description: "Live data synchronization"
      },
      {
        name: "WebSocket APIs",
        description: "Instant communication"
      },
      {
        name: "Edge Computing",
        description: "Low-latency processing"
      }
    ]
  },
  {
    category: "Communication",
    icon: Smartphone,
    color: "accent",
    technologies: [
      {
        name: "Google Dialogflow",
        description: "AI-powered call handling"
      },
      {
        name: "Push Notifications",
        description: "Instant hospital alerts"
      },
      {
        name: "SMS Integration",
        description: "Emergency messaging"
      },
      {
        name: "Voice Recognition",
        description: "Multi-language support"
      }
    ]
  },
  {
    category: "Security & Compliance",
    icon: Shield,
    color: "emergency-red",
    technologies: [
      {
        name: "HIPAA Compliance",
        description: "Healthcare data protection"
      },
      {
        name: "End-to-End Encryption",
        description: "Secure data transmission"
      },
      {
        name: "Blockchain Logging",
        description: "Immutable audit trails"
      },
      {
        name: "Multi-Factor Auth",
        description: "Secure system access"
      }
    ]
  }
];

export const TechStackSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            techStack.forEach((_, index) => {
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

  // Auto-rotate active category
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % techStack.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-blue/20 border border-medical-blue/30 rounded-full text-medical-blue mb-6 medical-glow">
            <Cpu className="h-4 w-4" />
            <span className="text-sm font-semibold">TECHNOLOGY STACK</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-medical-blue">Cutting-Edge</span> Technology
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built on proven, enterprise-grade technologies that ensure reliability, 
            scalability, and security for critical emergency response systems.
          </p>
        </div>

        {/* Technology Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {techStack.map((category, index) => {
            const Icon = category.icon;
            const isVisible = visibleItems.includes(index);
            const isActive = activeCategory === index;
            
            return (
              <div
                key={index}
                className={`medical-card-glow p-8 transition-all duration-700 hover:shadow-glow-intense ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                } ${isActive ? 'ring-2 ring-' + category.color + '/50' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveCategory(index)}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-${category.color}/20 transition-all duration-500 ${isActive ? `shadow-glow-medical bg-${category.color}/30` : ''}`}>
                    <Icon className={`h-7 w-7 text-${category.color} transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                  </div>
                  <h3 className="text-2xl font-black text-foreground">
                    {category.category}
                  </h3>
                </div>

                {/* Technologies List */}
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div 
                      key={techIndex}
                      className={`flex flex-col gap-1 p-3 rounded-lg bg-muted/30 transition-all duration-300 hover:bg-muted/50 ${
                        isActive ? 'translate-x-1' : ''
                      }`}
                      style={{ transitionDelay: `${techIndex * 50}ms` }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-${category.color}`} />
                        <span className="font-semibold text-foreground text-sm">
                          {tech.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground ml-4 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-${category.color} animate-pulse`} />
                )}

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-xl opacity-0 hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-${category.color}/20 to-transparent pointer-events-none`} />
              </div>
            );
          })}
        </div>

        {/* Architecture Overview */}
        <div className="mt-16 medical-card p-12 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="h-8 w-8 text-accent" />
            <h3 className="text-3xl font-black text-foreground">
              System Architecture
            </h3>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            Our microservices architecture ensures high availability, scalability, and 
            fault tolerance for mission-critical emergency response operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Edge Layer",
                description: "IoT sensors and ambulance systems for real-time data collection",
                icon: Wifi,
                color: "medical-blue"
              },
              {
                title: "Processing Layer", 
                description: "AI/ML models for traffic prediction and emergency call analysis",
                icon: Brain,
                color: "accent"
              },
              {
                title: "Application Layer",
                description: "Hospital dashboards and traffic control interfaces",
                icon: Database,
                color: "emergency-red"
              }
            ].map((layer, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${layer.color}/20 mb-4`}>
                  <layer.icon className={`h-8 w-8 text-${layer.color}`} />
                </div>
                <h4 className="text-lg font-bold mb-2 text-foreground">
                  {layer.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {layer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};