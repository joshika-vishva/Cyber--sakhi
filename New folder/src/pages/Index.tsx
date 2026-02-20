import { motion } from "framer-motion";
import { Shield, MessageCircle, FileText, BookOpen, Lock, Eye, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: MessageCircle,
    title: "AI Safety Assistant",
    description: "Chat with Sakhi AI for instant guidance on digital safety concerns and threats.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    title: "Report & Track Complaints",
    description: "Securely file and monitor your cyber crime complaints with real-time status updates.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: BookOpen,
    title: "Learn & Protect",
    description: "Access curated guides on password security, phishing, social media privacy, and more.",
    color: "bg-info/10 text-info",
  },
];

const trustBadges = [
  { icon: Lock, label: "End-to-End Encrypted" },
  { icon: Eye, label: "100% Confidential" },
  { icon: ShieldCheck, label: "Secure & Verified" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero pt-28 pb-20 px-4">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">Your Digital Safety Companion</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Empowering Women with{" "}
              <span className="gradient-text">Digital Safety</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              CyberSakhi provides AI-powered tools to help you stay safe online. Report crimes, learn about threats, and get instant support — all in one secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/chat">
                <Button size="lg" className="gradient-primary border-0 text-base px-8 shadow-glow">
                  <MessageCircle className="mr-2 h-5 w-5" /> Talk to Sakhi AI
                </Button>
              </Link>
              <Link to="/report">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Report an Incident
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How CyberSakhi Helps You</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Three powerful tools designed to protect, support, and educate you in the digital world.</p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={item} className="glass-card rounded-xl p-6 hover:shadow-glow transition-shadow duration-300">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-3 text-muted-foreground">
                <b.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2026 CyberSakhi. Built with ❤️ for women's digital safety.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
