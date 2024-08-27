// /app/components/Review/ReviewStyles.js

import styled from 'styled-components';

// Review Card Styles

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CardContainer = styled.div`
  background-color: var(--color-review-card-background);
  border: 1px solid var(--color-review-card-border);
  padding: 1.2rem;
  border-radius: 0.6rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
  margin: 0.6rem 0;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative; /* Make sure the IDLabel can be positioned absolutely within this container */

  &:first-of-type {
    margin-top: 1.5rem; /* Spezielle Margin für den ersten Container */
  }

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
  }
`;

export const IDLabel = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-light);
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  margin: 0;
  padding: 0.2rem 0.5rem;
  /* background-color: var(--color-review-card-background); 
  border-radius: 0.3rem; */
`;

export const Email = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text-medium);
  margin-bottom: 0.6rem;
`;

export const Note = styled.p`
  font-size: 1rem;
  color: var(--color-review-text);
  margin-bottom: 0.9rem;
  padding: 0.6rem; /* 10px */
  border: 1px solid var(--color-input-border);
  border-radius: 0.3rem;
  background-color: var(--color-input-background);
`;

export const StarsContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.9rem;
`;

export const CreatedUpdated = styled.div`
  font-size: 0.8rem;
  color: var(--color-review-note);
  margin-bottom: 0.2rem;
`;

// Form Styles
export const FormContainer = styled.form`
  background-color: var(--color-form-background);
  padding: 1.3rem;
  border-radius: 0.6rem;
  box-shadow: 0 0.3rem 0.4rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1.3rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.3rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 0.3rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.3rem;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-input-background);
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.3rem;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-input-background);
`;

export const RatingContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.6rem;
`;

export const HiddenInput = styled.input`
  display: none;
`;
