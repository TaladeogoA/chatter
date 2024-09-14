import { buildImageUrl } from "@/services/sanityImageBuilder";
import { Article } from "@/types";
import { parseDate } from "@/utils/dateUtils";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const MostRecentCard = ({ article }: { article: Article }) => {
  const { slug, title, categories, _createdAt, body, image } = article;
  const imageUrl = image ? buildImageUrl(image).url() : "";
  const { day, month, year } = parseDate(_createdAt);

  return (
    <Flex
      as="a"
      href={`/articles/${slug?.current}`}
      width="calc(33% - 1rem)"
      flexDir="column"
      gap="1rem"
      _hover={{
        "& > *:first-child": {
          opacity: "0.8",
          transition: "all 0.3s",
        },
      }}
    >
      <Flex height="60%">
        <Image
          src={image ? imageUrl : "https://placehold.co/600x400?text=No+Image"}
          alt=""
          w="100%"
          h="100%"
          objectFit="cover"
          borderRadius=".2rem"
        />
      </Flex>
      <Flex flexDir="column" gap="1rem" h="40%">
        <Text fontSize="0.8rem" fontWeight="300">
          {categories && categories.length > 0 ? categories[0].title : ""}
        </Text>
        <Box>
          <Heading fontSize="2rem" fontWeight="600" lineHeight="1.2">
            {title.length > 50 ? title.substring(0, 50) + "..." : title}
          </Heading>
          <Text fontSize="1rem" whiteSpace="nowrap">
            {`${month} ${day}, ${year}`}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default MostRecentCard;
