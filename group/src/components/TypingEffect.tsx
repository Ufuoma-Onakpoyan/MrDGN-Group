import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  staticText: string;
  words: string[];
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ staticText, words, className = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 500); // Half second for fade out, then fade in
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={className}>
      {staticText}{' '}
      <span 
        className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {words[currentWordIndex]}
      </span>
    </span>
  );
};

export default TypingEffect;