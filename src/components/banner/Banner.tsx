import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Article } from "@/types";
import { useContext, useState } from "react";
import { SearchContext } from "@/context/SearchContext";
import { useRouter } from "next/router";
import TrendingArticleCard from "../trending-article-card/TrendingArticleCard";

const Banner = ({ topArticles }: { topArticles: Article[] }) => {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const { setSearchQuery } = useContext(SearchContext);

  return (
    <Flex
      as="header"
      h="calc(100% - 10rem)"
      px={{
        base: "1rem",
        md: "3rem",
        lg: "4rem",
      }}
      mt="2rem"
      alignItems="start"
      flexDir={{ base: "column", lg: "row" }}
      gap="2rem"
    >
      <Flex
        h="100%"
        flexDir="column"
        w={{
          base: "100%",
          lg: "45%",
        }}
      >
        <Heading
          as="h1"
          fontSize={{
            base: "4xl",
            sm: "5xl",
            lg: "7xl",
          }}
          fontWeight="bold"
          color="black"
          className="toledo"
          textAlign={{ base: "center", lg: "left" }}
        >
          Welcome to the Place Words Come Alive.
        </Heading>

        <form>
          <Flex
            gap="1rem"
            pr={{
              base: "0",
              md: "1rem",
            }}
            mt={{
              base: "1rem",
              sm: "3rem",
            }}
          >
            <Input
              placeholder="Search for articles"
              border="none"
              borderBottom="1px solid black"
              borderRadius="none"
              focusBorderColor="none"
              _hover={{
                borderBottom: "1px solid black",
              }}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <Button
              px="1rem"
              bgColor="black"
              color="white"
              borderRadius=".2rem"
              className="toledo"
              onClick={(e) => {
                e.preventDefault();
                setSearchQuery(term);
                router.push("/search/[term]", `/search/${term}`);
              }}
            >
              Search
            </Button>
          </Flex>
        </form>
      </Flex>
      <Flex
        flexDir="column"
        w={{
          base: "100%",
          lg: "55%",
        }}
        h="100%"
      >
        <Text
          fontWeight="extrabold"
          fontSize={{
            base: "2xl",
            sm: "3xl",
            lg: "4xl",
          }}
          my="1rem"
          w="80%"
          mx="auto"
          className="toledo"
          textAlign="center"
        >
          Trending on Chatter
        </Text>

        <Flex
          flexDir="column"
          overflowY="auto"
          maxH={{ base: "unset", lg: "60vh" }}
          sx={{
            "::-webkit-scrollbar": {
              width: "7px",
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
          {topArticles?.map((article: Article) => (
            <TrendingArticleCard key={article._id} article={article} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Banner;
