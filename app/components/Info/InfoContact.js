// /app/components/Info/InfoContact.js

'use client';

import { useContext } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph } from '@/app/components/Common/CommonStyles';
import { AvatarContainer, Avatar, InfoLink, InfoLinkContainer } from '@/app/components/Info/InfoStyles';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function InfoContact() {
  const { language } = useContext(LanguageContext);

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src={`/images/gmndr-pic-02.jpg`} alt='Markus Gemeinder' width={160} height={160} />
      </AvatarContainer>
      <Title>{getText('info_contact', 'contact', language)}</Title>
      <Subtitle>{getText('info_contact', 'name', language)}</Subtitle>
      <Paragraph>{getText('info_contact', 'description', language)}</Paragraph>
      <Paragraph>{getText('info_contact', 'availability', language)}</Paragraph>
      <InfoLinkContainer>
        <InfoLink href='tel:+491716444010'>{getText('info_contact', 'phone', language)}: +49 171 6444010</InfoLink>
        <InfoLink href='mailto:info@gemeinder-coaching.de'>
          {getText('info_contact', 'email', language)}: info(at)gemeinder-coaching.de
        </InfoLink>
        <InfoLink href='https://www.gemeinder-coaching.de' target='_blank'>
          {getText('info_contact', 'website', language)}: www.gemeinder-coaching.de
        </InfoLink>
        <InfoLink href='https://github.com/markusgemeinder' target='_blank'>
          {getText('info_contact', 'github', language)}: markusgemeinder
        </InfoLink>
        <InfoLink href='https://www.instagram.com/gemeindercoaching' target='_blank'>
          {getText('info_contact', 'instagram', language)}: @gemeindercoaching
        </InfoLink>
        <InfoLink href='https://www.facebook.com/gemeindercoaching' target='_blank'>
          {getText('info_contact', 'facebook', language)}: @gemeindercoaching
        </InfoLink>
      </InfoLinkContainer>
    </>
  );
}
