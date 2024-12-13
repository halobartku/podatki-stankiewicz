import { ReactNode } from "react";
import { HTMLMotionProps, motion, useSpring, useTransform } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { cn } from "../../../lib/utils";
import logo from "../../../assets/logo.png";
import TextFlip from '../text/TextFlip';
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

interface FeatureCardProps extends HTMLMotionProps<"div"> {
  feature: {
    title: ReactNode;
    category: string;
    imageUrl: string;
    description: string;
  };
  zIndexOffset?: number;
}

function FeatureCard({ feature, className, zIndexOffset = 0, ...props }: FeatureCardProps) {
  const { title, category, imageUrl, description } = feature;
  const springValue = useSpring(0, {
    bounce: 0,
  });
  const zIndex = useTransform(springValue, (value) => +Math.floor(value * 10) + 10 + zIndexOffset);
  const scale = useTransform(springValue, [0, 1], [1, 1.1]);

  const content = (
    <>
      <img 
        {...{
          src: imageUrl,
          alt: category,
          className: "absolute inset-0 h-full w-full object-cover"
        } as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}
      />
      <div className="relative z-10 flex h-full w-full flex-col gap-3 bg-gradient-to-t from-primary-600/85 via-primary-500/75 to-transparent p-4">
        <small className="inline w-fit rounded-full bg-primary-500/40 backdrop-blur-sm px-3 py-1.5 text-sm font-medium leading-none text-white border border-white/10">
          {category}
        </small>

        <div className="flex-1" />
        <div className="space-y-3 rounded-xl bg-primary-500/80 p-4 backdrop-blur-sm shadow-lg border border-white/10">
          <h3 className="text-base font-bold leading-tight text-white">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/95">
            {description}
          </p>
        </div>
      </div>
    </>
  );

  const containerClassName = cn(
    "relative flex h-80 w-64 flex-col overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ease-out",
    "hover:shadow-2xl hover:shadow-primary-500/20",
    className,
  );

  return (
    <>
      <motion.div
        onMouseEnter={() => springValue.set(1)}
        onMouseLeave={() => springValue.set(0)}
        style={{
          zIndex,
          scale,
        }}
        className={cn(containerClassName, "hidden sm:flex")}
        {...props}
      >
        {content}
      </motion.div>
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: 0, transition: { duration: 0.5 } }}
        className={cn(containerClassName, "flex sm:hidden")}
      >
        {content}
      </motion.div>
    </>
  );
}

export default function ProductFeatures() {
  const cardWidth = 64 * 4; // w-64 x 4 (adjusted for new card width)
  const angle = 6;
  const yOffset = 30;

  const handleGetStarted = () => {
    const expertiseSection = document.getElementById('expertise');
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex w-full h-full flex-col items-center gap-2 pt-0 pb-0 overflow-hidden">
      {/* Clean, professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100" />
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(0,0,128,0.03)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(0,0,128,0.03)_0%,_transparent_50%)]" />
      
      {/* Very subtle animated blobs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] animate-blob"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] animate-blob animation-delay-4000"></div>
      
      {/* Content */}
      <div className="relative w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-8 z-20 w-1/6 max-w-[200px] min-w-[120px]"
        >
          <img 
            {...{
              src: logo,
              alt: "Kankot Logo",
              className: "w-full h-auto",
              loading: "eager"
            } as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}
          />
        </motion.div>

        <motion.header
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.5,
            },
          }}
          className="flex max-w-2xl flex-col items-center gap-4 px-4 mt-16 mx-auto text-primary-500"
        >
          <div className="sm:mt-0 mt-12">
            <TextFlip />
          </div>
        </motion.header>

        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.5,
              delay: 0.2,
            },
          }}
          className="mt-4 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.button
              onClick={handleGetStarted}
              className="rounded-lg bg-primary-500 px-8 py-3 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dowiedz się więcej
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: 0.3,
            },
          }}
          className="mt-6 flex w-full justify-center px-8"
        >
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 pt-4 lg:pt-8">
              <FeatureCard
                feature={{
                  category: "Księgowość",
                  imageUrl: "/images/expertise/ksiegowos.png",
                  title: "Kompleksowa Obsługa Księgowa",
                  description: "Pełna obsługa księgowa firm, prowadzenie ksiąg rachunkowych, rozliczenia podatkowe i ZUS.",
                }}
                initial={{
                  x: cardWidth,
                  y: yOffset,
                  opacity: 0,
                  rotate: 0,
                  scale: 0.9,
                }}
                animate={{
                  x: yOffset,
                  y: 10,
                  opacity: 1,
                  scale: 0.95,
                  rotate: -angle,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.1,
                  },
                }}
              />
              <FeatureCard
                feature={{
                  category: "Usługi Podatkowe",
                  imageUrl: "/images/expertise/VAT.png",
                  title: "Optymalizacja Podatkowa",
                  description: "Profesjonalne usługi w zakresie optymalizacji podatkowej i planowania finansowego.",
                }}
                initial={{
                  x: 0,
                  y: yOffset,
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  x: 0,
                  y: -30,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.2,
                  },
                }}
              />
              <FeatureCard
                feature={{
                  category: "Kadry i Płace",
                  imageUrl: "/images/expertise/kadry.png",
                  title: "Obsługa Kadrowo-Płacowa",
                  description: "Kompleksowa obsługa kadrowo-płacowa, rozliczenia pracownicze i dokumentacja HR.",
                }}
                initial={{
                  x: -cardWidth,
                  y: yOffset,
                  opacity: 0,
                  rotate: 0,
                  scale: 0.9,
                }}
                animate={{
                  x: -yOffset,
                  y: 10,
                  opacity: 1,
                  scale: 0.95,
                  rotate: angle,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.3,
                  },
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
