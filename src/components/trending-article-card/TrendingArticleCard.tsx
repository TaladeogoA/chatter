import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  Skeleton,
  Divider,
} from "@chakra-ui/react";
import { Article } from "@/types";
import Link from "next/link";
import { parseDate } from "@/utils/dateUtils";
import { buildImageUrl } from "@/services/sanityImageBuilder";
import { calculateReadingTime } from "@/utils/textUtils";

interface ArticleCardProps {
  article?: Article;
}

const TrendingArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  if (!article) {
    return <ArticleCardSkeleton />;
  }
  const { slug, title, author, image, categories, _createdAt, body } = article;
  const imageUrl = image ? buildImageUrl(image).url() : "";
  const { day, month, year } = parseDate(_createdAt);
  const readingTime = calculateReadingTime(body);

  return (
    <Link
      href={`/articles/${slug?.current}`}
      passHref
      style={{
        height: "max-content",
      }}
    >
      <Flex
        mr="1rem"
        flexDir="column"
        overflowX="hidden"
        h="20rem"
        _hover={{
          "& svg": {
            transform: "rotate(75deg)",
            transition: "all .3s ease-in-out",
          },
        }}
      >
        <Box h="50%">
          {image && (
            <Image src={imageUrl} alt="" w="100%" h="100%" objectFit="cover" />
          )}
        </Box>

        <Flex
          alignItems="flex-end"
          justifyContent="space-between"
          gap={{
            base: "1rem",
            md: "2rem",
          }}
        >
          <Text
            as="h3"
            fontSize={{
              base: "md",
              lg: "lg",
            }}
            fontWeight="semibold"
            mt=".5rem"
            textTransform="capitalize"
            // className="toledo"
          >
            {title}
          </Text>
          <Flex flexDir="column" fontWeight="bold" alignItems="flex-end">
            <Text
              align="right"
              fontSize={{
                base: "lg",
                md: "xl",
              }}
            >
              {day}
            </Text>
            <Text
              align="right"
              w="100%"
              whiteSpace="nowrap"
              fontSize={{
                base: "sm",
                md: "md",
              }}
            >
              {month} {year}
            </Text>
          </Flex>
        </Flex>

        <Divider my=".5rem" size="5px" borderColor="black" />

        <Flex
          gap=" .5rem"
          alignItems="center"
          // wrap="wrap"
        >
          <Text fontSize="sm" whiteSpace="nowrap">
            {categories?.[0]?.title}
          </Text>

          <>&#8226;</>

          <Text fontSize="sm" whiteSpace="nowrap">
            {readingTime.text}
          </Text>
          <>&#8226;</>

          <Text fontSize="sm" whiteSpace="nowrap">
            {author?.displayName.slice(0, 15) + "..."}
          </Text>
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

export default TrendingArticleCard;
