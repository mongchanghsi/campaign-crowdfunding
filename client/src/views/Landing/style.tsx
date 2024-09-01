import styled, { css } from "styled-components";

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  gap: 18px;
`;

export const LandingTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.dark};
  `};
`;
