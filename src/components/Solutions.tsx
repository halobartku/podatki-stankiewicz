'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const expertiseHighlights = [
  {
    title: "Jolanta Stankiewicz",
    subtitle: "Ekspert Prawa Podatkowego",
    description: "Ponad 40 lat doświadczenia w Urzędzie Skarbowym oraz sektorze prywatnym. Dogłębna znajomość procedur podatkowych i interpretacji przepisów z perspektywy obu stron.",
    color: "from-primary-100 to-primary-50"
  },
  {
    title: "Skuteczność w Trudnych Sprawach",
    description: "Wieloletnie doświadczenie w rozwiązywaniu skomplikowanych spraw podatkowych, które wydawały się niemożliwe do rozstrzygnięcia. Specjalizacja w sprawach wymagających głębokiej analizy i niestandardowego podejścia.",
    color: "from-primary-50 to-gray-50"
  },
  {
    title: "Unikalna Perspektywa",
    description: "Doświadczenie zdobyte w Urzędzie Skarbowym pozwala na skuteczne przewidywanie potencjalnych problemów i ich wyprzedzanie, zanim staną się poważnymi wyzwaniami dla klienta.",
    color: "from-gray-50 to-primary-50"
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
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), {
    stiffness: 100,
    damping: 20
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), {
    stiffness: 100,
    damping: 20
  });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  }

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-primary-100/50 cursor-pointer overflow-hidden perspective-[1000px]",
        "before:absolute before:inset-0 before:z-10 before:bg-primary-500/0 before:transition-colors before:duration-300",
        "hover:before:bg-primary-500/5",
        "after:absolute after:inset-0 after:z-20 after:rounded-2xl after:opacity-0 after:shadow-[0_4px_16px_rgba(0,0,0,0.08)] after:transition-all after:duration-300 after:ease-out",
        "hover:after:opacity-100 hover:after:shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
        "[&>div.shine]:hover:translate-x-[200%] [&>div.shine]:hover:scale-105",
        className
      )}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
      }}
      whileHover={{ 
        scale: 1.01,
        transition: { 
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${className}`} />
      <div 
        className="shine absolute inset-y-0 -left-[100%] w-1/2 z-20 rotate-[25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transform transition-all duration-500 ease-in-out will-change-transform"
      />
      <motion.div 
        className="relative z-30"
        animate={{ 
          y: isHovered ? -1 : 0,
          scale: isHovered ? 1.005 : 1
        }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 0, 0, -20]);

  const springConfig = { stiffness: 40, damping: 15, restDelta: 0.01 };
  const springOpacity = useSpring(opacity, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-[100dvh] overflow-x-hidden"
      style={{
        opacity: springOpacity,
        scale: springScale,
        y: springY
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-primary-500 mb-4 cursor-pointer px-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            Doświadczenie, Któremu Możesz Zaufać
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg text-primary-500/80 max-w-3xl mx-auto font-medium px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            40 lat praktyki w Urzędzie Skarbowym i sektorze prywatnym
          </motion.p>
        </motion.div>

        {/* Expertise Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2 sm:px-4">
          {expertiseHighlights.map((highlight, index) => (
            <InteractiveCard
              key={highlight.title}
              delay={index * 0.1}
              className={highlight.color}
            >
              <div className="p-6">
                {highlight.subtitle && (
                  <motion.p 
                    className="text-primary-400 font-medium mb-2"
                    whileHover={{ scale: 1.01 }}
                  >
                    {highlight.subtitle}
                  </motion.p>
                )}
                <motion.h3 
                  className="text-xl font-bold text-primary-500 mb-3"
                  whileHover={{ scale: 1.01 }}
                >
                  {highlight.title}
                </motion.h3>
                <motion.p 
                  className="text-primary-500/80 leading-relaxed"
                  whileHover={{ scale: 1.01 }}
                >
                  {highlight.description}
                </motion.p>
              </div>
            </InteractiveCard>
          ))}
        </div>

        {/* Specializations Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4">
          {specializations.map((spec, index) => (
            <InteractiveCard
              key={spec.title}
              delay={index * 0.1}
              className="bg-white"
            >
              <div className="p-4 sm:p-6">
                <motion.h3 
                  className="text-lg font-bold text-primary-500 mb-3"
                  whileHover={{ scale: 1.01 }}
                >
                  {spec.title}
                </motion.h3>
                <motion.p 
                  className="text-primary-500/80 leading-relaxed"
                  whileHover={{ scale: 1.01 }}
                >
                  {spec.description}
                </motion.p>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
