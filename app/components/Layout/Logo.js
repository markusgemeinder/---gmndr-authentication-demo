// /app/components/Layout/Logo.js

import styled from 'styled-components';
import Image from 'next/image';

const logoSrc = '/images/gmndr-demobits-logo.png?v=' + new Date().getTime();

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: auto;
  height: auto;
`;

export default function Logo() {
  return (
    <LogoContainer>
      <Image src={logoSrc} alt='GMNDR Demo Logo' width={70} height={28} />
    </LogoContainer>
  );
}
