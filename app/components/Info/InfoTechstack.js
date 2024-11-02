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
      <Title>{getText('infoTechstack', 'title', language)}</Title>
      <Paragraph>{getText('infoTechstack', 'intro', language)}</Paragraph>
      <Subtitle>{getText('infoTechstack', 'frontend_title', language)}</Subtitle>
      <ListContainer>
        <List>{getText('infoTechstack', 'frontend_nextjs', language)}</List>
        <List>{getText('infoTechstack', 'frontend_react', language)}</List>
        <List>{getText('infoTechstack', 'frontend_html', language)}</List>
        <List>{getText('infoTechstack', 'frontend_css', language)}</List>
        <List>{getText('infoTechstack', 'frontend_javascript', language)}</List>
        <List>{getText('infoTechstack', 'frontend_react_icons', language)}</List>
      </ListContainer>
      <Subtitle>{getText('infoTechstack', 'backend_title', language)}</Subtitle>
      <Paragraph>{getText('infoTechstack', 'backend_intro', language)}</Paragraph>
      <ListContainer>
        <List>{getText('infoTechstack', 'backend_node', language)}</List>
        <List>{getText('infoTechstack', 'backend_next_auth', language)}</List>
        <List>{getText('infoTechstack', 'backend_next_response', language)}</List>
        <List>{getText('infoTechstack', 'backend_sendgrid', language)}</List>
      </ListContainer>
      <Subtitle>{getText('infoTechstack', 'database_title', language)}</Subtitle>
      <ListContainer>
        <List>{getText('infoTechstack', 'database_mongodb', language)}</List>
      </ListContainer>
      <Subtitle>{getText('infoTechstack', 'other_tools_title', language)}</Subtitle>
      <Paragraph>{getText('infoTechstack', 'other_tools_intro', language)}</Paragraph>
      <ListContainer>
        <List>{getText('infoTechstack', 'other_tools_github', language)}</List>
        <List>{getText('infoTechstack', 'other_tools_vercel', language)}</List>
      </ListContainer>
    </>
  );
}
