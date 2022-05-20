import type { AppProps } from 'next/app'

import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import NextNProgress from "nextjs-progressbar";

import "@fontsource/red-hat-display/400.css";
import "@fontsource/red-hat-display/500.css";
import "@fontsource/red-hat-display/600.css";
import "@fontsource/red-hat-display/700.css";

import "@fontsource/syncopate/700.css"
import "@fontsource/sen/400.css"
import "@fontsource/sen/700.css";

import { DataProvider } from '../contexts/DataContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DataProvider>
        <ChakraProvider theme={theme}>
          <NextNProgress />
          <Component {...pageProps} />
        </ChakraProvider>
      </DataProvider>
    </>
  );
}

export default MyApp
