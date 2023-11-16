import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import Banner from "@/components/banner/Banner";
import Categories from "@/components/categories/Categories";
import EditorsPick from "@/components/editors-pick/EditorsPick";
import Footer from "@/components/footer/Footer";
import Loader from "../../loading";
import { useGetHomePageData } from "@/services/home-page";

const Home = () => {
  const {
    trendingPosts,
    categories,
    editorsPicks,
    trendingPostsLoading,
    categoriesLoading,
    editorsPicksLoading,
  } = useGetHomePageData();

  return (
    <>
      {trendingPostsLoading || categoriesLoading || editorsPicksLoading ? (
        <Loader />
      ) : (
        <Box
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          maxH="100vh"
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
        >
          <Navbar />
          <Banner topArticles={trendingPosts} />
          <Categories categories={categories} />
          <EditorsPick data={editorsPicks} />
          <Footer />
        </Box>
      )}
    </>
  );
};

export default Home;
