import styled, { css } from "styled-components";
import { GrowAnimation } from "../Animation/Grow";

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;
`;

export const ProgressBarLabel = styled.p`
  font-size: 16px;
  white-space: nowrap;

  ${({ theme }) => css`
    color: ${theme.dark};
  `};
`;

export const ProgressBarBase = styled.div`
  position: relative;

  width: 100%;
  height: 12px;
  border-radius: 8px;

  ${({ theme }) => css`
    background-color: ${theme.light};
  `};
`;

export const ProgressBarCovered = styled.div<{ towidth: number }>`
  position: absolute;
  height: 12px;
  left: 0;
  top: 0;

  ${({ theme }) => css`
    background-color: ${theme.dark};
  `};

  ${({ towidth }) => css`
    width: ${towidth}%;
    animation: ${GrowAnimation(towidth ?? 0)} 2s ease-out;
    border-radius: ${towidth >= 1 ? "8px" : "8px 0 0 8px"};
  `}
`;
