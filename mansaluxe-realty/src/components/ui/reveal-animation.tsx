import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface RevealAnimationProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const RevealAnimation = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className
}: RevealAnimationProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold, delay });

  const getAnimationClasses = () => {
    const baseClasses = `transition-all duration-${duration} ease-out`;
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'fade-in':
          return `${baseClasses} opacity-0`;
        case 'slide-left':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'slide-right':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'scale-in':
          return `${baseClasses} opacity-0 scale-95`;
        default:
          return `${baseClasses} opacity-0 translate-y-8`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={ref as any}
      className={cn(getAnimationClasses(), className)}
    >
      {children}
    </div>
  );
};