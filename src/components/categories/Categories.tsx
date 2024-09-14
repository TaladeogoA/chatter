import { CategoryType } from "@/types";
import { Box, Flex, Heading, Tag, Text, useMediaQuery } from "@chakra-ui/react";

const Categories = ({ categories }: { categories: CategoryType[] }) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 690px)");

  return (
    <Box w="100%" as="section" mb="6rem" color="black">
      <Heading fontSize="2rem" fontWeight="300" mb="1rem">
        Categories
      </Heading>
      <Flex w="100%" gap="2rem" flexWrap="wrap">
        {categories?.map((category: CategoryType) => (
          <Tag
            key={category._id}
            as="a"
            href={`/categories/${category._id}`}
            bgColor="black"
            color="white"
            padding="1.5rem"
            borderRadius="full"
            _hover={{
              bgColor: "lightgray",
              color: "black",
            }}
            transition="all 0.3s"
          >
            <Text maxW="100%" fontSize="1.2rem">
              {category.title}
            </Text>
          </Tag>
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
