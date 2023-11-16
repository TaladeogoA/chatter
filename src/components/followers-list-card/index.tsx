import { buildImageUrl } from "@/services/sanityImageBuilder";
import { Avatar, Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
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

  const imageUrl = displayImage ? buildImageUrl(displayImage).url() : "";

  return (
    <Box>
      <Flex>
        <Avatar
          size="md"
          name={displayName}
          src={imageUrl}
          mr=".5rem"
          bg="black"
        />
        <Flex alignItems="center" gap=".5rem">
          <Text fontSize="lg" fontWeight="semibold">
            {displayName}
          </Text>
          <Badge
            h="max-content"
            w="max-content"
            py=".5"
            px="1"
            borderRadius=".2rem"
            mt=".5rem"
            textTransform="none"
            fontSize="xs"
            fontWeight="semibold"
            bg="#F2F2F2"
          >
            Follows you
          </Badge>
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
      <Text mx="3.5rem" mt="-1rem">
        {bio}
      </Text>
    </Box>
  );
};

export default FollowersCard;
