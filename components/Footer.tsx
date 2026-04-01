"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-emerald-500/10 overflow-hidden">
      
      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 bottom-0 w-[500px] h-[500px] -translate-x-1/2 bg-emerald-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="container-custom py-16">
        
        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* 🧠 BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-gradient">
              CarePro
            </h3>

            <p className="text-muted mt-4">
              Delivering exceptional customer experiences through empathy,
              communication, and reliability.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/254750468852?text=Hello%20I%20am%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-5 py-2 rounded-full bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition"
            >
              💬 Chat on WhatsApp
            </a>
          </motion.div>

          {/* 🧭 QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-lg font-semibold mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2 text-gray-400">
              <li><a href="#">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </motion.div>

          {/* ⭐ TESTIMONIAL SNIPPET (NEW) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-lg font-semibold mb-4">
              Testimonial
            </h4>

            {/* Stars */}
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-emerald-400 fill-emerald-400"
                />
              ))}
            </div>

            <p className="text-sm text-gray-300 italic">
              “Very professional and patient. My issue was resolved quickly and efficiently.”
            </p>

            <p className="text-xs text-gray-400 mt-2">
              — Jane Mwangi, Client
            </p>
          </motion.div>

          {/* 📞 CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold mb-4">
              Contact
            </h4>

            <div className="flex items-center gap-3 text-gray-400">
              <Mail size={16} />
              your@email.com
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <Phone size={16} />
              +254 XXX XXX XXX
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={16} />
              Nairobi, Kenya
            </div>
          </motion.div>
        </div>

        {/* 🔻 BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          
          <p>
            © {new Date().getFullYear()} CarePro. All rights reserved.
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-emerald-400 transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-emerald-400 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-emerald-400 transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}