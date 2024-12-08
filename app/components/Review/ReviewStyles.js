// /app/components/Review/ReviewStyles.js

import styled from 'styled-components';

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 96%;
  max-width: 600px;

  /* Mobile First & Tablets im Hochformat */
  @media (min-width: 600px) {
    width: 88%;
    max-width: 32rem;
  }

  /* Smartphones im Querformat */
  @media (min-width: 600px) and (max-width: 1024px) and (orientation: landscape) {
    width: 88%;
    max-width: 24rem;
  }

  /* Desktop & Tablets im Querformat */
  @media (min-width: 1025px) {
    width: 80%;
    max-width: 40rem;
  }
`;

export const CardContainer = styled.div`
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  padding: 1.2rem;
  border-radius: 0.6rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
  margin: 0.2rem 0;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;

  &:first-of-type {
    margin-top: 1.5rem;
  }

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
  }
`;

export const FormContainer = styled.form`
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  border-radius: 0.6rem;
  padding: 1.5rem;
  margin-bottom: 1.3rem;
  box-sizing: border-box;
  width: 96%;
  max-width: 600px;

  /* Mobile First & Tablets im Hochformat */
  @media (min-width: 600px) {
    width: 88%;
    max-width: 32rem;
  }

  /* Smartphones im Querformat */
  @media (min-width: 600px) and (max-width: 1024px) and (orientation: landscape) {
    width: 88%;
    max-width: 24rem;
  }

  /* Desktop & Tablets im Querformat */
  @media (min-width: 1025px) {
    width: 80%;
    max-width: 40rem;
  }
`;

export const InputGroup = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  &:first-child {
    margin-top: 0;
  }

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    margin: 0.8rem 0;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-label);
  margin-right: 1rem;
  line-height: 1.2;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.4rem;
  font-size: 1rem;
  color: var(--color-text);
  box-sizing: border-box;

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

export const InputEmail = styled(Input)`
  color: var(--color-text-light);
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const IDLabel = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-light);
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 0.7rem;
  }
`;

export const Email = styled.div`
  font-weight: 700;
  color: var(--color-text-light);
  margin: 0.4rem 0;
  text-align: left;

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 0.9rem;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-background);

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

export const Note = styled.p`
  color: var(--color-text);
  /* margin-bottom: 0.9rem; */
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
  background-color: var(--color-background);
  text-align: left;

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

export const CharCounter = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-light);
  position: absolute;
  bottom: 0.4rem;
  right: 0.6rem;

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 0.7rem;
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    gap: 0.2rem;
  }
`;

export const CreatedUpdated = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-light);
  padding: 0 0.8rem;
  text-align: center;

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 0.7rem;
  }
`;

export const CardElementsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  /* Für Smartphones im Querformat */
  @media (max-width: 767px) and (orientation: landscape) {
    gap: 0.5rem;
  }
`;
