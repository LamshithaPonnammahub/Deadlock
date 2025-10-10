import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ImpactSection } from "@/components/ImpactSection";
import { TechStackSection } from "@/components/TechStackSection";
import { CTASection } from "@/components/CTASection";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Update document title and meta
    document.title = "AI-Powered Smart Ambulance System | Bug Slayers";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Revolutionary AI-powered smart ambulance system for faster emergency response. 50% faster response times, real-time patient monitoring, and smart traffic management.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ImpactSection />
      <TechStackSection />
      <CTASection />
    </div>
  );
};

export default Index;
