import { useState, useRef, useEffect } from 'react';

const useAccordion = (padding = 0) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const calculateTotalHeight = () => {
    if (!contentRef.current) return 0;
    const scrollHeight = contentRef.current.scrollHeight;

    // Dynamische Anpassung des Paddings
    const adjustedPadding = scrollHeight < 200 ? padding : padding * 1.4;
    return scrollHeight + adjustedPadding;
  };

  const toggleAccordion = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        setContentHeight(0);
      }, 300);
    } else {
      setContentHeight(calculateTotalHeight());
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setContentHeight(calculateTotalHeight());
    }
  }, [isOpen, padding]);

  const closeAccordion = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        setContentHeight(0);
      }, 300);
    }
  };

  return { isOpen, contentHeight, toggleAccordion, closeAccordion, contentRef };
};

export default useAccordion;
