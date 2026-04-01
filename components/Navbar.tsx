"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* =========================
   TYPES
========================= */

type NavItemProps = {
  label: string;
  href: string;
};

type MobileItemProps = {
  label: string;
  href: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/* =========================
   MAIN COMPONENT
========================= */

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300
          ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl border-emerald-500/20 shadow-lg"
              : "bg-black/40 backdrop-blur-md border-transparent"
          }`}
        >
          {/* LOGO */}
          <div className="text-lg font-bold text-gradient">
            CarePro
          </div>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-8 text-sm">
            <NavItem label="Home" href="#" />
            <NavItem label="Skills" href="#skills" />
            <NavItem label="Experience" href="#experience" />
            <NavItem label="Testimonials" href="#testimonials" />
            <NavItem label="Contact" href="#contact" />
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:block px-5 py-2 rounded-full bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition"
          >
            Hire Me
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-emerald-400 text-2xl"
          >
            ☰
          </button>
        </motion.nav>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-emerald-500/20 rounded-b-3xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-bold text-gradient">
                  Menu
                </h2>

                <button
                  onClick={() => setOpen(false)}
                  className="text-2xl text-gray-400"
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-6 text-lg">
                <MobileItem label="Home" href="#" setOpen={setOpen} />
                <MobileItem label="Skills" href="#skills" setOpen={setOpen} />
                <MobileItem label="Experience" href="#experience" setOpen={setOpen} />
                <MobileItem label="Testimonials" href="#testimonials" setOpen={setOpen} />
                <MobileItem label="Contact" href="#contact" setOpen={setOpen} />
              </div>

              {/* CTA */}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-8 block w-full text-center px-6 py-3 rounded-xl bg-emerald-500 text-black font-medium"
              >
                Hire Me
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================
   DESKTOP NAV ITEM
========================= */

function NavItem({ label, href }: NavItemProps) {
  return (
    <li className="group">
      <a
        href={href}
        className="relative text-gray-300 hover:text-emerald-400 transition"
      >
        {label}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
      </a>
    </li>
  );
}

/* =========================
   MOBILE NAV ITEM
========================= */

function MobileItem({ label, href, setOpen }: MobileItemProps) {
  return (
    <a
      href={href}
      onClick={() => setOpen(false)}
      className="text-gray-300 hover:text-emerald-400 transition"
    >
      {label}
    </a>
  );
}