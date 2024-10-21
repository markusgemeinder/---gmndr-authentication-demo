// /app/components/Common/CommonStyles.js

import styled from 'styled-components';

export const Main = styled.main`
  margin: 4rem auto;
  padding: 1.4rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: purple; */

  @media (min-width: 768px) and (min-height: 768px) {
    padding: 2.4rem 1rem;
    margin: 5rem auto;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 75%;
  max-width: 22rem;
  /* background-color: yellow; */

  @media (min-width: 768px) and (min-height: 768px) {
    width: 80%;
    max-width: 30rem;
  }
`;

export const NarrowContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem;
  color: var(--color-title);
`;

export const Subtitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  margin: 0.5rem;
  color: var(--color-title);
`;

export const Headline = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 0.5rem;
  color: var(--color-title);
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  text-align: center;
  margin: 0.5rem;
  color: var(--color-text);
`;

export const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
`;

export const List = styled.li`
  display: flex;
  align-items: flex-start;
  position: relative;
  text-align: center;
  margin: 0.1rem;
  color: var(--color-text);

  &::before {
    content: '▶';
    position: absolute;
    left: -18px;
    font-weight: bold;
    color: var(--color-title);
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 1.4rem;
  gap: 0.6rem;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) and (min-height: 768px) {
    gap: 1rem;
    flex-direction: row;
  }
`;

export const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);

  @media (min-width: 768px) and (min-height: 768px) {
    width: 220px;
    height: 220px;
  }
`;
