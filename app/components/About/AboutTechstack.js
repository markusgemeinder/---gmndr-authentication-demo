// /app/components/About/AboutTechstack.js

'use client';

import { useContext } from 'react';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph, ListContainer, List } from '@/app/components/Common/CommonStyles';
import { AvatarContainer, Avatar } from '@/app/components/About/AboutStyles';

export default function AboutTechstack() {
  const { language } = useContext(LanguageContext);

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src='/images/next-js-logo-01.png' alt='Techstack Avatar' width={160} height={160} />
      </AvatarContainer>
      <Title>{getText('aboutTechstack', 'title', language)}</Title>
      <Paragraph>{getText('aboutTechstack', 'intro', language)}</Paragraph>
      <Subtitle>{getText('aboutTechstack', 'frontend_title', language)}</Subtitle>
      <ListContainer>
        <List>{getText('aboutTechstack', 'frontend_nextjs', language)}</List>
        <List>{getText('aboutTechstack', 'frontend_react', language)}</List>
        <List>{getText('aboutTechstack', 'frontend_html', language)}</List>
        <List>{getText('aboutTechstack', 'frontend_css', language)}</List>
        <List>{getText('aboutTechstack', 'frontend_javascript', language)}</List>
        <List>{getText('aboutTechstack', 'frontend_react_icons', language)}</List>
      </ListContainer>
      <Subtitle>{getText('aboutTechstack', 'backend_title', language)}</Subtitle>
      <Paragraph>{getText('aboutTechstack', 'backend_intro', language)}</Paragraph>
      <ListContainer>
        <List>{getText('aboutTechstack', 'backend_node', language)}</List>
        <List>{getText('aboutTechstack', 'backend_next_auth', language)}</List>
        <List>{getText('aboutTechstack', 'backend_next_response', language)}</List>
        <List>{getText('aboutTechstack', 'backend_sendgrid', language)}</List>
      </ListContainer>
      <Subtitle>{getText('aboutTechstack', 'database_title', language)}</Subtitle>
      <ListContainer>
        <List>{getText('aboutTechstack', 'database_mongodb', language)}</List>
      </ListContainer>
      <Subtitle>{getText('aboutTechstack', 'other_tools_title', language)}</Subtitle>
      <Paragraph>{getText('aboutTechstack', 'other_tools_intro', language)}</Paragraph>
      <ListContainer>
        <List>{getText('aboutTechstack', 'other_tools_github', language)}</List>
        <List>{getText('aboutTechstack', 'other_tools_vercel', language)}</List>
      </ListContainer>
    </>
  );
}
