import { useCategoryArticles } from "@/services/category";
import { CategoryContentProps } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import CategoryArticleCard from "../category-article-card/CategoryArticleCard";
import { PropagateLoader } from "react-spinners";

const CategoryContent: React.FC<{
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
}> = ({ categoryId, categoryName, categoryDescription }) => {
  const { data, isLoading, error } = useCategoryArticles(categoryId);
  if (isLoading || !data) return <PropagateLoader color="#000" />;
  if (error) return <div>failed to load</div>;

  return (
    <Flex gap="6rem" key={categoryId}>
      <Box w="40%">
        <Link href={`/categories/${categoryId}`}>
          <Text
            fontWeight="semibold"
            fontSize="5xl"
            mx="auto"
            color="black"
            as="button"
            className="toledo"
          >
            {categoryName}
          </Text>
        </Link>

        <Text>{categoryDescription}</Text>
      </Box>
      <Flex flexDir="column" w="55%" gap="4rem">
        {data.map((article: CategoryContentProps) => {
          return (
            <CategoryArticleCard
              key={article?.slug?.current}
              article={article}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default CategoryContent;
