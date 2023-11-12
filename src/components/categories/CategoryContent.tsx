import { useGetCategoryArticles } from "@/services/home-page";
import { CategoryContentProps } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import CategoryArticleCard from "../category-article-card/CategoryArticleCard";
import { PropagateLoader } from "react-spinners";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const CategoryContent: React.FC<{
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
}> = ({ categoryId, categoryName, categoryDescription }) => {
  const { data, isLoading, error } = useGetCategoryArticles(categoryId);
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
            _hover={{
              textDecoration: "underline",
            }}
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
        <Link href={`/categories/${categoryId}`}>
          <Flex
            alignItems="center"
            justifyContent="center"
            gap=".5rem"
            textDecor="underline"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text textAlign="center">See more</Text>
            <MdKeyboardDoubleArrowRight
              style={{
                marginTop: "0.2rem",
              }}
            />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default CategoryContent;
