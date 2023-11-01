import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Scrollbar } from "react-scrollbars-custom";
import { PropagateLoader } from "react-spinners";
import { useGetAllCategories } from "@/services/category";
import CategoryContent from "./CategoryContent";

interface CategoryType {
  description: string;
  title: string;
  _id: string;
}

const Categories = () => {
  const { data: categories, error, isLoading } = useGetAllCategories();

  if (isLoading) return <PropagateLoader color="#000" />;
  if (error) return <div>failed to load</div>;

  return (
    <Box px="6rem" mt="4rem" w="100%" as="section">
      <Tabs colorScheme="blackAlpha" h="100%">
        <TabList overflow="hidden" h="100%">
          <Scrollbar style={{ height: "5rem", overflowY: "hidden" }}>
            {categories?.map((category: CategoryType) => (
              <Tab key={category._id} whiteSpace="nowrap">
                {category.title}
              </Tab>
            ))}
          </Scrollbar>
        </TabList>

        <TabPanels mt="3rem">
          {/* {sortedArticles.map(
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
                      <CategoryArticleCard
                        key={article.slug.current}
                        article={article}
                      />
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
          )} */}
          {categories?.map((category: CategoryType) => (
            <TabPanel key={category._id}>
              <CategoryContent
                categoryId={category._id}
                categoryName={category.title}
                categoryDescription={category.description}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Categories;
