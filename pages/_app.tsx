// @ts-nocheck
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";

import {
  getDefaultConfig,
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, useDisconnect } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  trustWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig } from "wagmi";
import { useInitalizeNear } from "../utils/initializeNear";
import { useEffect } from "react";

const queryClient = new QueryClient();

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        trustWallet,
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        coinbaseWallet,
      ],
    },
  ],
  {
    appName: "My RainbowKit App",
    projectId: "827cdf5c2c977fd6cc9fa0cd9ca16329",
  }
);

const config = createConfig({
  connectors,
  appName: "My RainbowKit App",
  projectId: "827cdf5c2c977fd6cc9fa0cd9ca16329",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
} as any);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const allData = useInitalizeNear();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <NextUIProvider>
            <NextThemesProvider>
              <Component {...pageProps} config={config} />
              <Toaster
                toastOptions={{
                  style: {
                    background: "black",
                    color: "white",
                  },
                  className: "class",
                }}
              />
            </NextThemesProvider>
          </NextUIProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
