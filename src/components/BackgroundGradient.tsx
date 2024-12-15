import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BackgroundGradientProps {
  className?: string;
  children?: ReactNode;
  currentSection: string;
}

const gradientVariants = {
  home: {
    overlay: "bg-gradient-to-br from-slate-50 via-slate-100 to-zinc-200",
    accent1: "bg-slate-200/40",
    accent2: "bg-zinc-300/30",
    accent3: "bg-slate-400/20"
  },
  services: {
    overlay: "bg-gradient-to-br from-zinc-50 via-slate-100 to-slate-200",
    accent1: "bg-slate-300/40",
    accent2: "bg-zinc-200/30",
    accent3: "bg-slate-300/20"
  },
  expertise: {
    overlay: "bg-gradient-to-br from-slate-100 via-zinc-100 to-slate-200",
    accent1: "bg-zinc-300/40",
    accent2: "bg-slate-200/30",
    accent3: "bg-zinc-200/20"
  },
  team: {
    overlay: "bg-gradient-to-br from-zinc-50 via-slate-100 to-zinc-200",
    accent1: "bg-slate-200/40",
    accent2: "bg-zinc-300/30",
    accent3: "bg-slate-300/20"
  },
  contact: {
    overlay: "bg-gradient-to-br from-slate-100 via-zinc-100 to-slate-200",
    accent1: "bg-zinc-200/40",
    accent2: "bg-slate-300/30",
    accent3: "bg-zinc-200/20"
  }
};

export function BackgroundGradient({ className = '', children, currentSection }: BackgroundGradientProps) {
  const currentGradient = gradientVariants[currentSection as keyof typeof gradientVariants] || gradientVariants.home;

  return (
    <div className="relative">
      {/* Base gradient overlay with smooth transition */}
      <motion.div 
        className={`absolute inset-0 transition-colors duration-700 ${currentGradient.overlay}`}
        animate={{ opacity: [0.5, 1] }}
        transition={{ duration: 0.7 }}
      />

      {/* Animated gradient accents */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute -top-48 -right-48 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-50 ${currentGradient.accent1}`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className={`absolute top-1/2 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-50 ${currentGradient.accent2}`}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        <motion.div
          className={`absolute -bottom-48 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-50 ${currentGradient.accent3}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-slate-200/[0.02] bg-[size:20px_20px]" />
      
      {/* Content */}
      <div className={`relative ${className}`}>
        {children}
      </div>
    </div>
  );
}
