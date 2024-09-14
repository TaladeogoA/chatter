import { CategoryType } from "@/types";
import { Box, Flex, Tag, Text, useMediaQuery } from "@chakra-ui/react";

const Categories = ({ categories }: { categories: CategoryType[] }) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 690px)");

  return (
    <Box w="100%" as="section" mb="6rem" color="black">
      <Text fontSize="2rem" fontWeight="600" className="playfair" mb="1rem">
        Categories
      </Text>
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
            <Text maxW="100%" fontSize="1.5rem">
              {category.title}
            </Text>
          </Tag>
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
