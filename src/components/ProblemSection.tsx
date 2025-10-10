import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Clock, MapPin, Hospital, Users, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Traffic Delays Kill",
    description: "Ambulances stuck in traffic cause deadly delays",
    stat: "8 minutes",
    statLabel: "average delay in traffic",
    color: "emergency-red"
  },
  {
    icon: Hospital,
    title: "Unprepared Hospitals",
    description: "Lack of real-time patient monitoring leaves hospitals unprepared",
    stat: "60%",
    statLabel: "of critical time lost",
    color: "medical-blue"
  },
  {
    icon: MapPin,
    title: "Manual Call Handling",
    description: "Manual emergency call handling slows response time",
    stat: "5 minutes",
    statLabel: "wasted on call processing",
    color: "accent"
  },
  {
    icon: TrendingDown,
    title: "No Real-Time Data",
    description: "Hospitals only get patient info after arrival",
    stat: "0%",
    statLabel: "preparation time available",
    color: "emergency-red"
  },
  {
    icon: Users,
    title: "Public Unawareness",
    description: "Public unawareness worsens emergency situations",
    stat: "40%",
    statLabel: "delayed by bystanders",
    color: "medical-blue"
  }
];

export const ProblemSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate items in sequence
            problems.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 200);
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emergency-red/20 border border-emergency-red/30 rounded-full text-emergency-red mb-6">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-semibold">CRITICAL PROBLEMS</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground">
            Every <span className="text-emergency-red">Second</span> Counts
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Current emergency response systems are failing when lives are at stake. 
            Here's what's wrong with today's approach:
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            const isVisible = visibleItems.includes(index);
            
            return (
              <div
                key={index}
                className={`medical-card-glow p-8 text-center group transition-all duration-700 transform ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon with Pulse Effect */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-${problem.color}/20 group-hover:bg-${problem.color}/30 transition-all duration-300`}>
                  <Icon className={`h-8 w-8 text-${problem.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-medical-blue transition-colors">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {problem.description}
                </p>

                {/* Stat */}
                <div className="border-t border-border pt-6">
                  <div className={`text-3xl font-black text-${problem.color} mb-1`}>
                    {problem.stat}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {problem.statLabel}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-${problem.color}/20 to-transparent pointer-events-none`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="medical-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              <span className="text-emergency-red">Lives are lost</span> because of these delays
            </h3>
            <p className="text-muted-foreground">
              It's time for a revolutionary solution that puts AI and IoT technology 
              at the heart of emergency response.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};