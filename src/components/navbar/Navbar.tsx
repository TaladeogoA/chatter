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
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import ChatterLogo from "@/assets/icons/ChatterLogoBlack";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import AuthPopup from "../auth-popup/AuthPopup";
import { CiEdit } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { buildImageUrl } from "@/services/sanityImageBuilder";
import { SearchContext } from "@/context/SearchContext";
import { CiSearch } from "react-icons/ci";

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
  const [term, setTerm] = useState("");
  const { setSearchQuery, searchQuery } = useContext(SearchContext);

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery(term);
      router.push("/search/[term]", `/search/${term}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      console.log("User signed out");
      toast.success("User signed out");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  if (!user) {
    return (
      <Flex
        as="nav"
        h="5rem"
        px="3rem"
        w="100%"
        alignItems="center"
        gap="2rem"
        bg="transparent"
      >
        <Flex w="33%" alignItems="center" gap="2rem">
          <Link href="/">
            <Box textAlign="center">
              <Icon h="3rem" w="8rem" as={ChatterLogo} />
            </Box>
          </Link>
        </Flex>

        <Box w="33%">
          {router.pathname !== "/" && (
            <InputGroup>
              <InputLeftElement>
                <CiSearch />
              </InputLeftElement>
              <Input
                placeholder="Search"
                borderRadius=".2rem"
                focusBorderColor="none"
                fontWeight="semibold"
                value={searchQuery}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={handleSearchEnter}
              />
            </InputGroup>
          )}
        </Box>

        <Flex
          w="33%"
          justifyContent="flex-end"
          alignItems="center"
          gap="1.5rem"
          color="black"
        >
          <Button
            onClick={() => {
              setIsLogin(true);
              openAuthPopup();
            }}
            fontSize="md"
            bg="transparent"
            fontWeight="normal"
            p="0"
            borderRadius=".2rem"
            _hover={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <Text>Log In</Text>
          </Button>

          <Button
            bg="black"
            h="2.5rem"
            color="white"
            fontSize="md"
            borderRadius=".2rem"
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
  const imageUrl = user?.displayImage
    ? buildImageUrl(user?.displayImage).url()
    : "";

  return (
    <Flex
      as="nav"
      h="5rem"
      px="3rem"
      w="100%"
      alignItems="center"
      gap="2rem"
      bg="transparent"
    >
      <Flex w="33%" alignItems="center" gap="2rem">
        <Link href="/">
          <Box textAlign="center">
            <Icon h="3rem" w="8rem" as={ChatterLogo} />
          </Box>
        </Link>
      </Flex>

      <Box w="33%">
        {router.pathname !== "/" && (
          <InputGroup>
            <InputLeftElement>
              <CiSearch />
            </InputLeftElement>
            <Input
              placeholder="Search"
              borderRadius=".2rem"
              focusBorderColor="none"
              fontWeight="semibold"
              value={searchQuery}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={handleSearchEnter}
            />
          </InputGroup>
        )}
      </Box>

      <Flex gap="2rem" alignItems="center" w="33%" justifyContent="flex-end">
        {isNewStory ? (
          <Button
            bg="black"
            color="white"
            borderRadius=".2rem"
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
            <Avatar name={user?.displayName || ""} src={imageUrl} size="sm" />
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
