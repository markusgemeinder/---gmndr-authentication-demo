// /app/components/About/AboutNeueFische.js

'use client';

import { useState } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Paragraph } from '@/app/components/Common/CommonStyles';
import {
  AvatarContainer,
  Avatar,
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
      <AvatarContainer>
        <Avatar src={`/images/neue-fische-logo.png`} alt='neue fische' width={160} height={160} />
      </AvatarContainer>
      <Title>Web Development Bootcamp</Title>
      <Paragraph>Successfully participated (3 months full-time) and completed in February 2024.</Paragraph>
      <AboutImageContainer>
        <AboutImageWithLink
          src={`/images/neue-fische-certificate-1.png`}
          alt='Certificate (front)'
          width={300}
          height={400}
          onClick={() => handleImageClick(`/images/neue-fische-certificate-1.png`)}
        />
        <AboutImageWithLink
          src={`/images/neue-fische-certificate-2.png`}
          alt='Certificate (back)'
          width={300}
          height={400}
          onClick={() => handleImageClick(`/images/neue-fische-certificate-2.png`)}
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
