// /app/components/About/AboutProject.js

'use client';

import ScrollToTop from '@/app/components/Common/ScrollToTop';
import {
  AboutTitle,
  AboutParagraph,
  AboutHeadline,
  AboutListContainer,
  AboutList,
  AboutLinkContainer,
  AboutLink,
} from '@/app/components/About/AboutStyles';

export default function AboutProject() {
  return (
    <>
      <ScrollToTop />
      <AboutTitle>Welcome to the #GMNDR Authentication Demo!</AboutTitle>
      <AboutParagraph>
        This application showcases a comprehensive authentication system that supports various login methods, including
        GitHub, Google, custom credentials, and demo access. The frontend provides a user-friendly interface while the
        backend securely manages user data and reviews in MongoDB.
      </AboutParagraph>

      <AboutHeadline>Project Overview</AboutHeadline>
      <AboutParagraph>
        The main focus of this demo application is the login functionality. Users can create reviews with a note and a
        5-star rating, view all reviews stored in MongoDB, and manage their submissions (edit and delete). Note that the
        reviews page serves only as a placeholder example for a protected area. The registration process includes a
        double opt-in for email verification and secure password recovery options.
      </AboutParagraph>

      <AboutHeadline>Main Features</AboutHeadline>
      <AboutListContainer>
        <AboutList>Multiple login options: GitHub, Google, custom credentials, or demo user</AboutList>
        <AboutList>Frontend review creation with note and 5-star rating</AboutList>
        <AboutList>Session storage for demo users; MongoDB for registered users in the backend</AboutList>
        <AboutList>Double opt-in registration and secure password reset</AboutList>
        <AboutList>Dark/Light mode toggle for better UX</AboutList>
        <AboutList>Responsive burger menu navigation for mobile users</AboutList>
        <AboutList>Error and success feedback via modal popups</AboutList>
        <AboutList>Middleware and protected routes ensure secure access to user data</AboutList>
      </AboutListContainer>

      <AboutLinkContainer>
        <AboutLink href='https://github.com/markusgemeinder/---gmndr-authentication-demo' target='_blank'>
          GitHub Repository
        </AboutLink>
      </AboutLinkContainer>
    </>
  );
}
