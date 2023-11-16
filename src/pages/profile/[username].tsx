import { useRouter } from "next/router";
import {
  Avatar,
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
import Navbar from "@/components/navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import EditProfile from "./components/edit-profile";
import Loader from "../../../loading";
import { buildImageUrl } from "@/services/sanityImageBuilder";
import { Article } from "@/types";
import UserProfileCard from "@/components/user-profile-card";

const ProfilePage = () => {
  const router = useRouter();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const { user } = useContext(AuthContext);
  if (!user) return <Loader />; // handle user auth session expiring
  // console.log(user);
  const {
    displayName,
    displayImage,
    bio,
    _id,
    followers,
    following,
    likes,
    posts,
  } = user;

  const imageUrl = displayImage ? buildImageUrl(displayImage).url() : "";

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

      <Box as="section" w="50%" mx="auto" mt="4rem">
        <Flex w="100%" alignItems="flex-end" justifyContent="space-between">
          <Box>
            <Avatar
              size="xl"
              name={displayName}
              src={imageUrl}
              bgColor="white"
              border={imageUrl === "" ? "1px solid black" : "none"}
            />
            <Text as="h2" fontSize="2xl" fontWeight="bold" mt=".5rem">
              {displayName}
            </Text>

            <Text>{bio ? bio : "No bio yet."}</Text>

            <Flex>
              <Text>
                <Text as="span" fontWeight="bold">
                  {following ? following.length : 0}
                </Text>{" "}
                following
              </Text>
              <Text mx=".5rem">
                <Text as="span" fontWeight="bold">
                  {followers ? followers.length : 0}
                </Text>{" "}
                followers
              </Text>
            </Flex>
          </Box>
          <Text
            textDecor="underline"
            cursor="pointer"
            onClick={() => setOpenEditProfile(true)}
          >
            Edit Profile
          </Text>
        </Flex>
        <Tabs my="2rem" colorScheme="blackAlpha">
          <TabList
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            w="100%"
          >
            <Tab w="100%">Posts</Tab>
            <Tab w="100%">Likes</Tab>
          </TabList>

          <TabPanels>
            <TabPanel mt="1rem" display="flex" flexDir="column" p="0">
              {posts ? (
                posts?.map((post: Article, index: number) => (
                  <>
                    <UserProfileCard
                      key={post._id}
                      article={post}
                      authorName={displayName}
                    />
                    {index !== posts.length - 1 && (
                      <Divider borderColor="blackAlpha.400" />
                    )}
                  </>
                ))
              ) : (
                <Flex flexDir="column" w="60%" mx="auto" gap=".5rem" mt="2rem">
                  <Text textAlign="center" fontWeight="semibold">
                    No posts yet.
                  </Text>
                  <Text textAlign="center">
                    Your posts will show up here. Write an article to see them.
                  </Text>
                </Flex>
              )}
            </TabPanel>
            <TabPanel mt="1rem" display="flex" flexDir="column" p="0">
              <Text>
                {likes ? (
                  likes.map((like: Article, index: number) => (
                    <>
                      <UserProfileCard
                        key={like._id}
                        article={like}
                        authorName={displayName}
                      />
                      {index !== likes.length - 1 && (
                        <Divider borderColor="blackAlpha.400" />
                      )}
                    </>
                  ))
                ) : (
                  <Flex
                    flexDir="column"
                    w="60%"
                    mx="auto"
                    gap=".5rem"
                    mt="2rem"
                  >
                    <Text textAlign="center" fontWeight="semibold">
                      No likes yet.
                    </Text>
                    <Text textAlign="center">
                      Your likes will show up here. Like articles to see them.
                    </Text>
                  </Flex>
                )}
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {openEditProfile && (
        <EditProfile
          openEditProfile={openEditProfile}
          setOpenEditProfile={setOpenEditProfile}
          displayName={displayName}
          bio={bio}
          userId={_id}
        />
      )}
    </Box>
  );
};

export default ProfilePage;
