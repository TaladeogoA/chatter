import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import Banner from "@/components/banner/Banner";
import Categories from "@/components/categories/Categories";
import EditorsPick from "@/components/editors-pick/EditorsPick";
import Footer from "@/components/footer/Footer";
import Loader from "../../loading";

const Home = () => {
  return (
    <>
      <Box
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        h="100vh"
        w="100%"
      >
        <Navbar />
        <Banner />
        <Categories />
        <EditorsPick />
        <Footer />
      </Box>
    </>
  );
};

export default Home;
