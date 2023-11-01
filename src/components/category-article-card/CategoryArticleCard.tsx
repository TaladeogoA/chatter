import { Article } from "@/types";
import { formatPostedOn } from "@/utils/dateUtils";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CategoryArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const { id, title, author, category, postedOn } = article;
  const { day, month, year } = formatPostedOn(postedOn);

  return (
    <Box>
      <Link href={`/articles/${id}`}>
        <Text fontWeight="semibold" fontSize="2xl">
          {title}
        </Text>
      </Link>

      <Divider my=".5rem" size="5px" borderColor="black" />

      <Flex justifyContent="space-between" fontSize="sm">
        <Flex>
          <Link href={`/categories/`}>
            <Text mr=".5rem">{author}</Text>
          </Link>
          <>&#8226;</>
          <Text ml=".5rem">6 mins read</Text>
          <>&#8226;</>

          <Link href={`/authors/`}>
            <Text ml=".5rem">{category}</Text>
          </Link>
        </Flex>

        <Text>
          {day} {month} {year}
        </Text>
      </Flex>
    </Box>
  );
};

export default CategoryArticleCard;
