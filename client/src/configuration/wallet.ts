import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import ENVIRONMENT from "./environment";

export const walletConfig = getDefaultConfig({
  appName: "Crowdfunding",
  projectId: ENVIRONMENT.walletConnectId,
  chains: [sepolia],
  ssr: true,
});
