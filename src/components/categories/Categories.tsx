import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Scrollbar } from "react-scrollbars-custom";
import { PropagateLoader } from "react-spinners";
import { useGetAllCategories } from "@/services/category";
import CategoryContent from "./CategoryContent";

interface CategoryType {
  description: string;
  title: string;
  _id: string;
}

const Categories = () => {
  const { data: categories, error, isLoading } = useGetAllCategories();

  if (isLoading) return <PropagateLoader color="#000" />;
  if (error) return <div>failed to load</div>;

  return (
    <Box px="6rem" mt="4rem" w="100%" as="section">
      <Tabs colorScheme="blackAlpha" h="100%">
        <TabList overflow="hidden" h="100%">
          <Scrollbar style={{ height: "5rem", overflowY: "hidden" }}>
            {categories?.map((category: CategoryType) => (
              <Tab key={category._id} whiteSpace="nowrap">
                {category.title}
              </Tab>
            ))}
          </Scrollbar>
        </TabList>

        <TabPanels mt="3rem">
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
