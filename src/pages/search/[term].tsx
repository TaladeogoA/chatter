import FollowersCard from "@/components/followers-list-card";
import Navbar from "@/components/navbar/Navbar";
import UserProfileCard from "@/components/user-profile-card";
import { SearchContext } from "@/context/SearchContext";
import {
  Box,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, Fragment } from "react";

const SearchPage = () => {
  const router = useRouter();
  const { term } = router.query;
  const { searchResults, userResults } = useContext(SearchContext);

  return (
    <Box
      maxH="100vh"
      w="100%"
      overflowY="auto"
      sx={{
        "::-webkit-scrollbar": {
          width: "10px",
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
      <Navbar />
      <Box as="section" w="50%" mx="auto" mt="2rem">
        <Text fontWeight="semibold" fontSize="4xl">
          <Text as="span" color="GrayText">
            Results for{" "}
          </Text>
          {term}
        </Text>

        <Tabs
          my="1rem"
          colorScheme="blackAlpha"
          defaultIndex={searchResults.length === 0 ? 1 : 0}
        >
          <TabList>
            <Tab w="100%">Posts</Tab>
            <Tab w="100%">People</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex
                flexDir="column"
                justify="center"
                align="center"
                mt="1rem"
                h="max-content"
              >
                {searchResults.length === 0 ? (
                  <>
                    <Text fontSize="xl" color="gray.500">
                      No results found for {term}
                    </Text>
                    <Text fontSize="xl" color="gray.500" ml="1rem">
                      You can try the following:
                    </Text>
                    <Text fontSize="xl" color="gray.500" ml="1rem">
                      - Check your spelling
                    </Text>
                    <Text fontSize="xl" color="gray.500" ml="1rem">
                      - Try more general words
                    </Text>
                  </>
                ) : (
                  searchResults.map((result, index) => (
                    <Fragment key={result._id}>
                      <UserProfileCard article={result} />
                      {index !== searchResults.length - 1 && (
                        <Divider borderColor="blackAlpha.400" />
                      )}
                    </Fragment>
                  ))
                )}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexDir="column" justify="center" align="center" mt="1rem">
                {userResults.length === 0 ? (
                  <>
                    <Text fontSize="xl" color="gray.500">
                      No results found for {term}
                    </Text>
                    <Text fontSize="xl" color="gray.500" ml="1rem">
                      You can try the following:
                    </Text>
                    <Text fontSize="xl" color="gray.500" ml="1rem">
                      - Check your spelling
                    </Text>
                    <Text fontSize="xl" color="gray.500" ml="1rem">
                      - Try more general words
                    </Text>
                  </>
                ) : (
                  userResults.map((result, index) => (
                    <Fragment key={result._id}>
                      <FollowersCard {...result} />
                      {index !== userResults.length - 1 && (
                        <Divider borderColor="blackAlpha.400" />
                      )}
                    </Fragment>
                  ))
                )}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default SearchPage;
