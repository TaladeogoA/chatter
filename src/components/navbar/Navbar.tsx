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
import LoginPopup from "../login-popup";

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

  const [openLoginPopup, setOpenLoginPopup] = useState(false);

  if (!user) {
    return (
      <Flex
        as="nav"
        h="5rem"
        px={{
          base: "1rem",
          lg: "3rem",
        }}
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        gap="1rem"
        bg="transparent"
      >
        <Flex w="8rem" alignItems="center" gap="2rem">
          <Link href="/">
            <Box textAlign="center">
              <Icon h="3rem" w="7rem" as={ChatterLogo} />
            </Box>
          </Link>
        </Flex>

        {router.pathname !== "/" && (
          <>
            <Box
              w="60%"
              display={{
                base: "none",
                sm: "block",
              }}
            >
              <InputGroup>
                <InputLeftElement>
                  <CiSearch />
                </InputLeftElement>
                <Input
                  placeholder="Search"
                  fontWeight="semibold"
                  border="none"
                  borderBottom="1px solid black"
                  borderRadius="none"
                  focusBorderColor="none"
                  _hover={{
                    borderBottom: "1px solid black",
                  }}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  onKeyDown={handleSearchEnter}
                />
              </InputGroup>
            </Box>
            <Flex
              h="100%"
              display={{ base: "flex", sm: "none" }}
              alignItems="center"
              ml="auto"
            >
              <Icon
                h="1.5rem"
                w="1.5rem"
                color="gray"
                as={CiSearch}
                onClick={() => {
                  // setSearchQuery(term);
                  // router.push("/search/[term]", `/search/${term}`);
                }}
              />
            </Flex>
          </>
        )}

        <Flex
          w={router.pathname !== "/" ? "max-content" : "auto"}
          justifyContent="flex-end"
          alignItems="center"
          gap="1rem"
          color="black"
        >
          <Button
            display={{
              base: "none",
              sm: "block",
            }}
            onClick={() => {
              // setIsLogin(true);
              // openAuthPopup();
              setOpenLoginPopup(true);
            }}
            fontSize="md"
            bg="transparent"
            fontWeight="normal"
            borderRadius=".2rem"
            w="max-content"
            _hover={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <Text>Log In</Text>
          </Button>
          <Button
            bg="black"
            w="max-content"
            p="1rem"
            color="white"
            fontSize="md"
            borderRadius=".2rem"
            className="toledo"
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => {
              setIsLogin(false);
              openAuthPopup();
            }}
          >
            Sign Up
            {/* <Text className="toledo">Sign Up</Text> */}
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

        {openLoginPopup && (
          <LoginPopup
            openLoginPopup={openLoginPopup}
            onClose={() => setOpenLoginPopup(false)}
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
              fontWeight="semibold"
              border="none"
              borderBottom="1px solid black"
              borderRadius="none"
              focusBorderColor="none"
              _hover={{
                borderBottom: "1px solid black",
              }}
              value={term}
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
