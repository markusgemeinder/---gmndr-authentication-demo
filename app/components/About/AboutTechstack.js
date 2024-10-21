'use client';

import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph, ListContainer, List } from '@/app/components/Common/CommonStyles';

export default function AboutTechstack() {
  return (
    <>
      <ScrollToTop />
      <Title>Techstack</Title>
      <Paragraph>Technologies and tools used in this project:</Paragraph>
      <Subtitle>Frontend</Subtitle>
      <ListContainer>
        <List>Next.js</List>
        <List>React</List>
        <List>HTML</List>
        <List>CSS</List>
        <List>JavaScript</List>
        <List>react-icons/fa</List>
      </ListContainer>
      <Subtitle>Backend</Subtitle>
      <Paragraph>Authentication, APIs, mail services:</Paragraph>
      <ListContainer>
        <List>Node.js</List>
        <List>NextAuth</List>
        <List>Nodemailer</List>
        <List>NextResponse</List>
      </ListContainer>
      <Subtitle>Database</Subtitle>
      <ListContainer>
        <List>MongoDB</List>
      </ListContainer>
      <Subtitle>Other Tools</Subtitle>
      <Paragraph>Version control, deployment:</Paragraph>
      <ListContainer>
        <List>GitHub</List>
        <List>Vercel</List>
      </ListContainer>
    </>
  );
}
