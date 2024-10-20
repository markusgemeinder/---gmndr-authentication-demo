// /app/components/About/AboutTechstack.js

'use client';

import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { AboutTitle, AboutParagraph } from '@/app/components/About/AboutStyles';

export default function AboutTechstack() {
  return (
    <>
      <ScrollToTop />
      <AboutTitle>Techstack</AboutTitle>
      <AboutParagraph>Technologies and tools used in this project:</AboutParagraph>
      <AboutParagraph>
        ● Next.js ● React ● HTML ● CSS ● JavaScript ● GitHub ● Node.js ● Vercel ● useSWR ● react-hot-toast ● MongoDB ●
        Cloudinary ● Figma ● Lottie Files ● Affinity Designer
      </AboutParagraph>
    </>
  );
}
