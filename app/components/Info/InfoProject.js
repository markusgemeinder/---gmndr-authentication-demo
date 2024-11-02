// /app/components/Info/InfoProject.js

'use client';

import { useContext } from 'react';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph, ListContainer, List } from '@/app/components/Common/CommonStyles';
import { AvatarContainer, Avatar, InfoLinkContainer, InfoLink } from '@/app/components/Info/InfoStyles';

export default function InfoProject() {
  const { language } = useContext(LanguageContext);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return getText('infoProject', 'greeting_morning', language);
    } else if (hours < 18) {
      return getText('infoProject', 'greeting_afternoon', language);
    } else {
      return getText('infoProject', 'greeting_evening', language);
    }
  };

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src={`/images/gmndr-pic-01.jpg`} alt='Markus Gemeinder' width={160} height={160} />
      </AvatarContainer>
      <Title>{getText('infoProject', 'title', language)}</Title>
      <Paragraph>
        {getGreeting()} {getText('infoProject', 'welcome_message', language)}
      </Paragraph>
      <Subtitle>{getText('infoProject', 'project_overview_title', language)}</Subtitle>
      <Paragraph>{getText('infoProject', 'project_overview_description', language)}</Paragraph>
      <Subtitle>{getText('infoProject', 'main_features_title', language)}</Subtitle>
      <ListContainer>
        <List>{getText('infoProject', 'feature_multiple_login', language)}</List>
        <List>{getText('infoProject', 'feature_double_opt_in', language)}</List>
        <List>{getText('infoProject', 'feature_middleware', language)}</List>
        <List>{getText('infoProject', 'feature_review_creation', language)}</List>
        <List>{getText('infoProject', 'feature_language_support', language)}</List>
        <List>{getText('infoProject', 'feature_responsive_navigation', language)}</List>
        <List>{getText('infoProject', 'feature_dark_light_mode', language)}</List>

        <List>{getText('infoProject', 'feature_feedback', language)}</List>
        <List>{getText('infoProject', 'feature_session_storage', language)}</List>
      </ListContainer>
      <InfoLinkContainer>
        <InfoLink href='https://github.com/markusgemeinder/---gmndr-authentication-demo' target='_blank'>
          {getText('infoProject', 'link_github', language)}
        </InfoLink>
      </InfoLinkContainer>
    </>
  );
}
