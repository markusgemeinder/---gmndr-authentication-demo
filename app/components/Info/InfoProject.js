// /app/components/Info/InfoProject.js

'use client';

import { useContext } from 'react';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph, ListContainer, List } from '@/app/components/Common/CommonStyles';
import { AvatarContainer, Avatar, InfoLinkContainer, InfoLink } from '@/app/components/Info/InfoStyles';

export default function InfoProject() {
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('info_project', key, language);
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return getLanguageText('greeting_morning');
    } else if (hours < 18) {
      return getLanguageText('greeting_afternoon');
    } else {
      return getLanguageText('greeting_evening');
    }
  };

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src={`/images/gmndr-pic-1.jpg`} alt='Markus Gemeinder' width={160} height={160} />
      </AvatarContainer>
      <Title>{getLanguageText('title')}</Title>
      <Paragraph>
        {getGreeting()} {getLanguageText('welcome_message')}
      </Paragraph>
      <Subtitle>{getLanguageText('project_overview_title')}</Subtitle>
      <Paragraph>{getLanguageText('project_overview_description_1')}</Paragraph>
      <Paragraph>{getLanguageText('project_overview_description_2')}</Paragraph>
      <Paragraph>{getLanguageText('project_overview_description_3')}</Paragraph>
      <Subtitle>{getLanguageText('main_features_title')}</Subtitle>
      <ListContainer>
        <List>{getLanguageText('feature_multiple_login')}</List>
        <List>{getLanguageText('feature_double_opt_in')}</List>
        <List>{getLanguageText('feature_middleware')}</List>
        <List>{getLanguageText('feature_review_creation')}</List>
        <List>{getLanguageText('feature_responsive_navigation')}</List>
      </ListContainer>
      <InfoLinkContainer>
        <InfoLink href='https://github.com/markusgemeinder/---gmndr-authentication-demo' target='_blank'>
          {getLanguageText('link_github')}
        </InfoLink>
      </InfoLinkContainer>
    </>
  );
}
