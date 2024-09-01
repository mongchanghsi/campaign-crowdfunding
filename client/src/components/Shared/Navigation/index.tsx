import { LegacyRef, forwardRef } from "react";
import {
  NavigationContainer,
  NavigationIcon,
  NavigationSection,
} from "./style";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeToggle from "../Theme/ThemeToggle";

const Navigation = forwardRef((_, ref: LegacyRef<HTMLElement>) => {
  return (
    <NavigationContainer ref={ref}>
      <NavigationIcon>Crowdfunding</NavigationIcon>
      <NavigationSection>
        <ThemeToggle />
        <ConnectButton />
      </NavigationSection>
    </NavigationContainer>
  );
});

export default Navigation;
