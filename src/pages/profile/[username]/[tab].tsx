import Navbar from "@/components/navbar/Navbar";
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
import React, { FC, useContext } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import Loader from "../../../../loading";
import FollowersCard from "@/components/followers-list-card";
import { Follower } from "@/types/index";
import { UserContext } from "@/context/UserContext";

const FollowingFollowers: FC = () => {
  const router = useRouter();
  const { tab, username } = router.query;
  const { followers, following } = useContext(UserContext);
  if (!followers || !following) return <Loader />;

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
      <Box w="60%" mx="auto">
        <Flex alignItems="center" mb="1rem" justifyContent="flex-start">
          <Box
            p=".5rem"
            bg="#F2F2F2"
            borderRadius="50%"
            _hover={{
              cursor: "pointer",
              bg: "#E8E8E8",
            }}
            onClick={() => router.back()}
          >
            <IoChevronBackSharp />
          </Box>
          <Text fontSize="2xl" fontWeight="bold" marginInline="auto">
            {username}
          </Text>
        </Flex>

        <Tabs
          colorScheme="blackAlpha"
          isFitted
          defaultIndex={tab === "followers" ? 1 : 0}
        >
          <TabList>
            <Tab>Following</Tab>
            <Tab>Followers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {following.length === 0 ? (
                <Flex flexDir="column" w="60%" mx="auto" gap=".5rem" mt="2rem">
                  <Text textAlign="center" fontWeight="semibold">
                    You&apos;re not following anyone yet.
                  </Text>
                  <Text textAlign="center">
                    When you do, they&apos;ll be listed here.
                  </Text>
                </Flex>
              ) : (
                following.map((user: Follower, index: number) => (
                  <React.Fragment key={user._id}>
                    <FollowersCard {...user} />
                    {index !== following.length - 1 && (
                      <Divider borderColor="blackAlpha.400" my=".5rem" />
                    )}
                  </React.Fragment>
                ))
              )}
            </TabPanel>
            <TabPanel>
              {following.length === 0 ? (
                <Flex flexDir="column" w="60%" mx="auto" gap=".5rem" mt="2rem">
                  <Text textAlign="center" fontWeight="semibold">
                    You don&apos;t have any followers yet.
                  </Text>
                  <Text textAlign="center">
                    When you do, they&apos;ll be listed here.
                  </Text>
                </Flex>
              ) : (
                followers.map((user: Follower, index: number) => (
                  <React.Fragment key={user._id}>
                    <FollowersCard {...user} />
                    {index !== followers.length - 1 && (
                      <Divider borderColor="blackAlpha.400" my=".5rem" />
                    )}
                  </React.Fragment>
                ))
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default FollowingFollowers;
