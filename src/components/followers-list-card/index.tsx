import { AuthContext } from "@/context/AuthContext";
import { buildImageUrl } from "@/services/sanityImageBuilder";
import { useFollowUser } from "@/services/users";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { ImageAsset } from "@sanity/types";
import { FC, useContext } from "react";

interface FollowersCardProps {
  displayName: string;
  _id: string;
  bio: string;
  displayImage: ImageAsset;
}

const FollowersCard: FC<FollowersCardProps> = (user) => {
  const { displayName, bio, displayImage } = user;
  const imageUrl = displayImage ? buildImageUrl(displayImage).url() : undefined;
  const followUserMutation = useFollowUser();
  const { user: loggedInUser } = useContext(AuthContext);
  console.log("loggedInUser", loggedInUser);
  const isFollowing = loggedInUser?.following?.some(
    (follower: FollowersCardProps) => follower._id === user._id
  );

  const followUser = async () => {
    try {
      await followUserMutation.mutateAsync({
        userToFollowId: user._id,
        userId: loggedInUser?._id,
      });
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <Flex alignItems="center" w="100%" mx="auto" gap="1rem">
      <Avatar size="md" name={displayName} src={imageUrl} bg="black" w="3rem" />
      <Flex alignItems="flex-start" flexDir="column" w="100%">
        <Text fontSize="lg" fontWeight="semibold">
          {displayName}
        </Text>
        {bio && (
          <Text fontSize="xs" fontWeight="hairline">
            {bio.substring(0, 100)}...
          </Text>
        )}
      </Flex>
      <Button
        ml="auto"
        border="1px solid black"
        bg={isFollowing ? "black" : "white"}
        color={isFollowing ? "white" : "black"}
        px="2"
        h="2rem"
        w="5rem"
        borderRadius=".2rem"
        _hover={{
          bg: "black",
          color: "white",
        }}
        onClick={followUser}
      >
        <Text as="span" fontSize="xs">
          {isFollowing ? "Unfollow" : "Follow"}
        </Text>
      </Button>
    </Flex>
  );
};

export default FollowersCard;
