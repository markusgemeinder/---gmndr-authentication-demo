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

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src='/images/next-js-logo-01.png' alt='Techstack Avatar' width={160} height={160} />
      </AvatarContainer>
      <Title>{getText('info_techstack', 'title', language)}</Title>
      <Paragraph>{getText('info_techstack', 'intro', language)}</Paragraph>
      <Subtitle>{getText('info_techstack', 'frontend_title', language)}</Subtitle>
      <ListContainer>
        <List>{getText('info_techstack', 'frontend_nextjs', language)}</List>
        <List>{getText('info_techstack', 'frontend_react', language)}</List>
        <List>{getText('info_techstack', 'frontend_html', language)}</List>
        <List>{getText('info_techstack', 'frontend_css', language)}</List>
        <List>{getText('info_techstack', 'frontend_javascript', language)}</List>
        <List>{getText('info_techstack', 'frontend_react_icons', language)}</List>
      </ListContainer>
      <Subtitle>{getText('info_techstack', 'backend_title', language)}</Subtitle>
      <Paragraph>{getText('info_techstack', 'backend_intro', language)}</Paragraph>
      <ListContainer>
        <List>{getText('info_techstack', 'backend_node', language)}</List>
        <List>{getText('info_techstack', 'backend_next_auth', language)}</List>
        <List>{getText('info_techstack', 'backend_mongodb', language)}</List>
        <List>{getText('info_techstack', 'backend_next_response', language)}</List>
        <List>{getText('info_techstack', 'backend_sendgrid', language)}</List>
      </ListContainer>

      <Subtitle>{getText('info_techstack', 'other_tools_title', language)}</Subtitle>
      <Paragraph>{getText('info_techstack', 'other_tools_intro', language)}</Paragraph>
      <ListContainer>
        <List>{getText('info_techstack', 'other_tools_github', language)}</List>
        <List>{getText('info_techstack', 'other_tools_vercel', language)}</List>
      </ListContainer>
      <Subtitle>{getText('info_techstack', 'language_support_title', language)}</Subtitle>
      <Paragraph>{getText('info_techstack', 'language_support_intro', language)}</Paragraph>
    </>
  );
}
