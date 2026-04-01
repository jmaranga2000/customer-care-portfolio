/* eslint-disable react-hooks/purity */
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  x: number;
  y: number;
  targetY: number;
  duration: number;
};

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);

    const generated = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 1000,
      y: Math.random() * 800,
      targetY: Math.random() * 800,
      duration: Math.random() * 10 + 5,
    }));

    setParticles(generated);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between overflow-hidden px-4 md:px-10 py-16">
      
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-emerald-500/10 blur-[150px] rounded-full animate-pulse" />

        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 border border-emerald-500/10 rounded-full animate-spin-slow" />

        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 border border-emerald-400/20 rounded-full animate-spin-reverse" />

        {mounted &&
          particles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full"
              initial={{ x: p.x, y: p.y, opacity: 0 }}
              animate={{
                y: [p.y, p.targetY],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
              }}
            />
          ))}
      </div>

      {/* 🧠 LEFT CONTENT */}
      <div className="w-full md:w-1/2 z-10 text-center md:text-left">
        
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient leading-tight"
        >
          Customer Care <br /> Representative
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-muted text-base sm:text-lg max-w-md mx-auto md:mx-0"
        >
          Delivering exceptional customer experiences through empathy,
          communication, and intelligent problem-solving.
        </motion.p>

        <div className="flex justify-center md:justify-start">
          <MagneticButton />
        </div>
      </div>

      {/* 🖼️ RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative mt-12 md:mt-0 w-full md:w-1/2 flex justify-center"
      >
        <div className="absolute inset-0 bg-emerald-500/30 blur-[80px] rounded-full animate-pulse" />

        <div className="absolute inset-0 border border-emerald-400/20 rounded-full animate-spin-slow" />

        <div className="avatar w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 glow-lg relative z-10">
          <img
            src="/profile.jpeg"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* =========================
   🧲 MAGNETIC BUTTON
========================= */

function MagneticButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.button
      className="btn-primary mt-8"
      style={{ x, y }}
      onMouseMove={(e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((e.clientX - centerX) * 0.2);
        y.set((e.clientY - centerY) * 0.2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      Let’s Connect
    </motion.button>
  );
}