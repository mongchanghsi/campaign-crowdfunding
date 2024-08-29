import { LegacyRef, forwardRef } from "react";
import { NavigationContainer, NavigationIcon } from "./style";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navigation = forwardRef((_, ref: LegacyRef<HTMLElement>) => {
  return (
    <NavigationContainer ref={ref}>
      <NavigationIcon>Crowdfunding</NavigationIcon>
      <ConnectButton />
    </NavigationContainer>
  );
});

export default Navigation;
