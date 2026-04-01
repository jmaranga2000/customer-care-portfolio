"use client";

import { motion, useMotionValue } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { ReactNode } from "react";

/* =========================
   TYPES
========================= */

type InputProps = {
  label: string;
  placeholder: string;
};

type TextareaProps = {
  label: string;
  placeholder: string;
};

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
};

/* =========================
   MAIN COMPONENT
========================= */

export default function Contact() {
  return (
    <section className="relative py-20 md:py-28 w-full overflow-hidden">
      
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] -translate-x-1/2 bg-emerald-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="container-custom w-full">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            Let’s Work Together
          </h2>
          <p className="text-muted mt-2 max-w-md mx-auto">
            Ready to deliver exceptional customer experiences for your business.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 w-full">
          
          {/* 📩 FORM */}
          <motion.form
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="card w-full space-y-6"
          >
            <Input label="Full Name" placeholder="John Doe" />
            <Input label="Email" placeholder="you@email.com" />
            <Input label="Subject" placeholder="Project Inquiry" />
            <Textarea label="Message" placeholder="Write your message..." />

            <MagneticButton />

            <motion.a
              href="https://wa.me/254750468852?text=Hello%20I%20am%20interested%20in%20your%20customer%20care%20services"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black transition"
            >
              💬 Chat on WhatsApp
            </motion.a>
          </motion.form>

          {/* 📞 INFO */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-5 md:space-y-6 w-full"
          >
            <InfoCard icon={<Mail />} title="Email" value="your@email.com" />
            <InfoCard icon={<Phone />} title="Phone" value="+254 XXX XXX XXX" />
            <InfoCard icon={<MapPin />} title="Location" value="Nairobi, Kenya" />
            <InfoCard icon={"💬"} title="WhatsApp" value="+254 750 468852" />

            <div className="card mt-6 md:mt-10 text-center w-full">
              <p className="text-muted mb-4">
                Available for freelance & full-time roles
              </p>
              <button className="btn-outline w-full">
                Download CV
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   INPUT
========================= */

function Input({ label, placeholder }: InputProps) {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-gray-800 focus:border-emerald-400 focus:outline-none transition"
      />
    </div>
  );
}

/* =========================
   TEXTAREA
========================= */

function Textarea({ label, placeholder }: TextareaProps) {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-400">{label}</label>
      <textarea
        rows={5}
        placeholder={placeholder}
        className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-gray-800 focus:border-emerald-400 focus:outline-none transition"
      />
    </div>
  );
}

/* =========================
   INFO CARD
========================= */

function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card w-full flex items-center gap-4"
    >
      <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
        {icon}
      </div>
      <div>
        <h4 className="text-sm text-gray-400">{title}</h4>
        <p className="font-medium">{value}</p>
      </div>
    </motion.div>
  );
}

/* =========================
   BUTTON
========================= */

function MagneticButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.button
      type="button"
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
      className="btn-primary w-full mt-4"
    >
      Send Message
    </motion.button>
  );
}