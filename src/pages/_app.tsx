import { AppProps } from "next/app";
import "../styles/_global.scss";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/carousel.scss";
import "../styles/scrollbar.scss";
import theme from "../utils/themes";
import { ChatterProvider } from "@/context/ChatterContext";
import { TopArticlesProvider } from "@/context/TopArticlesContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ChatterProvider>
          <TopArticlesProvider>
            <CategoriesProvider>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </CategoriesProvider>
          </TopArticlesProvider>
        </ChatterProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
