'use client';

import ScrollToTop from '@/app/components/Common/ScrollToTop';
import {
  AboutTitle,
  AboutParagraph,
  AboutListContainer,
  AboutList,
  AboutHeadline,
} from '@/app/components/About/AboutStyles';

export default function AboutTechstack() {
  return (
    <>
      <ScrollToTop />
      <AboutTitle>Techstack</AboutTitle>
      <AboutParagraph>Technologies and tools used in this project:</AboutParagraph>
      <AboutHeadline>Frontend</AboutHeadline>
      <AboutListContainer>
        <AboutList>Next.js</AboutList>
        <AboutList>React</AboutList>
        <AboutList>HTML</AboutList>
        <AboutList>CSS</AboutList>
        <AboutList>JavaScript</AboutList>
        <AboutList>react-icons/fa</AboutList>
      </AboutListContainer>
      <AboutHeadline>Backend</AboutHeadline>
      <AboutParagraph>Authentication, APIs, mail services:</AboutParagraph>
      <AboutListContainer>
        <AboutList>Node.js</AboutList>
        <AboutList>NextAuth</AboutList>
        <AboutList>Nodemailer</AboutList>
        <AboutList>NextResponse</AboutList>
      </AboutListContainer>
      <AboutHeadline>Database</AboutHeadline>
      <AboutListContainer>
        <AboutList>MongoDB</AboutList>
      </AboutListContainer>
      <AboutHeadline>Other Tools</AboutHeadline>
      <AboutParagraph>Version control, deployment:</AboutParagraph>
      <AboutListContainer>
        <AboutList>GitHub</AboutList>
        <AboutList>Vercel</AboutList>
      </AboutListContainer>
    </>
  );
}
