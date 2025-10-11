import { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Trophy,
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-medical-blue/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-4 h-4 bg-medical-blue/30 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-emergency-red/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-16 w-3 h-3 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-medical-blue/40 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent mb-6 emergency-glow">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">READY TO REVOLUTIONIZE</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-accent">Join the</span>
            <br />
            <span className="text-medical-blue">Emergency Revolution</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our AI-powered smart ambulance system is ready for deployment. 
            Partner with us to save lives and transform emergency response in your city.
          </p>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mb-12">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-muted/50 border-border/50 focus:border-medical-blue"
                required
              />
              <Button 
                type="submit"
                className="bg-gradient-medical text-white border-0 hover:shadow-glow-medical"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sent!
                  </div>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-emergency text-white border-0 text-lg px-8 py-4 h-auto group hover:shadow-glow-emergency"
              onClick={() => window.open("https://mgx-rddfl1mut4j.mgx.world", "_blank")}
            >
              <Trophy className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Request Demo
            </Button>
            <Button variant="outline" size="lg" className="border-medical-blue text-medical-blue hover:bg-medical-blue/10 text-lg px-8 py-4 h-auto">
              Partnership Inquiry
            </Button>
          </div>
        </div>

        {/* Team & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Team Info */}
          <div className="medical-card p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="h-8 w-8 text-medical-blue" />
              <h3 className="text-2xl font-black text-foreground">
                Team Deadlock
              </h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              A passionate team of developers and healthcare innovators dedicated to 
              saving lives through technology.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-medical-blue">4</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">2+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-emergency-red">∞</div>
                  <div className="text-sm text-muted-foreground">Determination</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" size="sm" className="border-medical-blue/30 hover:bg-medical-blue/10">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-medical-blue/30 hover:bg-medical-blue/10">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="medical-card p-8">
            <h3 className="text-2xl font-black text-foreground mb-6 text-center">
              Get In Touch
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-medical-blue/20 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-medical-blue" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-muted-foreground">adityam3605@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Phone</div>
                  <div className="text-muted-foreground">+91 8302833123 DEADLOCK</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emergency-red/20 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-emergency-red" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Location</div>
                  <div className="text-muted-foreground">Sahyadri College of engineering and management<br />Adyar, Mangaluru</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-muted/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                <span className="text-medical-blue font-semibold">Available 24/7</span> for emergency consultations
                <br />
                Because lives don't wait for business hours
              </p>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mt-16">
          <div className="medical-card p-8 max-w-2xl mx-auto bg-gradient-to-br from-medical-blue/5 to-accent/5">
            <h4 className="text-2xl font-black mb-4 text-foreground">
              <span className="text-emergency-red">Every second</span> we wait,
              <span className="text-medical-blue"> lives are at risk.</span>
            </h4>
            <p className="text-muted-foreground text-lg">
              Let's work together to make emergency response faster, smarter, and more effective. 
              The future of healthcare is here – let's implement it today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};