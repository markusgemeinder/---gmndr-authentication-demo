// /app/components/Info/InfoTechstack.js

'use client';

import { useContext } from 'react';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph, ListContainer, List } from '@/app/components/Common/CommonStyles';
import { AvatarContainer, Avatar } from '@/app/components/Info/InfoStyles';

export default function InfoTechstack() {
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('info_techstack', key, language);
  };

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src='/images/next-js-logo-01.png' alt='Techstack Avatar' width={160} height={160} />
      </AvatarContainer>
      <Title>{getLanguageText('title')}</Title>
      <Paragraph>{getLanguageText('intro')}</Paragraph>
      <Subtitle>{getLanguageText('frontend_title')}</Subtitle>
      <ListContainer>
        <List>{getLanguageText('frontend_nextjs')}</List>
        <List>{getLanguageText('frontend_react')}</List>
        <List>{getLanguageText('frontend_html')}</List>
        <List>{getLanguageText('frontend_css')}</List>
        <List>{getLanguageText('frontend_javascript')}</List>
        <List>{getLanguageText('frontend_react_icons')}</List>
      </ListContainer>

      <Subtitle>{getLanguageText('other_tools_title')}</Subtitle>
      <Paragraph>{getLanguageText('other_tools_intro')}</Paragraph>
      <ListContainer>
        <List>{getLanguageText('other_tools_github')}</List>
        <List>{getLanguageText('other_tools_vercel')}</List>
      </ListContainer>
      <Subtitle>{getLanguageText('language_support_title')}</Subtitle>
      <Paragraph>{getLanguageText('language_support_intro')}</Paragraph>
    </>
  );
}
