import { Flex, Heading, Text } from "@chakra-ui/react";
import { Article } from "@/types";
import MainSpotlightCard from "../main-spotlight-card";
import SpotlightCard from "../spotlight-card";

const Banner = ({ topArticles }: { topArticles: Article[] }) => {
  return (
    <Flex
      as="section"
      alignItems="start"
      flexDir="column"
      gap="2rem"
      position="relative"
      my="6rem"
    >
      <Flex h="100%" flexDir="column" my="4.5rem">
        <Heading
          as="h1"
          fontSize={{
            base: "4xl",
            sm: "5xl",
            lg: "11rem",
          }}
          fontWeight="400"
          fontStyle="italic"
          color="black"
          lineHeight="0.8"
        >
          Chatter.
        </Heading>
        <Text fontSize="1.5rem" fontWeight="300">
          Where words come alive.
        </Text>
      </Flex>
      <Flex w="100%" flexDir="column" h="100%">
        <Heading fontSize="2rem" fontWeight="600" mb="1rem">
          Top Chatter
        </Heading>
        <Flex w="100%" gap="2rem" h="100%" alignItems="stretch">
          <Flex w="60%">
            <MainSpotlightCard article={topArticles[0]} />
          </Flex>
          <Flex w="40%" flexDir="column" gap="1rem">
            {topArticles.slice(1, 4).map((article) => (
              <SpotlightCard key={article._id} article={article} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Banner;
