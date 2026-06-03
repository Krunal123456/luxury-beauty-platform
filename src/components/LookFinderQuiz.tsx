"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Crown, Heart, Moon, Sun, Camera, Gem } from "lucide-react";

type Question = {
  id: string;
  question: string;
  options: { label: string; icon: React.ElementType; value: string }[];
};

const questions: Question[] = [
  {
    id: "time",
    question: "When is your main event?",
    options: [
      { label: "Daytime Wedding", icon: Sun, value: "day" },
      { label: "Evening Reception", icon: Moon, value: "night" },
    ]
  },
  {
    id: "style",
    question: "What is your preferred makeup style?",
    options: [
      { label: "Soft & Natural", icon: Heart, value: "natural" },
      { label: "Full Glam & Bold", icon: Crown, value: "glam" },
    ]
  },
  {
    id: "focus",
    question: "What feature do you want to highlight most?",
    options: [
      { label: "Smokey/Bold Eyes", icon: Camera, value: "eyes" },
      { label: "Flawless Glass Skin", icon: Sparkles, value: "skin" },
    ]
  }
];

export function LookFinderQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 400);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const getRecommendation = () => {
    // Logic to determine result based on answers
    if (answers.style === "glam" && answers.time === "night") {
      return {
        title: "Royal Reception Glam",
        desc: "A show-stopping, ultra-glamorous look with bold eyes and flawless HD finish, perfect for under the spotlight.",
        package: "Royal Bridal Package",
        img: "/portfolio-3.png" // Using the modern reception image
      };
    } else if (answers.style === "natural" && answers.time === "day") {
      return {
        title: "Ethereal Morning Bride",
        desc: "A soft, dewy, glowing aesthetic with pastel tones. Enhances your natural features beautifully under the sun.",
        package: "Blush Package",
        img: "/portfolio-6.png" // Using the soft pastel image
      };
    } else if (answers.focus === "skin") {
      return {
        title: "Flawless Glass-Skin Bride",
        desc: "Focusing on a hyper-realistic, glowing base with airbrush perfection that looks seamless in person and on camera.",
        package: "Classic Bride Package",
        img: "/portfolio-1.png" // Using the South Indian bridal image
      };
    } else {
      return {
        title: "Signature Traditional Glam",
        desc: "The timeless Indian bridal look. Perfectly balanced bold eyes, rich lip color, and traditional styling.",
        package: "Royal Bridal Package",
        img: "/portfolio-5.png" // Using classic red image
      };
    }
  };

  return (
    <section className="py-24 bg-card border-t border-border relative overflow-hidden" id="quiz">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Interactive</span>
            <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl mb-6 text-foreground"
          >
            Find Your <span className="italic text-primary">Signature Look</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Take our quick 3-step styling quiz to discover the perfect makeup aesthetic and package tailored to your unique preferences.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-background border border-border p-8 md:p-12 shadow-2xl relative"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-sm font-semibold tracking-widest text-primary uppercase">Step {currentStep + 1} of {questions.length}</span>
                  <div className="flex gap-2">
                    {questions.map((_, i) => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i <= currentStep ? 'w-8 bg-primary' : 'w-4 bg-muted'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="font-heading text-3xl mb-10 text-foreground">{questions[currentStep].question}</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {questions[currentStep].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(questions[currentStep].id, option.value)}
                      className={`p-6 border text-left transition-all duration-300 group flex flex-col gap-4 ${
                        answers[questions[currentStep].id] === option.value 
                          ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <option.icon className={`w-8 h-8 ${answers[questions[currentStep].id] === option.value ? 'text-primary' : 'text-muted-foreground group-hover:text-primary transition-colors'}`} />
                      <span className={`font-heading text-xl ${answers[questions[currentStep].id] === option.value ? 'text-primary' : 'text-foreground'}`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-background border border-primary/50 p-1 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden"
              >
                <div className="border border-primary/30 p-8 md:p-12 relative z-10 bg-background/90 backdrop-blur-sm h-full flex flex-col md:flex-row gap-10 items-center">
                  
                  {/* Result Content */}
                  <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-2">
                      <Gem className="w-3.5 h-3.5" /> Your Perfect Match
                    </div>
                    <h3 className="font-heading text-4xl text-foreground">{getRecommendation().title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {getRecommendation().desc}
                    </p>
                    
                    <div className="pt-4 space-y-4">
                      <div className="text-sm font-semibold tracking-widest uppercase text-foreground">
                        Recommended: <span className="text-primary">{getRecommendation().package}</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <a 
                          href={`https://wa.me/918857075984?text=Hi!%20I%20took%20your%20Look%20Finder%20Quiz.%20My%20result%20was:%20${getRecommendation().title}.%20I'd%20love%20to%20know%20more!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg"
                        >
                          Book This Look <ArrowRight className="w-4 h-4" />
                        </a>
                        <button 
                          onClick={resetQuiz}
                          className="border border-border text-foreground hover:bg-muted px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-colors"
                        >
                          Retake Quiz
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Result Image */}
                  <div className="w-full md:w-[280px] shrink-0">
                    <div className="aspect-[4/5] relative overflow-hidden shadow-2xl border border-primary/20">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${getRecommendation().img})` }}
                      />
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
