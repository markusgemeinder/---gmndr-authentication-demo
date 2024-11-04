import { useState, useRef, useEffect } from 'react';

const useAccordion = (padding = 0) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        setContentHeight(0);
      }, 300);
    } else {
      const totalHeight = contentRef.current.scrollHeight + padding;
      setContentHeight(totalHeight);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const totalHeight = contentRef.current.scrollHeight + padding;
      setContentHeight(totalHeight);
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
