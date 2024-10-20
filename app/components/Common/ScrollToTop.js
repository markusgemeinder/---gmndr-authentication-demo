// /app/components/Common/ScrollToTop.js

'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
