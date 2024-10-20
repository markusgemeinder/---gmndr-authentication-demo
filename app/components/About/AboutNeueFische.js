// /app/components/About/AboutNeueFische.js

'use client';

import { useState } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import {
  AboutTitle,
  AboutParagraph,
  AboutAvatar,
  AboutImageContainer,
  AboutImageWithLink,
  AboutLinkContainer,
  AboutLink,
} from '@/app/components/About/AboutStyles';

export default function AboutNeueFische() {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [expandedImageSrc, setExpandedImageSrc] = useState('');

  function handleImageClick(src) {
    setIsImageExpanded(true);
    setExpandedImageSrc(src);
  }

  function handleCloseImage() {
    setIsImageExpanded(false);
    setExpandedImageSrc('');
  }

  return (
    <>
      <ScrollToTop />
      <AboutAvatar src={`/images/neue-fische-logo.png?t=${new Date().getTime()}`} alt='neue fische' />
      <AboutTitle>Web Development Bootcamp</AboutTitle>
      <AboutParagraph>Successfully participated (3 months full-time) and completed in February 2024.</AboutParagraph>
      <AboutImageContainer>
        <AboutImageWithLink
          src={`/images/neue-fische-certificate-1.png?t=${new Date().getTime()}`}
          alt='Certificate (front)'
          onClick={() => handleImageClick(`/images/neue-fische-certificate-1.png?t=${new Date().getTime()}`)}
          style={{ width: '100%', maxWidth: '300px', margin: '10px auto', cursor: 'pointer' }} // Margin für den Abstand
        />
        <AboutImageWithLink
          src={`/images/neue-fische-certificate-2.png?t=${new Date().getTime()}`}
          alt='Certificate (back)'
          onClick={() => handleImageClick(`/images/neue-fische-certificate-2.png?t=${new Date().getTime()}`)}
          style={{ width: '100%', maxWidth: '300px', margin: '10px auto', cursor: 'pointer' }} // Margin für den Abstand
        />
      </AboutImageContainer>
      {isImageExpanded && (
        <>
          <div
            onClick={handleCloseImage}
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(0, 0, 0, 0.5)',
            }}
          />
          <img
            src={expandedImageSrc}
            alt='Expanded Image'
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxHeight: '80vh',
              maxWidth: '80vw',
              zIndex: 9999,
            }}
          />
        </>
      )}
      <AboutLinkContainer>
        <AboutLink href='https://neuefische.de' target='_blank'>
          neue fische Website
        </AboutLink>
      </AboutLinkContainer>
    </>
  );
}
