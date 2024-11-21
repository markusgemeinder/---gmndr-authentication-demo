// /app/components/Layout/Logo.js

import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: auto;
  height: auto;

  img {
    width: 70px;
    height: auto;
    filter: brightness(0) invert(1);
  }

  @media (min-width: 768px) and (min-height: 768px) {
    img {
      width: 100px;
      height: auto;
      filter: brightness(0) invert(1);
    }
  }
`;

export default function Logo({ onClick }) {
  const timestamp = new Date().getTime();

  return (
    <LogoContainer onClick={onClick}>
      <img src={`/images/gmndr-dev-bits-logo.svg`} alt='Logo' />
      {/* <img src={`/images/gmndr-dev-bits-logo.svg?${timestamp}`} alt='Logo' /> */}
    </LogoContainer>
  );
}
