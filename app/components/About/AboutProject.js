// /app/components/About/AboutProject.js

'use client';

import { useContext } from 'react';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph, ListContainer, List } from '@/app/components/Common/CommonStyles';
import { AvatarContainer, Avatar, AboutLinkContainer, AboutLink } from '@/app/components/About/AboutStyles';

export default function AboutProject() {
  const { language } = useContext(LanguageContext);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return getText('aboutProject', 'greeting_morning', language);
    } else if (hours < 18) {
      return getText('aboutProject', 'greeting_afternoon', language);
    } else {
      return getText('aboutProject', 'greeting_evening', language);
    }
  };

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src={`/images/gmndr-pic-01.jpg`} alt='Markus Gemeinder' width={160} height={160} />
      </AvatarContainer>
      <Title>{getText('aboutProject', 'title', language)}</Title>
      <Paragraph>
        {getGreeting()} {getText('aboutProject', 'welcome_message', language)}
      </Paragraph>
      <Subtitle>{getText('aboutProject', 'project_overview_title', language)}</Subtitle>
      <Paragraph>{getText('aboutProject', 'project_overview_description', language)}</Paragraph>
      <Subtitle>{getText('aboutProject', 'main_features_title', language)}</Subtitle>
      <ListContainer>
        <List>{getText('aboutProject', 'feature_multiple_login', language)}</List>
        <List>{getText('aboutProject', 'feature_review_creation', language)}</List>
        <List>{getText('aboutProject', 'feature_session_storage', language)}</List>
        <List>{getText('aboutProject', 'feature_double_opt_in', language)}</List>
        <List>{getText('aboutProject', 'feature_dark_light_mode', language)}</List>
        <List>{getText('aboutProject', 'feature_responsive_navigation', language)}</List>
        <List>{getText('aboutProject', 'feature_feedback', language)}</List>
        <List>{getText('aboutProject', 'feature_middleware', language)}</List>
      </ListContainer>
      <AboutLinkContainer>
        <AboutLink href='https://github.com/markusgemeinder/---gmndr-authentication-demo' target='_blank'>
          {getText('aboutProject', 'link_github', language)}
        </AboutLink>
      </AboutLinkContainer>
    </>
  );
}
