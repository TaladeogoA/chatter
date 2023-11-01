import Navbar from "@/components/navbar/Navbar";
import { CategoriesContext } from "@/context/CategoriesContext";
import { ChatterContext } from "@/context/ChatterContext";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";

const SingleCategory = () => {
  const router = useRouter();
  const { category } = router.query;
  const { articles } = useContext(ChatterContext);
  const categories = useContext(CategoriesContext);

  const selectedCategory = categories?.find((cat) => cat.name === category);
  const categoryArticles = articles.filter(
    (article) => article.category === category
  );
  console.log("Category articles: ", categoryArticles);
  console.log("Selected category: ", selectedCategory);

  return (
    <Box>
      <Navbar />
      <Flex
        m="2rem"
        bgColor="black"
        color="white"
        borderRadius="1rem"
        gap="1rem"
      >
        <Box p="2rem">
          <Box>
            <Text fontSize="4xl" className="tagline">
              {selectedCategory?.name}.
            </Text>
          </Box>

          <Box>
            <Text>{selectedCategory?.description}.</Text>
          </Box>
        </Box>

        <Box p="2rem">
          <Flex alignItems="center" justifyContent="space-between">
            <Text>Articles</Text>
            <Text>{categoryArticles?.length}</Text>
          </Flex>
          
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleCategory;
