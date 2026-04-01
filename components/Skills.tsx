"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Headphones,
  MessageCircle,
  Wrench,
  BarChart3,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

/* =========================
   TYPES
========================= */

type Skill = {
  title: string;
  icon: LucideIcon;
  level: number;
};

type SkillCardProps = {
  skill: Skill;
};

/* =========================
   DATA
========================= */

const skills: Skill[] = [
  { title: "Communication", icon: MessageCircle, level: 95 },
  { title: "Customer Support", icon: Headphones, level: 92 },
  { title: "Problem Solving", icon: Wrench, level: 90 },
  { title: "Customer Retention", icon: BarChart3, level: 88 },
  { title: "Time Management", icon: Clock, level: 93 },
  { title: "Reliability", icon: ShieldCheck, level: 96 },
];

/* =========================
   MAIN COMPONENT
========================= */

export default function Skills() {
  return (
    <section className="relative py-20 w-full">
      
      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom w-full">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            Core Skills
          </h2>
          <p className="text-muted mt-2 max-w-md mx-auto md:mx-0">
            Built on experience, refined through real customer interactions.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full">
          {skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   🧊 SKILL CARD
========================= */

function SkillCard({ skill }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // Disable tilt on small screens
    if (window.innerWidth < 768) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="relative group w-full"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition rounded-2xl" />

      <div className="card w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Icon */}
        <div className="p-4 rounded-full bg-emerald-500/10 mb-4 glow-sm">
          <Icon className="text-emerald-400" size={26} />
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold">
          {skill.title}
        </h3>

        {/* Progress */}
        <div className="relative mt-6 w-20 h-20 md:w-24 md:h-24">
          
          <svg className="w-full h-full rotate-[-90deg]">
            <circle
              cx="50%"
              cy="50%"
              r="40"
              stroke="#1f2937"
              strokeWidth="6"
              fill="transparent"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="40"
              stroke="url(#grad)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={251}
              initial={{ strokeDashoffset: 251 }}
              whileInView={{
                strokeDashoffset:
                  251 - (251 * skill.level) / 100,
              }}
              transition={{ duration: 1.5 }}
            />

            <defs>
              <linearGradient id="grad">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* % */}
          <div className="absolute inset-0 flex items-center justify-center text-xs md:text-sm">
            {skill.level}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}