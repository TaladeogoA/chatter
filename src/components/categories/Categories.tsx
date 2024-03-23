import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpoint,
  useMediaQuery,
} from "@chakra-ui/react";
import CategoryContent from "./CategoryContent";
import { useEffect } from "react";

interface CategoryType {
  description: string;
  title: string;
  _id: string;
}

const Categories = ({ categories }: { categories: CategoryType[] }) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 690px)");

  return (
    <Box
      px={{
        base: "1rem",
        md: "3rem",
        lg: "6rem",
      }}
      mt={{
        base: "2rem",
        lg: "4rem",
      }}
      w="100%"
      as="section"
    >
      <Text
        fontWeight="extrabold"
        fontSize={{
          base: "2xl",
          sm: "3xl",
          lg: "4xl",
        }}
        my="1rem"
        w="100%"
        className="toledo"
        textAlign="center"
      >
        Categories
      </Text>
      <Tabs
        colorScheme="blackAlpha"
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        variant="line"
      >
        <TabList
          w={isSmallScreen ? "100%" : "30%"}
          overflowX="auto"
          overflowY="hidden"
          sx={{
            "::-webkit-scrollbar": {
              height: "7px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "6px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "darkgray",
            },
          }}
        >
          {categories?.map((category: CategoryType) => (
            <Tab key={category._id} maxW="100%">
              <Text maxW="100%" textAlign="center">
                {category.title}
              </Text>
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {categories?.map((category: CategoryType) => (
            <TabPanel key={category._id}>
              <CategoryContent
                categoryId={category._id}
                categoryName={category.title}
                categoryDescription={category.description}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Categories;
