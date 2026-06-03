"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageSquare, Send } from "lucide-react";

export const AIConsultantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello beautiful! 💖 I'm your virtual bridal consultant. Tell me about your skin type (eily, dry, combo) and your wedding outfit color, and I'll recommend the perfect look!" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI typing and response
    setTimeout(() => {
      let response = "That sounds stunning! Based on that, I'd highly recommend a Soft Glam with a focus on skin prep to ensure it lasts all day under the lights.";
      if (userMsg.text.toLowerCase().includes("red")) {
        response = "A red outfit is classic! 🌹 A subtle gold eye with a bold red lip or a classic smokey eye with a nude lip would look breathtaking.";
      } else if (userMsg.text.toLowerCase().includes("oily")) {
        response = "For oily skin, we'll use a premium mattifying primer and long-wear setting spray to ensure you stay matte and flawless for 16+ hours! ✨";
      }
      
      setMessages(prev => [...prev, { role: "ai", text: response }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-8 z-[90] w-14 h-14 bg-background border border-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-110 transition-transform"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        <Sparkles className="text-primary w-6 h-6" />
        <span className="absolute -top-12 right-0 bg-card text-foreground border border-border text-xs px-3 py-2 rounded shadow-xl whitespace-nowrap pointer-events-none">
          AI Consultant
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-[100] w-80 sm:w-96 bg-card border border-primary/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary/10 border-b border-primary/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-foreground font-semibold text-sm">Virtual Beauty Consultant</h4>
                  <p className="text-xs text-primary">Powered by AI</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-muted text-foreground border border-border rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your answer..."
                  className="w-full bg-background border border-border rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center disabled:opacity-50 transition-opacity"
                >
                  <Send className="w-4 h-4 text-primary-foreground ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
