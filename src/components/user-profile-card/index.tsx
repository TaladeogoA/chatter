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
    <Link href={`/articles/${slug?.current}`}>
      <Flex
        justifyContent="space-between"
        p="1rem"
        _hover={{
          bgColor: "#F2F2F2",
          cursor: "pointer",
        }}
      >
        <Box w="83%">
          <Text fontWeight="semibold" fontSize="xl">
            {title}
          </Text>

          <Text my=".2rem">{brief.substring(0, 70)}...</Text>
          <Flex>
            <Text mr=".5rem">{authorName}</Text>
            <>&#8226;</>
            <Text ml=".5rem">{readingTime?.text}</Text>
          </Flex>
        </Box>
        <Text>{daysSinceDate(_createdAt)}</Text>
      </Flex>
    </Link>
  );
};

export default UserProfileCard;
