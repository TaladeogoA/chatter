import { buildImageUrl } from "@/services/sanityImageBuilder";
import { Article } from "@/types";
import { calculateReadingTime } from "@/utils/textUtils";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface EditorsPickCardProps {
  article: Article;
}

const EditorsPickCard: React.FC<EditorsPickCardProps> = ({ article }) => {
  const { slug, title, author, image, category, body } = article;
  const imageUrl = buildImageUrl(image).url();
  const readingTime = calculateReadingTime(body);

  return (
    <Link
      href={`/articles/${slug?.current}`}
      passHref
      style={{
        width: "100%",
      }}
    >
      <Flex
        bgImage={imageUrl}
        bgSize="cover"
        bgPosition="center"
        w="100%"
        py={{
          base: "1rem",
          sm: "2rem",
        }}
        px={{
          base: "1rem",
          sm: "4rem",
        }}
      >
        <Box bgColor="white" p="1rem" w="100%" mx="auto">
          <Flex gap="2rem" mb="1rem">
            <Text
              fontWeight="semibold"
              fontSize={{
                base: "lg",
                lg: "2xl",
              }}
            >
              {title}
            </Text>
          </Flex>

          <Divider my=".5rem" size="5px" borderColor="grey" />

          <Flex justifyContent="space-between" fontSize="sm">
            <Flex wrap="wrap">
              {/* <Link href={`/authors/`}> */}
              <Text whiteSpace="nowrap" mr=".5rem">
                {author?.displayName}
              </Text>
              {/* </Link> */}
              <>&#8226;</>
              <Text whiteSpace="nowrap" mx=".5rem">
                {readingTime.text}
              </Text>
              <>&#8226;</>

              <Text whiteSpace="nowrap" mx=".5rem">
                {category?.title}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
};

export default EditorsPickCard;
