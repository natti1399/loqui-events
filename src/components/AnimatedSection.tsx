import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationClass?: string;
  threshold?: number;
  rootMargin?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animationClass = 'animate-fade-in-up',
  threshold = 0.1,
  rootMargin = '50px',
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`${
        isIntersecting ? animationClass : 'opacity-0'
      } ${className}`}
      style={{
        transform: isIntersecting ? 'none' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;