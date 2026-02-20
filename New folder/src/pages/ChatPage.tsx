import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const suggestions = [
  "How do I report online harassment?",
  "What is phishing?",
  "How to secure my social media?",
  "I received a suspicious link",
];

const botResponses: Record<string, string> = {
  default: "I'm Sakhi, your digital safety companion. I can help you with online safety, reporting cyber crimes, and learning about digital threats. How can I help you today?",
  harassment: "If you're experiencing online harassment, here's what you can do:\n\n1. **Document everything** — Take screenshots of all abusive messages.\n2. **Block the harasser** on the platform.\n3. **Report to the platform** using their built-in tools.\n4. **File a complaint** using our Report page.\n5. **Contact authorities** — In India, you can call the Cyber Crime helpline at 1930.\n\nWould you like me to help you file a report?",
  phishing: "**Phishing** is a cyber attack where criminals try to trick you into revealing sensitive information like passwords or credit card numbers.\n\n🔍 **How to identify phishing:**\n- Suspicious email addresses\n- Urgent language (\"Act now!\")\n- Misspelled URLs\n- Requests for personal information\n\n🛡️ **How to protect yourself:**\n- Never click unknown links\n- Verify sender identity\n- Enable 2FA on all accounts\n- Use a password manager",
  social: "Here are key steps to **secure your social media**:\n\n1. 🔒 Set profiles to **private**\n2. 🔑 Enable **two-factor authentication**\n3. 🚫 Don't accept requests from strangers\n4. 📍 Disable **location sharing**\n5. 🔄 Review **app permissions** regularly\n6. 🗑️ Remove old posts with personal info\n\nWhich platform would you like specific guidance for?",
  suspicious: "If you received a **suspicious link**, do NOT click it! Here's what to do:\n\n1. ❌ **Don't click** the link\n2. 📸 **Screenshot** the message\n3. 🔍 Check the URL carefully for misspellings\n4. 🚫 **Block** the sender\n5. 📝 **Report** it on the platform\n\nYou can also check the link safely at virustotal.com. Would you like to report this incident?",
};

function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("harassment") || lower.includes("report")) return botResponses.harassment;
  if (lower.includes("phishing")) return botResponses.phishing;
  if (lower.includes("social") || lower.includes("secure")) return botResponses.social;
  if (lower.includes("suspicious") || lower.includes("link")) return botResponses.suspicious;
  return botResponses.default;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi! I'm Sakhi 🛡️ — your digital safety assistant. Ask me anything about staying safe online.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lang, setLang] = useState("English");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: getBotResponse(text), sender: "bot" },
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-20 pb-4 px-4 flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="gradient-primary rounded-full p-2">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Sakhi AI</h1>
              <span className="text-xs text-success font-medium">● Online</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "English" ? "Tamil" : "English")}
            className="gap-1"
          >
            <Globe className="h-4 w-4" />
            {lang}
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto rounded-xl bg-card border border-border p-4 space-y-4 mb-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === "user" ? "bg-primary/10" : "gradient-primary"}`}>
                    {msg.sender === "user" ? <User className="h-4 w-4 text-primary" /> : <Bot className="h-4 w-4 text-primary-foreground" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <div className="flex items-center gap-2">
              <div className="gradient-primary rounded-full p-1.5">
                <Bot className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="flex gap-1 bg-secondary rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft [animation-delay:0.3s]" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft [animation-delay:0.6s]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1.5 rounded-full transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask Sakhi about digital safety..."
            className="flex-1 rounded-xl border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button onClick={() => sendMessage(input)} className="gradient-primary border-0 rounded-xl px-4">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
