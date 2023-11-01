import {
  Box,
  Flex,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ChatterContext } from "@/context/ChatterContext";
import CategoryArticleCard from "../category-article-card/CategoryArticleCard";
import { Scrollbar } from "react-scrollbars-custom";
import { PropagateLoader } from "react-spinners";
import { Article } from "@/types";
import { CategoriesContext } from "@/context/CategoriesContext";
import { filterAndSortArticles } from "@/utils/categoriesUtil";
import Link from "next/link";

interface SortedArticle {
  category: string;
  articles: Article[];
  description: string;
  relatedCategories: string[];
}

const Categories = () => {
  const { articles } = useContext(ChatterContext);
  const categories = useContext(CategoriesContext);

  const [sortedArticles, setSortedArticles] = useState<SortedArticle[]>([]);

  useEffect(() => {
    const sorted = filterAndSortArticles(articles, categories);
    setSortedArticles(sorted);
  }, [articles, categories]);

  if (!articles || !categories) {
    return <PropagateLoader color="#000" />;
  }

  return (
    <Box px="6rem" mt="4rem" w="100%" as="section">
      <Tabs colorScheme="blackAlpha" h="100%">
        <TabList overflow="hidden" h="100%">
          <Scrollbar style={{ height: "5rem", overflowY: "hidden" }}>
            {categories?.map((category) => (
              <Tab key={category.id} whiteSpace="nowrap">
                {category.name}
              </Tab>
            ))}
          </Scrollbar>
        </TabList>

        <TabPanels mt="3rem">
          {sortedArticles.map(
            ({ category, description, articles, relatedCategories }) => (
              <TabPanel key={category}>
                <Flex gap="6rem">
                  <Box w="40%">
                    <Link href={`/categories/${category}`}>
                      <Text
                        fontWeight="semibold"
                        fontSize="5xl"
                        mx="auto"
                        color="black"
                        as="button"
                        className="toledo"
                      >
                        {category}
                      </Text>
                    </Link>

                    <Text>{description}.</Text>

                    <Grid templateColumns="repeat(2, 1fr)" gap="1rem" mt="2rem">
                      {relatedCategories?.map((relatedCategory) => (
                        <Tag
                          key={relatedCategory}
                          size="lg"
                          bgColor="black"
                          color="white"
                          borderRadius="full"
                          py=".5rem"
                          px="2rem"
                        >
                          {relatedCategory}
                        </Tag>
                      ))}
                    </Grid>
                  </Box>
                  <Flex flexDir="column" w="55%" gap="4rem">
                    {articles.map((article) => (
                      <CategoryArticleCard key={article.id} article={article} />
                    ))}
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      mx="auto"
                      color="black"
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      <Link
                        href={`/categories/${category}`}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        See more on {category} &rarr;
                      </Link>
                    </Text>
                  </Flex>
                </Flex>
              </TabPanel>
            )
          )}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Categories;
