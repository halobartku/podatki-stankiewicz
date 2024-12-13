import { ReactNode } from 'react';

interface BackgroundGradientProps {
  className?: string;
  children?: ReactNode;
}

export function BackgroundGradient({ className = '', children }: BackgroundGradientProps) {
  return (
    <div className="relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:20px_20px]" />
      <div className="absolute inset-0">
        {/* Mobile-specific gradients with smoother transitions */}
        <div className="sm:hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-15 transition-all duration-[3000ms] ease-in-out animate-blob-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-15 transition-all duration-[3000ms] ease-in-out animate-blob-slow animation-delay-2000"></div>
          <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 transition-all duration-[3000ms] ease-in-out animate-blob-slow animation-delay-4000"></div>
        </div>
        
        {/* Desktop gradients */}
        <div className="hidden sm:block">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream/80 via-cream/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/[0.05] to-secondary-500/[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(0,0,128,0.07),transparent)]" />
      
      {/* Content */}
      <div className={`relative ${className}`}>
        {children}
      </div>
    </div>
  );
}
