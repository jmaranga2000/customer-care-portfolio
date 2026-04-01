"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";

/* =========================
   TYPES
========================= */

type Testimonial = {
  name: string;
  role: string;
  image: string;
  message: string;
  rating: number;
};

type CardProps = {
  item: Testimonial;
  position: number;
};

/* =========================
   DATA
========================= */

const testimonials: Testimonial[] = [
  {
    name: "Jane Mwangi",
    role: "Customer",
    image: "/client1.jpeg",
    message:
      "Very professional and patient. My issue was resolved quickly and efficiently.",
    rating: 5,
  },
  {
    name: "David Otieno",
    role: "Supervisor",
    image: "/client2.jpeg",
    message:
      "Excellent communication and dedication to customer satisfaction.",
    rating: 5,
  },
  {
    name: "Brian Kamau",
    role: "Client",
    image: "/client3.jpeg",
    message:
      "One of the best support experiences I've had. Highly recommended.",
    rating: 5,
  },
];

/* =========================
   MAIN COMPONENT
========================= */

export default function Testimonials() {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 md:py-28 w-full overflow-hidden">
      
      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] -translate-x-1/2 bg-emerald-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="container-custom w-full text-center">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            Testimonials
          </h2>
          <p className="text-muted mt-2 max-w-md mx-auto">
            Real feedback from clients and teams I&apos;ve worked with.
          </p>
        </motion.div>

        {/* ✅ MOBILE: SIMPLE CARD */}
        <div className="block md:hidden">
          <MobileCard item={testimonials[index]} />
        </div>

        {/* ✅ DESKTOP: STACK */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full max-w-3xl h-[320px]">
            <AnimatePresence mode="popLayout">
              {testimonials.map((item, i) => {
                const position =
                  (i - index + testimonials.length) %
                  testimonials.length;

                return (
                  <Card key={i} item={item} position={position} />
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-emerald-400" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   📱 MOBILE CARD
========================= */

function MobileCard({ item }: { item: Testimonial }) {
  return (
    <div className="card w-full max-w-md mx-auto p-6 text-center">
      
      <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border border-emerald-400">
        <Image
          src={item.image}
          alt={item.name}
          width={64}
          height={64}
          className="object-cover"
        />
      </div>

      <div className="flex justify-center mb-3">
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star
            key={i}
            className="text-emerald-400 fill-emerald-400"
            size={16}
          />
        ))}
      </div>

      <p className="text-gray-200 italic text-sm">
        “{item.message}”
      </p>

      <h4 className="mt-4 font-semibold">{item.name}</h4>
      <p className="text-sm text-gray-400">{item.role}</p>
    </div>
  );
}

/* =========================
   🧊 DESKTOP CARD
========================= */

function Card({ item, position }: CardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const styles = [
    { scale: 1, opacity: 1, zIndex: 3, y: 0 },
    { scale: 0.9, opacity: 0.5, zIndex: 2, y: 20 },
    { scale: 0.8, opacity: 0.3, zIndex: 1, y: 40 },
  ];

  const style = styles[position] || { opacity: 0 };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ...style,
      }}
      animate={style}
      transition={{ duration: 0.6 }}
      className="absolute w-full"
    >
      <div className="card relative text-center p-8">
        
        <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-2xl" />

        <div className="relative z-10">
          
          <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border border-emerald-400">
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>

          <div className="flex justify-center mb-3">
            {Array.from({ length: item.rating }).map((_, i) => (
              <Star
                key={i}
                className="text-emerald-400 fill-emerald-400"
                size={18}
              />
            ))}
          </div>

          <p className="text-gray-200 italic">
            “{item.message}”
          </p>

          <h4 className="mt-4 font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-400">{item.role}</p>
        </div>
      </div>
    </motion.div>
  );
}