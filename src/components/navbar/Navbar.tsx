import {
  Box,
  Flex,
  Icon,
  Button,
  Text,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import ChatterLogo from "@/assets/icons/ChatterLogoBlack";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import AuthPopup from "../auth-popup/AuthPopup";
import { CiEdit } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import { useRouter } from "next/router";

const Navbar = ({
  setIsPublishModalOpen,
}: {
  setIsPublishModalOpen?: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const isNewStory = router.pathname === "/new-story" ? true : false;
  const [isLogin, setIsLogin] = useState(false);
  const { showAuthPopup, openAuthPopup, closeAuthPopup, user, signOutUser } =
    useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <Flex
        as="nav"
        h="5rem"
        py=".5rem"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        bg="transparent"
        color="white"
      >
        <Link href="/">
          <Box ml="4rem">
            <Icon h="3rem" w="8rem" as={ChatterLogo} />
          </Box>
        </Link>

        <Flex
          mr="4rem"
          justifyContent="space-between"
          alignItems="center"
          gap="2rem"
          color="black"
        >
          <Text
            fontSize="md"
            _hover={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Explore
          </Text>
          <Text fontSize="md">Start Writing</Text>

          <Button
            onClick={() => {
              setIsLogin(true);
              openAuthPopup();
            }}
            fontSize="md"
            bg="transparent"
            fontWeight="normal"
            p="0"
            _hover={{
              cursor: "pointer",
            }}
          >
            <Text>Log In</Text>
          </Button>

          <Button
            bg="black"
            color="white"
            px="1rem"
            py=".2rem"
            fontSize="md"
            _hover={{
              cursor: "pointer",
            }}
            className="toledo"
            onClick={() => {
              setIsLogin(false);
              openAuthPopup();
            }}
          >
            Sign Up
          </Button>
        </Flex>

        {showAuthPopup && (
          <AuthPopup
            isOpen={showAuthPopup}
            isLogin={isLogin}
            onClose={closeAuthPopup}
            setIsLogin={setIsLogin}
          />
        )}
      </Flex>
    );
  }
  // console.log(user);

  return (
    <Flex
      as="nav"
      h="5rem"
      py=".5rem"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      gap="2rem"
      bg="transparent"
    >
      <Link href="/">
        <Box ml="4rem">
          <Icon h="3rem" w="8rem" as={ChatterLogo} />
        </Box>
      </Link>

      <Input placeholder="Search" w="40%" h="2rem" />

      <Flex gap="2rem" alignItems="center">
        {isNewStory ? (
          <Button
            bg="black"
            color="white"
            onClick={
              setIsPublishModalOpen
                ? () => setIsPublishModalOpen(true)
                : undefined
            }
          >
            Publish
          </Button>
        ) : (
          <Link href="/new-story">
            <Flex
              gap=".5rem"
              alignItems="center"
              _hover={{
                cursor: "pointer",
              }}
            >
              <Icon h="100%" w="1.5rem" as={CiEdit} />
              <Text fontSize="sm">Compose</Text>
            </Flex>
          </Link>
        )}

        <Menu>
          <MenuButton
            mr="4rem"
            bgColor="transparent"
            p="0"
            as={Button}
            rightIcon={<GoChevronDown />}
            _hover={{
              bgColor: "transparent",
            }}
            _expanded={{
              bgColor: "transparent",
            }}
          >
            <Avatar
              name={user?.displayName || ""}
              src={user?.photoURL || ""}
              size="sm"
            />
          </MenuButton>
          <MenuList>
            <Link href={`/profile/${user?.displayName}`}>
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link href="/settings">
              <MenuItem>Settings</MenuItem>
            </Link>
            <MenuItem>Your Stats</MenuItem>
            <MenuItem>Saved Articles</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
