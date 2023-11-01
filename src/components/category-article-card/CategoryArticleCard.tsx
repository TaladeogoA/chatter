import { CategoryContentProps } from "@/types";
import { daysSinceDate } from "@/utils/dateUtils";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CategoryArticleCard: React.FC<{ article: CategoryContentProps }> = ({
  article,
}) => {
  const { title, author, category, slug, _createdAt } = article;

  return (
    <Box>
      <Link href={`/articles/${slug?.current}`}>
        <Text fontWeight="semibold" fontSize="2xl">
          {title}
        </Text>
      </Link>

      <Divider my=".5rem" size="5px" borderColor="black" />

      <Flex justifyContent="space-between" fontSize="sm">
        <Flex>
          <Link href={`/authors/`}>
            <Text mr=".5rem">{author?.name}</Text>
          </Link>
          <>&#8226;</>
          <Text ml=".5rem">6 mins read</Text>
          <>&#8226;</>

          <Link href={`/categories/`}>
            <Text ml=".5rem">{category?.title}</Text>
          </Link>
        </Flex>

        <Text>{daysSinceDate(_createdAt)}</Text>
      </Flex>
    </Box>
  );
};

export default CategoryArticleCard;
