import { css, styled } from "styled-components";

export const CampaignDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CampaignDetailsTitle = styled.h2`
  font-size: 32px;
  margin: 0;

  ${({ theme }) => css`
    color: ${theme.dark};
  `};
`;

export const CampaignDetailsDescription = styled.p`
  font-size: 24px;

  ${({ theme }) => css`
    color: ${theme.secondary};
  `};
`;

export const CampaignDetailsLabel = styled.p`
  font-size: 18px;

  ${({ theme }) => css`
    color: ${theme.secondary};
  `};
`;
