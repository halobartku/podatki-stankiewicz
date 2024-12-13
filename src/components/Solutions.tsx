'use client'

import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, ReactNode } from "react";
import { Button } from "./ui/button";
import { BackgroundGradient } from './BackgroundGradient';

const expertiseHighlights = [
  {
    title: "Jolanta Stankiewicz",
    subtitle: "Ekspert Prawa Podatkowego",
    description: "Ponad 40 lat doświadczenia w Urzędzie Skarbowym oraz sektorze prywatnym. Dogłębna znajomość procedur podatkowych i interpretacji przepisów z perspektywy obu stron.",
    color: "from-[#862B44]/20 to-[#A13553]/10"
  },
  {
    title: "Skuteczność w Trudnych Sprawach",
    description: "Wieloletnie doświadczenie w rozwiązywaniu skomplikowanych spraw podatkowych, które wydawały się niemożliwe do rozstrzygnięcia. Specjalizacja w sprawach wymagających głębokiej analizy i niestandardowego podejścia.",
    color: "from-[#862B44]/15 to-[#A13553]/5"
  },
  {
    title: "Unikalna Perspektywa",
    description: "Doświadczenie zdobyte w Urzędzie Skarbowym pozwala na skuteczne przewidywanie potencjalnych problemów i ich wyprzedzanie, zanim staną się poważnymi wyzwaniami dla klienta.",
    color: "from-[#862B44]/10 to-[#A13553]/5"
  }
];

const specializations = [
  {
    title: "Trudne Sprawy Podatkowe",
    description: "Specjalizacja w rozwiązywaniu skomplikowanych spraw podatkowych, które inni uznali za beznadziejne."
  },
  {
    title: "Kontrole Skarbowe",
    description: "Profesjonalne wsparcie podczas kontroli skarbowych, wykorzystując doświadczenie z pracy w Urzędzie Skarbowym."
  },
  {
    title: "Optymalizacja Podatkowa",
    description: "Legalne metody optymalizacji podatkowej oparte na dogłębnej znajomości przepisów i ich interpretacji."
  },
  {
    title: "Reprezentacja Prawna",
    description: "Skuteczna reprezentacja przed organami podatkowymi, wsparta 40-letnim doświadczeniem w branży."
  }
];

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const InteractiveCard = ({ children, className = "", delay = 0 }: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        scale: isPressed ? 0.95 : isHovered ? 1.02 : 1,
        x: isHovered ? 5 : 0
      } : {}}
      transition={{ 
        delay: delay,
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      className={`transform transition-all duration-300 ${className} ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      }`}
    >
      {children}
    </motion.div>
  );
};

export function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springOpacity = useSpring(opacity, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#F5E6D3]/30 to-[#862B44]/10 overflow-hidden"
      style={{
        opacity: springOpacity,
        scale: springScale,
        y: springY
      }}
    >
      <BackgroundGradient />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#862B44] to-[#A13553] text-transparent bg-clip-text mb-4 cursor-pointer px-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Doświadczenie, Któremu Możesz Zaufać
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg text-[#862B44] max-w-3xl mx-auto font-medium px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            40 lat praktyki w Urzędzie Skarbowym i sektorze prywatnym
          </motion.p>
        </motion.div>

        {/* Expertise Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16 px-2 sm:px-4">
          {expertiseHighlights.map((highlight, index) => (
            <InteractiveCard
              key={highlight.title}
              delay={index * 0.1}
              className="relative p-6 sm:p-8 rounded-2xl backdrop-blur-sm border border-[#862B44]/10 group cursor-pointer"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${highlight.color} transition-opacity duration-300`} />
              {highlight.subtitle && (
                <p className="relative z-10 text-[#A13553] font-medium mb-2">
                  {highlight.subtitle}
                </p>
              )}
              <h3 className="relative z-10 text-xl font-bold text-[#862B44] mb-4">
                {highlight.title}
              </h3>
              <p className="relative z-10 text-[#862B44] leading-relaxed">
                {highlight.description}
              </p>
            </InteractiveCard>
          ))}
        </div>

        {/* Specializations Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4">
          {specializations.map((spec, index) => (
            <InteractiveCard
              key={spec.title}
              delay={index * 0.1}
              className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm border border-[#862B44]/10 group cursor-pointer hover:bg-gradient-to-br hover:from-white/90 hover:to-white/70"
            >
              <h3 className="text-lg font-bold text-[#862B44] mb-3">
                {spec.title}
              </h3>
              <p className="text-[#862B44] leading-relaxed">
                {spec.description}
              </p>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
