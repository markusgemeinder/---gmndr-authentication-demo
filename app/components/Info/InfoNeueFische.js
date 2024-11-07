// /app/components/Info/InfoNeueFische.js

'use client';

import { useContext, useState } from 'react';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Paragraph } from '@/app/components/Common/CommonStyles';
import {
  AvatarContainer,
  Avatar,
  InfoImageContainer,
  InfoImageWithLink,
  InfoLinkContainer,
  InfoLink,
  Overlay,
  InfoImageWrapper,
  InfoImageFullSize, // Direkt importiert
} from '@/app/components/Info/InfoStyles';

export default function InfoNeueFische() {
  const { language } = useContext(LanguageContext);
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
      <Title>{getText('info_neue_fische', 'title', language)}</Title>
      <Paragraph>{getText('info_neue_fische', 'paragraph_participation', language)}</Paragraph>
      <InfoImageContainer>
        <InfoImageWithLink
          src={`/images/neue-fische-certificate-1.png`}
          alt='Certificate (front)'
          width={300}
          height={400}
          onClick={() => handleImageClick(`/images/neue-fische-certificate-1.png`)}
          role='button'
          aria-label='Open Certificate Front'
        />
        <InfoImageWithLink
          src={`/images/neue-fische-certificate-2.png`}
          alt='Certificate (back)'
          width={300}
          height={400}
          onClick={() => handleImageClick(`/images/neue-fische-certificate-2.png`)}
          role='button'
          aria-label='Open Certificate Back'
        />
      </InfoImageContainer>
      {isImageExpanded && (
        <>
          <Overlay onClick={handleCloseImage} role='button' aria-label='Close expanded image' />
          <InfoImageWrapper>
            <InfoImageFullSize
              src={expandedImageSrc}
              alt='Expanded Image'
              width={800}
              height={800}
              onClick={handleCloseImage}
            />
          </InfoImageWrapper>
        </>
      )}
      <InfoLinkContainer>
        <InfoLink href='https://neuefische.de' target='_blank' rel='noopener noreferrer'>
          {getText('info_neue_fische', 'link_website', language)}
        </InfoLink>
      </InfoLinkContainer>
    </>
  );
}
