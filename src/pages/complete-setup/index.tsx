import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import ChatterLogo from "@/assets/icons/ChatterLogoBlack";
import { completeSetup, useGetUser } from "@/services/users";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Loader from "../../../loading";

const CompleteSetup = () => {
  const { data: user, isLoading } = useGetUser();
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }
  console.log(user);

  return (
    <Box>
      <Box as="section" mx="auto">
        <Box mx="auto" textAlign="center">
          <Icon h="4rem" w="10rem" as={ChatterLogo} />
        </Box>
        <Flex flexDir="column" alignItems="center" mt="4rem" w="60%" mx="auto">
          <Text fontSize="5xl" mb="1rem" className="playfair" color="black">
            Almost there!
          </Text>
          <Text fontSize="xl">
            We just need a few more details to complete your profile.
          </Text>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4rem",
              marginTop: "5rem",
              width: "60%",
            }}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await completeSetup({
                  id: user?._id,
                  displayName,
                });

                toast.success("Setup complete!");
                router.push("/");
              } catch (error) {
                toast.error("Error completing setup");
                console.error("Error completing setup:", error);
              }
            }}
          >
            <Input
              placeholder="Your full name"
              border="none"
              borderBottom="1px solid black"
              borderRadius="none"
              fontSize="xl"
              focusBorderColor="none"
              _hover={{
                borderBottom: "1px solid black",
              }}
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />

            <Input
              placeholder="Your email"
              border="none"
              borderBottom="1px solid black"
              borderRadius="none"
              fontSize="xl"
              focusBorderColor="none"
              disabled
              value={user?.email}
              _disabled={{
                color: "black",
              }}
              _hover={{
                borderBottom: "1px solid black",
              }}
            />

            <Button
              bg="black"
              color="white"
              w="15rem"
              p="6"
              mx="auto"
              isLoading={isLoading}
              type="submit"
            >
              <Text fontSize="xl">Complete Setup</Text>
            </Button>
          </form>
        </Flex>
      </Box>
    </Box>
  );
};

export default CompleteSetup;
