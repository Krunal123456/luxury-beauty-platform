"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, ArrowRight } from "lucide-react";

export function Academy() {
  const courses = [
    {
      title: "Pro Bridal Masterclass",
      duration: "6 Weeks",
      level: "Professional",
      desc: "Learn the secrets of flawless 24-hour HD and Airbrush bridal makeup. Ideal for aspiring artists wanting to master traditional and modern bridal looks.",
      icon: Award
    },
    {
      title: "Self-Grooming Intensive",
      duration: "3 Days",
      level: "Beginner",
      desc: "Master your own face. Learn everyday glam, party makeup, and skincare prep tailored specifically to your skin type and features.",
      icon: GraduationCap
    }
  ];

  return (
    <section className="py-24 bg-card border-t border-border relative overflow-hidden" id="academy">
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-4"
            >
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">Education</span>
              <div className="h-[1px] w-12 bg-primary/40" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl mb-6 text-foreground"
            >
              The Makeup <span className="italic text-primary">Academy</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Learn from the best. Our academy offers intensive, hands-on training for aspiring artists and makeup enthusiasts. Master the techniques that create our signature flawless looks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="https://wa.me/918857075984?text=Hi!%20I'm%20interested%20in%20enrolling%20in%20the%20Makeup%20Academy."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b-2 border-primary text-foreground hover:text-primary pb-1 font-semibold tracking-widest uppercase text-sm transition-colors"
              >
                Download Syllabus <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Content - Courses */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <div className="space-y-6">
              {courses.map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-background border border-border p-8 hover:border-primary/50 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="w-14 h-14 shrink-0 bg-card border border-border flex items-center justify-center rounded-full group-hover:border-primary transition-colors">
                      <course.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl text-foreground mb-2">{course.title}</h3>
                      <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {course.duration}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {course.desc}
                      </p>
                      <a 
                        href="https://wa.me/918857075984?text=Hi!%20I%20want%20to%20enroll%20in%20the%20${encodeURIComponent(course.title)}."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Enroll Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
