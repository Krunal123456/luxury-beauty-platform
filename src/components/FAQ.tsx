"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you provide on-venue makeup services?",
    answer: "Yes, we travel to venues across Maharashtra for bridal bookings. Travel and accommodation charges may apply depending on the location."
  },
  {
    question: "Which makeup products do you use?",
    answer: "We strictly use premium, high-end international brands such as MAC, Huda Beauty, NARS, Charlotte Tilbury, Bobbi Brown, and Estée Lauder to ensure a flawless, long-lasting finish."
  },
  {
    question: "Do you offer makeup trials before booking?",
    answer: "Yes, paid bridal trials are available at our studio. If you confirm the booking, the trial fee is adjusted against your final bridal package."
  },
  {
    question: "How early should I book my bridal makeup?",
    answer: "We recommend booking at least 3-6 months in advance, especially during peak wedding seasons (November to February and April to May) to secure your date."
  },
  {
    question: "Does the bridal package include hairstyling and draping?",
    answer: "Absolutely. All our bridal packages are comprehensive and include expert hairstyling, customized extensions if needed, and traditional or modern saree/lehenga draping."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-card border-t border-border" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Details</span>
            <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl mb-6 text-foreground"
          >
            Frequently Asked <span className="italic text-primary">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border transition-colors duration-300 ${openIndex === i ? 'border-primary/50 bg-background/50' : 'border-border bg-background'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-heading text-xl pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
