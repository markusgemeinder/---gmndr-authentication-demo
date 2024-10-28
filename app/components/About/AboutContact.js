// /app/components/About/AboutContact.js

'use client';

import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Title, Subtitle, Paragraph } from '@/app/components/Common/CommonStyles';
import { AvatarContainer, Avatar, AboutLink, AboutLinkContainer } from '@/app/components/About/AboutStyles';

export default function AboutContact() {
  const currentTime = new Date().getTime();

  return (
    <>
      <ScrollToTop />
      <AvatarContainer>
        <Avatar src={`/images/gmndr-pic-02.jpg`} alt='Markus Gemeinder' width={160} height={160} />
      </AvatarContainer>
      <Title>Contact</Title>
      <Subtitle>Markus Gemeinder</Subtitle>
      <Paragraph>
        Self-employed in the field of coaching and marketing - open to new opportunities and seeking a side job in web
        development.
      </Paragraph>
      <Paragraph>
        Available from November to February (with limitations during the coaching main season from March to October).
      </Paragraph>
      <AboutLinkContainer>
        <AboutLink href='tel:+491716444010'>Phone: +49 171 6444010</AboutLink>
        <AboutLink href='mailto:info@gemeinder-coaching.de'>Email: info(at)gemeinder-coaching.de</AboutLink>
        <AboutLink href='https://www.gemeinder-coaching.de' target='_blank'>
          Website: www.gemeinder-coaching.de
        </AboutLink>
        <AboutLink href='https://github.com/markusgemeinder' target='_blank'>
          GitHub: markusgemeinder
        </AboutLink>
        <AboutLink href='https://www.instagram.com/gemeindercoaching' target='_blank'>
          Instagram: @gemeindercoaching
        </AboutLink>
        <AboutLink href='https://www.facebook.com/gemeindercoaching' target='_blank'>
          Facebook: @gemeindercoaching
        </AboutLink>
      </AboutLinkContainer>
    </>
  );
}
