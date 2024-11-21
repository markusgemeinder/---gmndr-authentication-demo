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

  const getLanguageText = (key) => {
    return getText('info_contact', key, language);
  };

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src={`/images/gmndr-pic-2.jpg`} alt='Markus Gemeinder' width={160} height={160} />
      </AvatarContainer>
      <Title>{getLanguageText('contact')}</Title>
      <Subtitle>{getLanguageText('name')}</Subtitle>
      <Paragraph>{getLanguageText('description')}</Paragraph>
      <Paragraph>{getLanguageText('availability')}</Paragraph>
      <InfoLinkContainer>
        <InfoLink href='tel:+491716444010'>{getLanguageText('phone')}: +49 171 6444010</InfoLink>
        <InfoLink href='mailto:info@gemeinder-coaching.de'>
          {getLanguageText('email')}: info(at)gemeinder-coaching.de
        </InfoLink>
        <InfoLink href='https://www.gemeinder-coaching.de' target='_blank'>
          {getLanguageText('website')}: www.gemeinder-coaching.de
        </InfoLink>
        <InfoLink href='https://github.com/markusgemeinder' target='_blank'>
          {getLanguageText('github')}: markusgemeinder
        </InfoLink>
        <InfoLink href='https://www.instagram.com/gemeindercoaching' target='_blank'>
          {getLanguageText('instagram')}: @gemeindercoaching
        </InfoLink>
        <InfoLink href='https://www.facebook.com/gemeindercoaching' target='_blank'>
          {getLanguageText('facebook')}: @gemeindercoaching
        </InfoLink>
      </InfoLinkContainer>
    </>
  );
}
