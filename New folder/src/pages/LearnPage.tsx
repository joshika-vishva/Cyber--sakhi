import { motion } from "framer-motion";
import { BookOpen, Clock, BarChart3, Lock, Fish, Share2, ShieldAlert } from "lucide-react";

const guides = [
  {
    icon: Lock,
    title: "Password Security 101",
    description: "Learn how to create strong passwords and use password managers effectively.",
    duration: "5 min read",
    level: "Beginner",
    category: "Password Security",
  },
  {
    icon: Fish,
    title: "Spot Phishing Attacks",
    description: "Identify suspicious emails, messages, and websites designed to steal your data.",
    duration: "8 min read",
    level: "Intermediate",
    category: "Phishing",
  },
  {
    icon: Share2,
    title: "Social Media Privacy Guide",
    description: "Step-by-step privacy settings for Instagram, Facebook, WhatsApp, and more.",
    duration: "10 min read",
    level: "Beginner",
    category: "Social Media Privacy",
  },
  {
    icon: ShieldAlert,
    title: "Dealing with Online Harassment",
    description: "Know your rights and learn how to document, report, and recover from harassment.",
    duration: "12 min read",
    level: "All Levels",
    category: "Online Harassment",
  },
  {
    icon: Lock,
    title: "Two-Factor Authentication Setup",
    description: "Enable 2FA on all your important accounts for extra security.",
    duration: "6 min read",
    level: "Beginner",
    category: "Password Security",
  },
  {
    icon: Fish,
    title: "UPI & Banking Fraud Prevention",
    description: "Stay safe from digital payment scams and protect your financial accounts.",
    duration: "7 min read",
    level: "Intermediate",
    category: "Phishing",
  },
];

const categories = ["All", "Password Security", "Phishing", "Social Media Privacy", "Online Harassment"];

import { useState } from "react";

const LearnPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? guides : guides.filter((g) => g.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 mb-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Learning Center</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Cyber Safety Guides</h1>
          <p className="text-muted-foreground">Stay informed and protect yourself with our curated resources.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`text-sm px-4 py-2 rounded-full transition-colors ${activeCategory === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-6 hover:shadow-glow transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <g.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{g.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {g.duration}</span>
                <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" /> {g.level}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
