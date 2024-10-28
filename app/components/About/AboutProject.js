// /app/components/About/AboutProject.js

'use client';

import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph, ListContainer, List } from '@/app/components/Common/CommonStyles';
import { AvatarContainer, Avatar, AboutLinkContainer, AboutLink } from '@/app/components/About/AboutStyles';

export default function AboutProject() {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good morning';
    } else if (hours < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src={`/images/gmndr-pic-01.jpg`} alt='Markus Gemeinder' width={160} height={160} />
      </AvatarContainer>
      <Title>#GMNDR Authentication Demo</Title>
      <Paragraph>
        {getGreeting()} and welcome to a <strong>project realized by Markus Gemeinder in 2024 with Next.js 14. </strong>{' '}
        This application showcases a comprehensive authentication system that supports various login methods, including
        GitHub, Google, custom credentials, and demo access. The frontend provides a user-friendly interface while the
        backend securely manages user data and reviews in MongoDB.
      </Paragraph>
      <Subtitle>Project Overview</Subtitle>
      <Paragraph>
        The main focus of this demo application is the login functionality. Users can create reviews with a note and a
        5-star rating, view all reviews stored in MongoDB, and manage their submissions (edit and delete). Note that the
        reviews page serves only as a placeholder example for a protected area. The registration process includes a
        double opt-in for email verification and secure password recovery options.
      </Paragraph>
      <Subtitle>Main Features</Subtitle>
      <ListContainer>
        <List>Multiple login options: GitHub, Google, custom credentials, or demo user</List>
        <List>Frontend review creation with note and 5-star rating</List>
        <List>Session storage for demo users; MongoDB for registered users in the backend</List>
        <List>Double opt-in registration and secure password reset</List>
        <List>Dark/Light mode toggle for better UX</List>
        <List>Responsive burger menu navigation for mobile users</List>
        <List>Error and success feedback via modal popups</List>
        <List>Middleware and protected routes ensure secure access to user data</List>
      </ListContainer>
      <AboutLinkContainer>
        <AboutLink href='https://github.com/markusgemeinder/---gmndr-authentication-demo' target='_blank'>
          GitHub Repository
        </AboutLink>
      </AboutLinkContainer>
    </>
  );
}
