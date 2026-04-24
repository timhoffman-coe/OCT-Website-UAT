'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

function TypewriterInner({
  text,
  speed = 20,
  onComplete,
  className = ''
}: TypewriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={`typewriter ${className}`}>
      {text.slice(0, currentIndex)}
    </span>
  );
}

export const Typewriter: React.FC<TypewriterProps> = (props) => {
  return <TypewriterInner key={props.text} {...props} />;
};
