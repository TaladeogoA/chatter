import { Box, Flex, Icon, Text, Input, Tag } from "@chakra-ui/react";
import ChatterLogo from "@/assets/icons/ChatterLogoBlack";
import { useContext, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SearchContext } from "@/context/SearchContext";
import { CiSearch } from "react-icons/ci";
import { useGetHomePageData } from "@/services/home-page";
import { CategoryType } from "@/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = ({ existingTerm }: { existingTerm?: string }) => {
  const { categories } = useGetHomePageData();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [term, setTerm] = useState(existingTerm || "");
  const { setSearchQuery, searchQuery } = useContext(SearchContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef(null);

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery(term);
      router.push("/search/[term]", `/search/${term}`);
    }
  };

  useGSAP(() => {
    if (isSearchOpen) {
      gsap.to(inputContainerRef.current, {
        width: "10rem",
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => inputRef.current?.focus(),
      });
    } else {
      gsap.to(inputContainerRef.current, {
        width: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isSearchOpen]);

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
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="100"
      backdropFilter="blur(3px) saturate(180%)"
      backgroundColor="rgba(255, 255, 255, 0.36)"
      borderRadius="12px"
      border="1px solid rgba(255, 255, 255, 0.125)"
    >
      <Flex w="8rem" alignItems="center" gap="2rem">
        <Link href="/">
          <Box textAlign="center">
            <Icon h="3rem" w="7rem" as={ChatterLogo} />
          </Box>
        </Link>
      </Flex>

      <Flex
        justifyContent="flex-end"
        alignItems="center"
        gap="1rem"
        color="black"
        w="100%"
      >
        <Flex alignItems="center" gap="1rem">
          {categories?.slice(1, 5).map((category: CategoryType) => (
            <Tag
              key={category._id}
              as="a"
              href={`/categories/${category._id}`}
              bgColor="black"
              color="white"
              borderRadius="full"
              _hover={{
                bgColor: "lightgray",
                color: "black",
              }}
              transition="all 0.3s"
            >
              <Text fontSize="0.9rem" borderRadius="full" p=".5rem 1rem">
                {category.title}
              </Text>
            </Tag>
          ))}
        </Flex>
        <Box ref={inputContainerRef} overflow="hidden" width={0}>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search"
            size="sm"
            w="10rem"
            p="1rem"
            borderRadius="full"
            border="solid 1px gray"
            _focusVisible={{
              border: "solid 1px black",
            }}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleSearchEnter}
          />
        </Box>
        <Flex
          border="solid 1px black"
          w="2rem"
          h="2rem"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
        >
          <Icon
            h="1.2rem"
            w="1.2rem"
            as={CiSearch}
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen && term) {
                setSearchQuery(term);
                router.push("/search/[term]", `/search/${term}`);
              }
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
