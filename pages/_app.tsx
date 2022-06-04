import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import NextNProgress from "nextjs-progressbar";

import "@fontsource/red-hat-display/400.css";
import "@fontsource/red-hat-display/500.css";
import "@fontsource/red-hat-display/600.css";
import "@fontsource/red-hat-display/700.css";

import "@fontsource/syncopate/700.css";
import "@fontsource/sen/400.css";
import "@fontsource/sen/700.css";

import { RecoilRoot } from "recoil";

import { MoralisProvider } from "react-moralis";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl={process.env[`NEXT_PUBLIC_SERVER_URL`]!}
      appId={process.env[`NEXT_PUBLIC_APP_ID`]!}
    >
      <RecoilRoot>
        <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
          <ChakraProvider theme={theme}>
            <NextNProgress />
            <Component {...pageProps} />
          </ChakraProvider>
        </ThirdwebProvider>
      </RecoilRoot>
    </MoralisProvider>
  );
}

export default MyApp;
