import { buildImageUrl } from "@/services/sanityImageBuilder";
import { Article } from "@/types";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface EditorsPickCardProps {
  article: Article;
}

const EditorsPickCard: React.FC<EditorsPickCardProps> = ({ article }) => {
  const { slug, title, author, image, category } = article;
  const imageUrl = buildImageUrl(image).url();

  return (
    <Link href={`/articles/${slug?.current}`} passHref>
      <Flex bgImage={imageUrl} bgSize="cover" bgPosition="center" h="100%">
        <Flex
          justifyContent="space-between"
          alignItems="flex-end"
          p="2rem"
          _hover={{
            "& svg": {
              transform: "rotate(75deg)",
              transition: "all .3s ease-in-out",
            },
          }}
        >
          <Box bgColor="white" p="1rem" maxW="80%">
            <Flex gap="2rem" mb="1rem">
              <Text fontWeight="semibold" fontSize="2xl">
                {title}
              </Text>
            </Flex>

            <Divider my=".5rem" size="5px" borderColor="grey" />

            <Flex justifyContent="space-between" fontSize="sm">
              <Flex>
                {/* <Link href={`/authors/`}> */}
                <Text whiteSpace="nowrap" mr=".5rem">
                  {author?.name}
                </Text>
                {/* </Link> */}
                <>&#8226;</>
                <Text whiteSpace="nowrap" mx=".5rem">
                  6 mins read
                </Text>
                <>&#8226;</>

                <Link href={`/categories/`}>
                  <Text whiteSpace="nowrap" mx=".5rem">
                    {category?.title}
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Box>

          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor="black"
            w="5rem"
            h="5rem"
            borderRadius="full"
          >
            <ArrowUpIcon
              w={10}
              h={10}
              color="white"
              transform="rotate(45deg)"
              _hover={{
                transform: "rotate(75deg) scale(1.1)",
                transition: "all .3s ease-in-out",
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default EditorsPickCard;
