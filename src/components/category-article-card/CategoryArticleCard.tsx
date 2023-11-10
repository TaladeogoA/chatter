import { CategoryContentProps } from "@/types";
import { daysSinceDate } from "@/utils/dateUtils";
import { calculateReadingTime } from "@/utils/textUtils";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CategoryArticleCard: React.FC<{ article: CategoryContentProps }> = ({
  article,
}) => {
  const { title, author, categories, slug, _createdAt, body } = article;
  const readingTime = calculateReadingTime(body);

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
            <Text mr=".5rem">{author?.displayName}</Text>
          </Link>
          <>&#8226;</>
          <Text mx=".5rem">{readingTime.text}</Text>
          <>&#8226;</>

          {categories?.map((category) => (
            <Flex key={category._id}>
              <Box>
                <Link href={`/categories/${category._id}`}>
                  <Text ml=".5rem">{category.title}</Text>
                </Link>
              </Box>
              <>&#8226;</>
            </Flex>
          ))}
        </Flex>

        <Text>{daysSinceDate(_createdAt)}</Text>
      </Flex>
    </Box>
  );
};

export default CategoryArticleCard;
