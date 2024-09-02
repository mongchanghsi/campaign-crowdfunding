import { keyframes } from "styled-components";

export const GrowAnimation = (x: number) => keyframes`
  0% {
    width: 0;
  }

  100% {
    width: ${x}%;
  }
`;
