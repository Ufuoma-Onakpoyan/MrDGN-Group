import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const elementsRef = useRef<Element[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal, .section-fade');
    elementsRef.current = Array.from(elements);
    
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      if (elementsRef.current) {
        elementsRef.current.forEach((element) => {
          observer.unobserve(element);
        });
      }
    };
  }, []);

  return null;
};