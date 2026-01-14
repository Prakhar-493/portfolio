"use client"
import React, { useState, useEffect } from 'react';

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorClassName?: string;
  textColors?: string[];
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  showCursor = true,
  cursorClassName = "",
  textColors = ["#000000"]
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fullText = text[currentTextIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && currentText === fullText) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % text.length);
      return;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      } else {
        setCurrentText(currentText.substring(0, currentText.length - 1));
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, text, currentTextIndex, typingSpeed, deletingSpeed, pauseDuration]);

  const currentColor = textColors[currentTextIndex % textColors.length];

  return (
    <span className="inline-block">
      <span style={{ color: currentColor }}>{currentText}</span>
      {showCursor && (
        <span className={`inline-block w-1 h-[0.9em] ml-1 bg-current align-middle animate-blink ${cursorClassName}`}>
          |
        </span>
      )}
    </span>
  );
};

export default TextType;
