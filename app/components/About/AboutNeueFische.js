// /app/components/About/AboutNeueFische.js

'use client';

import { AboutTitle, AboutParagraph } from './AboutStyles';

export default function AboutNeueFische() {
  return (
    <>
      <AboutTitle>Features</AboutTitle>
      <AboutParagraph>
        1. **Project Overview**: TripTrove allows users to discover and contribute travel reviews, providing insights
        into various destinations.
      </AboutParagraph>
      <AboutParagraph>
        2. **Neue Fische**: This section offers information about new and exciting travel experiences and places to
        explore.
      </AboutParagraph>
      <AboutParagraph>
        3. **Tech Stack**: The platform is built using modern technologies including React, Next.js, and MongoDB,
        ensuring a smooth and efficient user experience.
      </AboutParagraph>
      <AboutParagraph>
        4. **Contact**: Users can easily reach out for support, feedback, or inquiries, ensuring a user-friendly
        experience.
      </AboutParagraph>
    </>
  );
}
