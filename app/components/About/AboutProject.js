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
      <AboutTitle>Welcome!</AboutTitle>
      <AboutParagraph>What you see here is "TripTrove" in its evolved Version 2.</AboutParagraph>
      <AboutHeadline>Version 1</AboutHeadline>
      <AboutParagraph>
        The first version of the travel planning app was developed in teamwork by Aika Akymbaeva, Uwe Bury, Felix
        Jentsch, and Markus Gemeinder, and presented on 9th February 2024 as the final project of the neue fische Web
        Developer Bootcamp.
      </AboutParagraph>
      <AboutParagraph>
        Part of the task was a backend database connection; the frontend features a complex form functionality with
        individually designed "toast messages" (warning messages).
      </AboutParagraph>
      <AboutLinkContainer>
        <AboutLink href='https://trip-trove-v1-neue-fische-capstone-finale-20240209.vercel.app/' target='_blank'>
          Vercel Deployment (Version 1)
        </AboutLink>
        <AboutLink
          href='https://github.com/markusgemeinder/---trip-trove--v1-neue-fische-capstone-finale-20240209'
          target='_blank'>
          GitHub Code (Version 1)
        </AboutLink>
      </AboutLinkContainer>

      <AboutHeadline>Version 2</AboutHeadline>
      <AboutParagraph>
        Version 2 is an individual advancement by Markus Gemeinder and includes, beyond Version 1, the following
        exemplary features:
      </AboutParagraph>

      <AboutListContainer>
        <AboutList>Responsive design for mobile devices with sandwich menu</AboutList>
        <AboutList>Optimized UX/UI design</AboutList>
        <AboutList>Pack list presets now modifiable by users</AboutList>
        <AboutList>Checkboxes for checking off already packed items</AboutList>
        <AboutList>Drag & Drop Image Upload (Cloudinary)</AboutList>
        <AboutList>Page exit: Warning when leaving the page without prior saving</AboutList>
        <AboutList>Search function (real-time search)</AboutList>
        <AboutList>Loading and error animations</AboutList>
        <AboutList>Info section with language selection toggle button EN/DE</AboutList>
      </AboutListContainer>

      <AboutLinkContainer>
        <AboutLink href='https://github.com/markusgemeinder/---trip-trove--v2-evolution' target='_blank'>
          GitHub Code (Version 2)
        </AboutLink>
      </AboutLinkContainer>
    </>
  );
}
