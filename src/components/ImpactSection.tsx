import { useState, useEffect, useRef } from "react";
import { TrendingUp, Heart, Clock, Globe, Award, Users } from "lucide-react";

const impacts = [
  {
    icon: Clock,
    value: "50%",
    title: "Faster Response Time",
    description: "Average emergency response time reduced from 12 to 6 minutes",
    color: "medical-blue"
  },
  {
    icon: Heart,
    value: "85%",
    title: "Lives can be Saved",
    description: "Significant increase in survival rates for critical emergencies",
    color: "emergency-red"
  },
  {
    icon: TrendingUp,
    value: "90%",
    title: "Hospital Preparation",
    description: "Hospitals are fully prepared before ambulance arrival",
    color: "accent"
  },
  {
    icon: Globe,
    value: "100+",
    title: "Cities to be implemented",
    description: "Scalable solution for smart cities worldwide",
    color: "medical-blue"
  },
  {
    icon: Award,
    value: "95%",
    title: "Adoption Rate",
    description: "High potential for government and hospital adoption",
    color: "emergency-red"
  },
  {
    icon: Users,
    value: "1M+",
    title: "Lives Impacted",
    description: "Potential to save millions of lives globally",
    color: "accent"
  }
];

const Counter = ({ end, duration = 2000, isVisible }: { end: string, duration?: number, isVisible: boolean }) => {
  const [count, setCount] = useState("0");
  
  useEffect(() => {
    if (!isVisible) return;
    
    if (end.includes("%")) {
      const numericEnd = parseInt(end);
      let start = 0;
      const increment = numericEnd / (duration / 50);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericEnd) {
          setCount(`${numericEnd}%`);
          clearInterval(timer);
        } else {
          setCount(`${Math.floor(start)}%`);
        }
      }, 50);
      
      return () => clearInterval(timer);
    } else if (end.includes("+")) {
      const numericEnd = end.includes("M") ? 1000000 : parseInt(end);
      let start = 0;
      const increment = numericEnd / (duration / 50);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericEnd) {
          setCount(end);
          clearInterval(timer);
        } else {
          if (end.includes("M")) {
            setCount(`${(start / 1000000).toFixed(1)}M+`);
          } else {
            setCount(`${Math.floor(start)}+`);
          }
        }
      }, 50);
      
      return () => clearInterval(timer);
    } else {
      setCount(end);
    }
  }, [end, duration, isVisible]);
  
  return <span>{count}</span>;
};

export const ImpactSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            impacts.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent mb-6 emergency-glow">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-semibold">GLOBAL IMPACT</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-accent">Transforming</span> Emergency Care
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered solution delivers measurable impact that saves lives 
            and revolutionizes emergency response worldwide.
          </p>
        </div>

        {/* Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            const isVisible = visibleItems.includes(index);
            
            return (
              <div
                key={index}
                className={`medical-card-glow p-8 text-center group transition-all duration-700 hover:shadow-glow-intense ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-${impact.color}/20 group-hover:bg-${impact.color}/30 transition-all duration-300`}>
                  <Icon className={`h-8 w-8 text-${impact.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>

                {/* Value with Counter Animation */}
                <div className={`text-5xl font-black mb-4 text-${impact.color}`}>
                  <Counter end={impact.value} isVisible={isVisible} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {impact.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {impact.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-${impact.color}/20 to-transparent pointer-events-none`} />
              </div>
            );
          })}
        </div>

        {/* Uniqueness Highlights */}
        <div className="medical-card p-12 max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-black mb-6 text-foreground">
            Why Our Solution is <span className="text-medical-blue">Unique</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[
              {
                title: "First Comprehensive AI System",
                description: "Integrates traffic management, patient monitoring, and hospital preparation in one platform"
              },
              {
                title: "Real-Time Everything", 
                description: "Live patient data, instant traffic control, and immediate hospital alerts"
              },
              {
                title: "Globally Scalable",
                description: "Designed for implementation in smart cities worldwide with local adaptation"
              },
              {
                title: "Proven Technology Stack",
                description: "Built on reliable, tested technologies that hospitals and cities trust"
              }
            ].map((item, index) => (
              <div key={index} className="text-left">
                <h4 className="text-xl font-bold mb-2 text-medical-blue">
                  {item.title}
                </h4>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-lg text-muted-foreground">
              <span className="text-accent font-semibold">Ready for immediate deployment</span> in pilot cities with 
              <span className="text-medical-blue font-semibold"> high ROI</span> and 
              <span className="text-emergency-red font-semibold"> life-saving impact.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};