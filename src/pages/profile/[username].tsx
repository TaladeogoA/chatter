import { useRouter } from "next/router";
import { Avatar, Box, Text } from "@chakra-ui/react";
import Navbar from "@/components/navbar/Navbar";

const ProfilePage = () => {
  const router = useRouter();
  console.log(router);
  const { username } = router.query;

  return (
    <Box>
      <Navbar />

      <Box as="section" mx="auto">
        <Box w="100%" bgColor="#F1F1F1" h="12rem"></Box>

        <Avatar
          size="2xl"
          name={username as string}
          marginTop="-4rem"
          marginLeft="4rem"
          bgColor="white"
          border="solid 4px black"
        />

        <Box mx="4rem">
          <Text as="h2" fontSize="5xl" fontWeight="bold" mb="1rem">
            {username}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
