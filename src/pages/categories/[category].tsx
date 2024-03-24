import Navbar from "@/components/navbar/Navbar";
import { useGetSingleCategory } from "@/services/category";
import { useGetCategoryArticles } from "@/services/home-page";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Loader from "../../../loading";
import Image from "next/image";
import ConstructionMe from "@/assets/images/Designer.png";

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
  } = useGetCategoryArticles(category as string);

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

        {/* <Box p="2rem">
          <Flex alignItems="center" justifyContent="space-between">
            <Text>Articles</Text>
            <Text>{categoryArticles?.length}</Text>
          </Flex>
        </Box> */}
      </Flex>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        w="50%"
        m="auto"
        mt="3rem"
        textAlign="center"
      >
        <Image
          src={ConstructionMe}
          alt="Under Construction"
          width={200}
          height={200}
        />
        <Text fontSize="xl" fontWeight="semibold" m="auto">
          Looks like you&apos;ve stumbled into the digital equivalent of a
          construction zone. I&apos;m working on it, I promise. 😊
        </Text>
      </Flex>
    </Box>
  );
};

export default SingleCategory;
