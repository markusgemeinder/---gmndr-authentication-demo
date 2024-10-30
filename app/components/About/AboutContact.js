// /app/components/About/AboutContact.js

'use client';

import { useContext } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph } from '@/app/components/Common/CommonStyles';
import { AvatarContainer, Avatar, AboutLink, AboutLinkContainer } from '@/app/components/About/AboutStyles';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function AboutContact() {
  const { language } = useContext(LanguageContext);

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src={`/images/gmndr-pic-02.jpg`} alt='Markus Gemeinder' width={160} height={160} />
      </AvatarContainer>
      <Title>{getText('about_contact', 'contact', language)}</Title>
      <Subtitle>{getText('about_contact', 'name', language)}</Subtitle>
      <Paragraph>{getText('about_contact', 'description', language)}</Paragraph>
      <Paragraph>{getText('about_contact', 'availability', language)}</Paragraph>
      <AboutLinkContainer>
        <AboutLink href='tel:+491716444010'>{getText('about_contact', 'phone', language)}: +49 171 6444010</AboutLink>
        <AboutLink href='mailto:info@gemeinder-coaching.de'>
          {getText('about_contact', 'email', language)}: info(at)gemeinder-coaching.de
        </AboutLink>
        <AboutLink href='https://www.gemeinder-coaching.de' target='_blank'>
          {getText('about_contact', 'website', language)}: www.gemeinder-coaching.de
        </AboutLink>
        <AboutLink href='https://github.com/markusgemeinder' target='_blank'>
          {getText('about_contact', 'github', language)}: markusgemeinder
        </AboutLink>
        <AboutLink href='https://www.instagram.com/gemeindercoaching' target='_blank'>
          {getText('about_contact', 'instagram', language)}: @gemeindercoaching
        </AboutLink>
        <AboutLink href='https://www.facebook.com/gemeindercoaching' target='_blank'>
          {getText('about_contact', 'facebook', language)}: @gemeindercoaching
        </AboutLink>
      </AboutLinkContainer>
    </>
  );
}
