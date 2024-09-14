import CategoryArticleCard from "@/components/category-article-card/CategoryArticleCard";
import Navbar from "@/components/navbar/Navbar";
import { SearchContext } from "@/context/SearchContext";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";

const SearchPage = () => {
  const router = useRouter();
  const { term } = router.query;
  const { searchResults, userResults } = useContext(SearchContext);

  return (
    <Box
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
      mt="6rem"
    >
      <Navbar existingTerm={term as string} />
      <Box
        as="section"
        w={{ base: "90%", md: "60%", xl: "50%" }}
        mx="auto"
        mt="2rem"
      >
        <Text
          fontWeight="semibold"
          fontSize={{ base: "2xl", md: "4xl" }}
          textAlign="center"
        >
          <Text as="span" color="GrayText">
            Result{searchResults.length > 1 ? "s" : ""} for{" "}
          </Text>
          {term}
        </Text>
        <Flex
          flexDir="column"
          justify="center"
          align="center"
          mt="2rem"
          h="max-content"
        >
          {searchResults.length === 0 ? (
            <>
              <Text fontSize={{ base: "md", md: "xl" }} color="gray.500">
                No posts found for {term}
              </Text>
              <Text fontSize={{ base: "md", md: "xl" }} color="gray.500">
                You can try the following:
              </Text>
              <Text fontSize={{ base: "md", md: "xl" }} color="gray.500">
                - Check your spelling
              </Text>
              <Text fontSize={{ base: "md", md: "xl" }} color="gray.500">
                - Try more general words
              </Text>
            </>
          ) : (
            <Flex flexDir="column" justify="center" align="center" gap="1rem">
              {searchResults.map((result, index) => (
                <CategoryArticleCard article={result} key={result._id} />
              ))}
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default SearchPage;
