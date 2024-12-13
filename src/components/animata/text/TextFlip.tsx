"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TextFlip() {
  const words = [
    'dla Osób Prywatnych',
    'dla Firm',
    'dla Przedsiębiorców',
    'dla Spółek',
    'dla Rolników',
    'dla Fundacji',
    'dla Prawników',
    'dla Lekarzy',
    'dla Małych i Dużych',
    'dla Każdego',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex flex-col items-center text-center gap-0 text-4xl font-bold lg:text-5xl">
      <h1 className="text-primary-500 whitespace-nowrap text-[2rem] sm:text-4xl lg:text-5xl leading-tight font-bold">
        Kancelaria Podatkowa
      </h1>
      <h1 className="text-primary-500 whitespace-nowrap text-[2rem] sm:text-4xl lg:text-5xl leading-tight font-bold">
        Stankiewicz
      </h1>
      <div className="flex items-center justify-center w-full overflow-hidden pt-0 pb-4" style={{ minHeight: '100px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={words[currentIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center w-full"
          >
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text animate-gradient-x text-[2rem] sm:text-4xl lg:text-5xl whitespace-nowrap" style={{ lineHeight: '1.8' }}>
              {words[currentIndex]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
