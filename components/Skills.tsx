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
  {
    title: "Communication",
    icon: MessageCircle,
    level: 95,
  },
  {
    title: "Customer Support",
    icon: Headphones,
    level: 92,
  },
  {
    title: "Problem Solving",
    icon: Wrench,
    level: 90,
  },
  {
    title: "Customer Retention",
    icon: BarChart3,
    level: 88,
  },
  {
    title: "Time Management",
    icon: Clock,
    level: 93,
  },
  {
    title: "Reliability",
    icon: ShieldCheck,
    level: 96,
  },
];

/* =========================
   MAIN COMPONENT
========================= */

export default function Skills() {
  return (
    <section className="relative py-20">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient">
            Core Skills
          </h2>
          <p className="text-muted mt-2">
            Built on experience, refined through real customer interactions.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   SKILL CARD
========================= */

function SkillCard({ skill }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
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
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition rounded-2xl" />

      <div className="card relative z-10 flex flex-col items-center text-center">
        
        {/* Icon */}
        <div className="p-4 rounded-full bg-emerald-500/10 mb-4 glow-sm">
          <Icon className="text-emerald-400" size={28} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold">
          {skill.title}
        </h3>

        {/* Radial Progress */}
        <div className="relative mt-6 w-24 h-24">
          
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

          {/* Percentage */}
          <div className="absolute inset-0 flex items-center justify-center text-sm">
            {skill.level}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}