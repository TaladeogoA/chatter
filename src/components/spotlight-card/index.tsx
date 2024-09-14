import { buildImageUrl } from "@/services/sanityImageBuilder";
import { Article } from "@/types";
import { parseDate } from "@/utils/dateUtils";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  article: Article;
}

const SpotlightCard: React.FC<Props> = ({ article }) => {
  const { slug, title, author, categories, _createdAt, body, image } = article;
  const imageUrl = image ? buildImageUrl(image).url() : "";
  const { day, month, year } = parseDate(_createdAt);

  return (
    <Flex flexDir="column" h="33%">
      <Text fontSize="0.8rem" fontWeight="300">
        {categories && categories.length > 0 ? categories[0].title : ""}
      </Text>
      <Box>
        <Heading fontSize="2rem" fontWeight="300" lineHeight="1.2">
          {title}
        </Heading>
        <Text fontSize="1rem" whiteSpace="nowrap">
          {`${month} ${day}, ${year}`}
        </Text>
      </Box>
    </Flex>
  );
};

export default SpotlightCard;
