import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { TrendingArticleCard } from "../trending-article-card/TrendingArticleCard";
import { Scrollbar } from "react-scrollbars-custom";
import { Article } from "@/types";

const Banner = ({ topArticles }: { topArticles: Article[] }) => {
  return (
    <Flex
      as="header"
      h="calc(100% - 10rem)"
      px="6rem"
      my="1rem"
      alignItems="start"
      gap="2rem"
    >
      <Flex h="100%" flexDir="column" w="50%" mt="6rem">
        <Heading
          as="h1"
          fontSize="7xl"
          fontWeight="bold"
          my="4rem"
          color="black"
          className="toledo"
        >
          Welcome to the Place Words Come Alive.
        </Heading>

        <Flex gap="1rem" pr="2rem" mt="3rem">
          <Input
            placeholder="Search for articles"
            border="none"
            borderBottom="1px solid black"
            borderRadius="none"
            focusBorderColor="none"
            _hover={{
              borderBottom: "1px solid black",
            }}
          />
          <Button px="2rem" bgColor="black" color="white">
            Search
          </Button>
        </Flex>
      </Flex>
      <Flex flexDir="column" w="50%" h="100%">
        <Text
          fontWeight="extrabold"
          fontSize="4xl"
          my="1rem"
          w="80%"
          mx="auto"
          className="toledo"
        >
          Trending on Chatter
        </Text>
        <Scrollbar
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "2rem",
          }}
        >
          <Flex flexDir="column" h="100%" gap="2rem">
            {topArticles?.map((article: Article) => (
              <TrendingArticleCard key={article._id} article={article} />
            ))}
          </Flex>
        </Scrollbar>
      </Flex>
    </Flex>
  );
};

export default Banner;
