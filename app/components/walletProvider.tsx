"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

export const config = getDefaultConfig({
    appName: 'DOF',
    projectId: 'random',
    chains: [sepolia],
    ssr: true, 
  });

const queryClient = new QueryClient();

const WalletProvider = ({children}: {children: React.ReactNode}) => {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
};

export default WalletProvider;