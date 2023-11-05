import Navbar from "@/components/navbar/Navbar";
import { useCategoryArticles, useGetSingleCategory } from "@/services/category";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Loader from "../../../loading";

const SingleCategory = () => {
  const router = useRouter();
  const { category } = router.query;
  const {
    data: singleCategory,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetSingleCategory(category as string);
  const {
    data: categoryArticles,
    isLoading: categoryArticlesLoading,
    error: categoryArticlesError,
  } = useCategoryArticles(category as string);

  if (categoryArticlesLoading || categoryLoading) return <Loader />;

  console.log(categoryArticles);
  console.log(singleCategory);

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
              {singleCategory?.[0]?.title}.
            </Text>
          </Box>

          <Box>
            <Text>{singleCategory?.[0]?.description}.</Text>
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
