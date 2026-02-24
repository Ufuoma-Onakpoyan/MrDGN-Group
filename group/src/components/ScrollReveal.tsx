import React from 'react';

/** Stub: scroll reveal was removed; this just renders children. Kept so Tailwind content scan does not fail. */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);
