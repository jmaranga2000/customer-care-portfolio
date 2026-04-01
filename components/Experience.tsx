"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Building2, ChevronDown } from "lucide-react";

/* =========================
   TYPES
========================= */

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
};

type TimelineItemProps = {
  exp: ExperienceItem;
  index: number;
};

/* =========================
   DATA
========================= */

const experiences: ExperienceItem[] = [
  {
    role: "Customer Support Agent",
    company: "XYZ Company",
    period: "2023 – Present",
    description:
      "Handled customer inquiries across multiple channels while maintaining high satisfaction.",
    achievements: [
      "Resolved 50+ tickets daily",
      "Maintained 95% customer satisfaction",
      "Reduced response time by 30%",
    ],
  },
  {
    role: "Call Center Representative",
    company: "ABC Ltd",
    period: "2022 – 2023",
    description:
      "Managed inbound calls and supported billing/account-related issues.",
    achievements: [
      "Handled 100+ calls per day",
      "Improved first-call resolution rate",
      "Delivered consistent service quality",
    ],
  },
  {
    role: "Customer Service Intern",
    company: "Tech Solutions",
    period: "2021 – 2022",
    description:
      "Supported onboarding and handled basic technical support queries.",
    achievements: [
      "Assisted in onboarding 200+ users",
      "Reduced onboarding issues by 25%",
    ],
  },
];

/* =========================
   MAIN COMPONENT
========================= */

export default function Experience() {
  return (
    <section className="relative py-20 md:py-24 w-full">
      
      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom w-full">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-14 md:mb-20 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            Experience
          </h2>
          <p className="text-muted mt-2 max-w-md mx-auto md:mx-0">
            Proven results through real customer interactions and measurable impact.
          </p>
        </motion.div>

        {/* Timeline Wrapper */}
        <div className="relative">
          
          {/* ✅ Vertical line (ONLY DESKTOP) */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5 }}
            className="hidden md:block absolute left-6 top-0 w-[2px] bg-gradient-to-b from-emerald-500 via-emerald-400 to-transparent"
          />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   📍 TIMELINE ITEM
========================= */

function TimelineItem({ exp, index }: TimelineItemProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative flex flex-col md:flex-row items-start gap-4 md:gap-6"
    >
      {/* ✅ NODE (ONLY DESKTOP) */}
      <div className="hidden md:block relative z-10">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400 glow-sm">
          <Briefcase className="text-emerald-400" size={18} />
        </div>
      </div>

      {/* ✅ CARD FULL WIDTH */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="card w-full cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h3 className="text-base md:text-lg font-semibold">
              {exp.role}
            </h3>

            <div className="flex items-center gap-2 text-emerald-400 text-sm mt-1">
              <Building2 size={16} />
              {exp.company}
            </div>
          </div>

          <span className="text-xs sm:text-sm text-gray-400">
            {exp.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-muted text-sm mt-3">
          {exp.description}
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-2 text-xs text-emerald-400 mt-4">
          <span>View impact</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown size={14} />
          </motion.div>
        </div>

        {/* Expand */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <ul className="mt-4 space-y-2">
            {exp.achievements.map((item, i) => (
              <li
                key={i}
                className="text-sm text-gray-300 flex items-start gap-2"
              >
                <span className="text-emerald-400">✔</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}