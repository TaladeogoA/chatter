import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import theme from "../utils/themes";
import "../styles/carousel.scss";
import "../styles/scrollbar.scss";
import "../styles/_global.scss";
import { UserProvider } from "@/context/UserContext";
import { SearchProvider } from "@/context/SearchContext";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <SearchProvider>
            <Component {...pageProps} />
            <Analytics />
          </SearchProvider>
        </UserProvider>
        <Toaster />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
