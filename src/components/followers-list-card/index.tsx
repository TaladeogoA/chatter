import { buildImageUrl } from "@/services/sanityImageBuilder";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { ImageAsset } from "@sanity/types";
import { FC } from "react";

interface FollowersCardProps {
  displayName: string;
  _id: string;
  bio: string;
  displayImage: ImageAsset;
}

const FollowersCard: FC<FollowersCardProps> = (user) => {
  // console.log(user);

  const { displayName, bio, displayImage } = user;

  const imageUrl = displayImage ? buildImageUrl(displayImage).url() : undefined;

  return (
    <Box w="80%" mx="auto">
      <Flex alignItems="center">
        <Avatar
          size="md"
          name={displayName}
          src={imageUrl}
          mr=".5rem"
          bg="black"
        />
        <Flex alignItems="flex-start" flexDir="column">
          <Text fontSize="lg" fontWeight="semibold">
            {displayName}
          </Text>
          <Text>{bio && bio.substring(0, 20)}</Text>
        </Flex>
        <Button
          ml="auto"
          border="1px solid black"
          bg="white"
          px="2"
          h="2rem"
          w="5rem"
          borderRadius=".2rem"
          _hover={{
            bg: "black",
            color: "white",
          }}
        >
          Follow
        </Button>
      </Flex>
    </Box>
  );
};

export default FollowersCard;
