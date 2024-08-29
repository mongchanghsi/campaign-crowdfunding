import Theme from "@/components/Shared/Theme/Theme";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, type Locale } from "@rainbow-me/rainbowkit";
import { walletConfig } from "@/configuration/wallet";
import BaseFont from "@/styles/fonts";
import Layout from "@/components/Shared/Layout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${BaseFont.style.fontFamily};
        }
      `}</style>
      <Theme>
        <WagmiProvider config={walletConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </Theme>
    </>
  );
}
