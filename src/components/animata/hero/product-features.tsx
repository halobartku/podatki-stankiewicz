import { ReactNode, useState } from "react";
import { HTMLMotionProps, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), {
    stiffness: 300,
    damping: 30
  });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  }

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
        <small className="inline w-fit rounded-full bg-primary-500/60 px-3 py-1.5 text-sm font-medium leading-none text-white border border-white/10">
          {category}
        </small>

        <div className="flex-1" />
        <div className="space-y-3 rounded-xl bg-primary-500/90 p-4 shadow-lg border border-white/10">
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

  return (
    <>
      <motion.div
        className={cn(
          "relative rounded-2xl shadow-lg cursor-pointer overflow-hidden perspective-[1000px]",
          "before:absolute before:inset-0 before:z-10 before:bg-primary-500/0 before:transition-colors before:duration-500",
          "hover:before:bg-primary-500/5",
          "after:absolute after:inset-0 after:z-20 after:rounded-2xl after:opacity-0 after:shadow-[0_8px_32px_rgba(0,0,0,0.12)] after:transition-all after:duration-500 after:ease-out",
          "hover:after:opacity-100 hover:after:shadow-[0_16px_48px_rgba(0,0,0,0.18)]",
          "[&>div.shine]:hover:translate-x-[200%] [&>div.shine]:hover:scale-110",
          "hidden sm:flex"
        )}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          x.set(0.5);
          y.set(0.5);
        }}
        whileHover={{ 
          scale: 1.02,
          z: 20,
          transition: { 
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }}
        {...props}
      >
        {content}
        <div 
          className="shine absolute inset-y-0 -left-[100%] w-1/2 z-20 rotate-[25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transform transition-all duration-[800ms] ease-in-out will-change-transform"
        />
      </motion.div>
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: 0, transition: { duration: 0.5 } }}
        className="relative rounded-2xl shadow-lg cursor-pointer overflow-hidden flex sm:hidden"
      >
        {content}
      </motion.div>
    </>
  );
}

export default function ProductFeatures() {
  const cardWidth = 64 * 4;
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
              alt: "Podatki Stankiewicz",
              className: "w-full h-auto",
              loading: "eager"
            } as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}
          />
        </motion.div>

        <motion.header
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex max-w-2xl flex-col items-center gap-4 px-4 mt-16 mx-auto text-primary-500"
        >
          <div className="sm:mt-0 mt-12">
            <TextFlip />
          </div>
        </motion.header>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.button
              onClick={handleGetStarted}
              className="relative rounded-lg px-8 py-3 text-sm font-medium text-white overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 transition-opacity duration-300"></div>
              <span className="relative z-10">Dowiedz się więcej</span>
              <div className="absolute inset-0 border border-white/10 rounded-lg shadow-lg"></div>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
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
