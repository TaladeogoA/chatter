import { buildImageUrl } from "@/services/sanityImageBuilder";
import { Article } from "@/types";
import { parseDate } from "@/utils/dateUtils";
import { calculateReadingTime } from "@/utils/textUtils";
import { Box, Flex, Image, Tag, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface Props {
  article: Article;
}

const MainSpotlightCard: React.FC<Props> = ({ article }) => {
  const { slug, title, author, categories, _createdAt, body, image } = article;
  const imageUrl = image ? buildImageUrl(image).url() : "";
  const { day, month, year } = parseDate(_createdAt);
  const readingTime = calculateReadingTime(body);

  return (
    <Link
      href={`/articles/${slug?.current}`}
      passHref
      style={{
        height: "100%",
      }}
    >
      <Flex flexDir="column" h="100%" gap="1rem">
        <Flex h="60%">
          <Image
            src={
              image ? imageUrl : "https://placehold.co/600x400?text=No+Image"
            }
            alt=""
            w="100%"
            h="100%"
            objectFit="cover"
            borderRadius=".2rem"
          />
        </Flex>
        <Flex flexDir="column" gap="1rem" h="50%">
          <Text fontSize="0.8rem" fontWeight="300">
            {categories && categories.length > 0 ? categories[0].title : ""}
          </Text>
          <Box>
            <Text
              fontSize="3rem"
              fontWeight="600"
              className="playfair"
              lineHeight="1.2"
            >
              {title}
            </Text>
            <Text fontSize="1rem" whiteSpace="nowrap">
              {`${month} ${day}, ${year}`}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Link>
  );
};

export default MainSpotlightCard;
