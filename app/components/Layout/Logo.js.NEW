// /app/components/Layout/Logo.js

import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: auto;
  height: auto;
`;

export default function Logo() {
  const [logoSrc, setLogoSrc] = useState('/images/gmndr-demobits-logo.png');

  useEffect(() => {
    // Append a timestamp only on the client side
    setLogoSrc(`/images/gmndr-demobits-logo.png?v=${new Date().getTime()}`);
  }, []);

  return (
    <LogoContainer>
      <Image src={logoSrc} alt='GMNDR Demo Logo' width={70} height={26} />
    </LogoContainer>
  );
}
