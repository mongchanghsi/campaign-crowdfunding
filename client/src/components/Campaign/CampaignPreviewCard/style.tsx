import styled, { css } from "styled-components";

export const CampaignPreviewCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border-radius: 12px;

  ${({ theme }) => css`
    background: ${theme.secondary};
  `};
`;

export const CampaignPreviewCardTitle = styled.p`
  font-size: 24px;

  ${({ theme }) => css`
    color: ${theme.dark};
  `};
`;

export const CampaignPreviewCardDescription = styled.p`
  font-size: 18px;

  ${({ theme }) => css`
    color: ${theme.light};
  `};
`;
