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
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import LoginPopup from "../login-popup/LoginPopup";
import { CiEdit } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";

const Navbar = () => {
  const { showLoginPopup, openLoginPopup, closeLoginPopup, user, signOutUser } =
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
            onClick={openLoginPopup}
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
            borderRadius="full"
            px="1rem"
            py=".2rem"
            fontSize="md"
            _hover={{
              cursor: "pointer",
            }}
            className="toledo"
          >
            Sign Up
          </Button>
        </Flex>

        {showLoginPopup && (
          <LoginPopup
            isOpen={showLoginPopup}
            onClose={closeLoginPopup}
            isLoginClicked
          />
        )}
      </Flex>
    );
  }

  return (
    <Flex
      as="nav"
      h="5rem"
      py=".5rem"
      w="100%"
      justifyContent="space-between"
      gap="2rem"
      alignItems="center"
      bg="transparent"
    >
      <Link href="/">
        <Box ml="4rem">
          <Icon h="3rem" w="8rem" as={ChatterLogo} />
        </Box>
      </Link>

      <Input placeholder="Search" w="40%" h="2rem" />

      <Flex gap="2rem">
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
              src={user?.photoURL || "/images/user.png"}
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
