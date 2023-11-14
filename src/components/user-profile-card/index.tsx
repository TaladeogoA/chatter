import { Article } from "@/types";
import { daysSinceDate } from "@/utils/dateUtils";
import { calculateReadingTime } from "@/utils/textUtils";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";

interface UserProfileCardProps {
  article: Article;
  authorName: string;
}

const UserProfileCard: FC<UserProfileCardProps> = ({ article, authorName }) => {
  const { title, _createdAt, brief, body, slug } = article;
  const readingTime = calculateReadingTime(body);
  return (
    <Flex justifyContent="space-between">
      <Box w="85%">
        <Link href={`/articles/${slug?.current}`}>
          <Text fontWeight="semibold" fontSize="xl" mb=".5rem">
            {title}
          </Text>
        </Link>
        <Text>{brief.substring(0, 70)}...</Text>
        <Flex>
          <Text mr=".5rem">{authorName}</Text>
          <>&#8226;</>
          <Text ml=".5rem">{readingTime?.text}</Text>
        </Flex>
      </Box>
      <Text>{daysSinceDate(_createdAt)}</Text>
    </Flex>
  );
};

export default UserProfileCard;
