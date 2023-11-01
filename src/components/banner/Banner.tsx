import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { TrendingArticleCard } from "../trending-article-card/TrendingArticleCard";
import { Scrollbar } from "react-scrollbars-custom";
import React, { useContext } from "react";
import { TopArticlesContext } from "@/context/TopArticlesContext";

const Banner = () => {
  const topArticles = useContext(TopArticlesContext);

  return (
    <Flex
      as="header"
      h="calc(100% - 10rem)"
      px="6rem"
      my="1rem"
      alignItems="start"
      gap="2rem"
    >
      <Flex h="100%" flexDir="column" w="50%">
        <Heading
          as="h1"
          fontSize="7xl"
          fontWeight="bold"
          my="2rem"
          color="black"
          className="toledo"
        >
          Welcome to the Place Words Come Alive.
        </Heading>

        <Flex gap="1rem" pr="2rem" mt="3rem">
          <Input placeholder="Search for articles" borderRadius="full" />
          <Button borderRadius="full" px="2rem" bgColor="black" color="white">
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
            {topArticles?.map((article) => (
              <TrendingArticleCard key={article.id} article={article} />
            ))}
          </Flex>
        </Scrollbar>
      </Flex>
    </Flex>
  );
};

export default Banner;
