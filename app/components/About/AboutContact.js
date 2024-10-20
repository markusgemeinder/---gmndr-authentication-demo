'use client';

import ScrollToTop from '@/app/components/Common/ScrollToTop';
import {
  AboutContainer,
  AboutMain,
  AboutTitle,
  AboutAvatar,
  AboutLink,
  AboutLinkContainer,
  AboutParagraph,
} from '@/app/components/About/AboutStyles';

export default function AboutContact() {
  return (
    <AboutContainer>
      <ScrollToTop />
      <AboutMain>
        <AboutAvatar src={`/images/gmndr-pic.jpg?t=${new Date().getTime()}`} alt='Contact' />
        <AboutTitle>Contact</AboutTitle>
        <AboutParagraph>
          <strong>Markus Gemeinder</strong>
        </AboutParagraph>
        <AboutParagraph>
          Self-employed in the field of coaching and marketing - open to new opportunities and seeking a side job in web
          development.
        </AboutParagraph>
        <AboutParagraph>
          Available from November to February (with limitations during the coaching main season from March to October).
        </AboutParagraph>
        <AboutLinkContainer>
          <AboutLink href='tel:+491716444010'>Phone: +49 171 6444010</AboutLink>
          <AboutLink href='mailto:info@gemeinder-coaching.de'>info(at)gemeinder-coaching.de</AboutLink>
          <AboutLink href='https://www.gemeinder-coaching.de' target='_blank'>
            www.gemeinder-coaching.de
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
      </AboutMain>
    </AboutContainer>
  );
}
