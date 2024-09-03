import { LegacyRef, forwardRef } from "react";
import {
  NavigationContainer,
  NavigationIcon,
  NavigationSection,
} from "./style";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeToggle from "../Theme/ThemeToggle";
import Link from "next/link";

const Navigation = forwardRef((_, ref: LegacyRef<HTMLElement>) => {
  return (
    <NavigationContainer ref={ref}>
      <Link href="/">
        <NavigationIcon>Crowdfunding</NavigationIcon>
      </Link>
      <NavigationSection>
        <ThemeToggle />
        <ConnectButton />
      </NavigationSection>
    </NavigationContainer>
  );
});

export default Navigation;
