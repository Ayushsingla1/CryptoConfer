"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
  Chain,
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


const blockDag = {
  id: 1043,
  name: 'Blockdag',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Primordial BlockDAG Testnet', symbol: 'BDAG', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.primordial.bdagscan.com'] },
  },
  blockExplorers: {
    default: { name: 'bdagscan', url: 'https://primordial.bdagscan.com/' },
  },
} as const satisfies Chain;


export const config = getDefaultConfig({
    appName: 'DOF',
    projectId: 'random',
    chains: [blockDag],
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