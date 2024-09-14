import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import Banner from "@/components/banner/Banner";
import Categories from "@/components/categories/Categories";
import Footer from "@/components/footer/Footer";
import Loader from "../../loading";
import { useGetHomePageData } from "@/services/home-page";
import MostRecent from "@/components/most-recent";

const Home = () => {
  const {
    trendingPosts,
    categories,
    trendingPostsLoading,
    categoriesLoading,
    mostRecentPosts,
    mostRecentPostsLoading,
  } = useGetHomePageData();

  return (
    <>
      {trendingPostsLoading || categoriesLoading || mostRecentPostsLoading ? (
        <Loader />
      ) : (
        <Box
          px={{
            base: "1rem",
            lg: "8rem",
          }}
          pb="2rem"
          w="100%"
          overflowY="auto"
          sx={{
            "::-webkit-scrollbar": {
              width: "10px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "6px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "darkgray",
            },
          }}
          position="relative"
        >
          <Navbar />
          <Banner topArticles={trendingPosts} />
          <Categories categories={categories} />
          <MostRecent data={mostRecentPosts} />
          <Footer />
        </Box>
      )}
    </>
  );
};

export default Home;
