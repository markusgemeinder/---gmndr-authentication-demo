// /app/components/About/AboutContact.js

'use client';

import { AboutTitle, AboutParagraph } from './AboutStyles';

export default function AboutContact() {
  return (
    <>
      <AboutTitle>Authentication & User Experience</AboutTitle>
      <AboutParagraph>
        Our authentication system is built using **NextAuth.js**, offering features such as user registration, email
        verification, and password recovery to ensure security and reliability for our users.
      </AboutParagraph>
    </>
  );
}
