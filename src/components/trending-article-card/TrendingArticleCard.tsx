import {
  Avatar,
  Box,
  Flex,
  Image,
  Tag,
  Text,
  Skeleton,
  Divider,
} from "@chakra-ui/react";
import { Article } from "@/types";
import Link from "next/link";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { formatPostedOn } from "@/utils/dateUtils";

interface ArticleCardProps {
  article?: Article;
}

const TrendingArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  if (!article) {
    return <ArticleCardSkeleton />;
  }
  const { id, title, category, author, bannerImage, postedOn } = article;
  const { day, month, year } = formatPostedOn(postedOn);

  return (
    <Link href={`/articles/${id}`} passHref>
      <Flex w="80%" mx="auto" flexDir="column" h="33%">
        <Box position="relative" h="40%">
          <Image src={bannerImage} alt="" w="100%" h="100%" objectFit="cover" />
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor="black"
            w="5rem"
            h="5rem"
            borderRadius="full"
            position="absolute"
            top="40%"
            right="-10%"
          >
            <ArrowUpIcon
              w={10}
              h={10}
              color="white"
              transform="rotate(45deg)"
            />
          </Flex>
        </Box>

        <Flex alignItems="flex-end" justifyContent="space-between" gap="2rem">
          <Text
            as="h3"
            fontSize="2xl"
            fontWeight="semibold"
            mt=".5rem"
            textTransform="capitalize"
            // className="toledo"
          >
            {title}
          </Text>
          <Flex flexDir="column" fontWeight="bold" alignItems="flex-end">
            <Text align="right" fontSize="4xl">
              {day}
            </Text>
            <Text align="right" w="100%" whiteSpace="nowrap">
              {month} {year}
            </Text>
          </Flex>
        </Flex>

        <Divider my=".5rem" size="5px" borderColor="black" />

        <Flex gap=" .5rem" alignItems="center">
          <Link href={`/categories/${category}`}>
            <Text fontSize="sm" whiteSpace="nowrap">
              {category}
            </Text>
          </Link>
          <>&#8226;</>
          <Text fontSize="sm" whiteSpace="nowrap">
            6 mins read
          </Text>
          <>&#8226;</>

          <Link href={`/authors/${author}`}>
            <Text fontSize="sm" whiteSpace="nowrap">
              {author}
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Link>
  );
};

const ArticleCardSkeleton: React.FC = () => {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box maxH="40%">
        <Skeleton borderRadius="2rem" w="100%" h="100%" />
      </Box>

      <Box mt="1rem">
        <Skeleton height="1.5rem" />
        <Skeleton height="1rem" mt=".5rem" />
        <Skeleton height="1rem" mt=".5rem" />
      </Box>
      <Flex mt=".5rem" gap=".5rem">
        <Avatar />
        <Box>
          <Skeleton height="1rem" width="6rem" />
          <Skeleton height="1rem" width="4rem" mt=".25rem" />
        </Box>
      </Flex>
    </Box>
  );
};

export { TrendingArticleCard, ArticleCardSkeleton };
