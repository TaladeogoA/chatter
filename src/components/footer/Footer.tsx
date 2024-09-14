import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import ChatterLogo from "@/assets/icons/ChatterLogoBlack";
import { CategoryType } from "@/types";
import { useGetHomePageData } from "@/services/home-page";

const Footer = () => {
  const { categories } = useGetHomePageData();
  return (
    <Flex
      as="footer"
      p="4"
      gap="4rem"
      alignItems={{
        base: "center",
        md: "flex-start",
      }}
      justifyContent="space-between"
      flexDir={{
        base: "column",
        md: "row",
      }}
      textAlign={{
        base: "center",
        md: "left",
      }}
    >
      <Box>
        <Link href="/">
          <Icon as={ChatterLogo} w="8rem" h="4rem" />
        </Link>
        <Text fontSize="sm" mt="1rem">
          © 2021 Chatter, Inc.
        </Text>
      </Box>

      <Box>
        <Text fontSize="md" fontWeight="bold" mb="1rem">
          Business
        </Text>
        <Text fontSize="sm" mb=".5rem">
          Startups
        </Text>
        <Text fontSize="sm" mb=".5rem">
          Entrepreneurship
        </Text>
        <Text fontSize="sm" mb=".5rem">
          Freelancing
        </Text>
        <Text fontSize="sm" mb=".5rem">
          Innovation
        </Text>
      </Box>

      <Box>
        <Text fontSize="md" fontWeight="bold" mb="1rem">
          Contact Us
        </Text>
        <Text fontSize="sm" mb=".5rem">
          Write for Chatter
        </Text>
        <Text fontSize="sm" mb=".5rem">
          Advertise
        </Text>
        <Text fontSize="sm" mb=".5rem">
          About
        </Text>
        <Text fontSize="sm" mb=".5rem">
          Careers
        </Text>
      </Box>

      <Box>
        <Text fontSize="md" fontWeight="bold" mb="1rem">
          Categories
        </Text>
        {categories?.slice(0, 4).map((category: CategoryType) => (
          <Text
            as="a"
            display="block"
            key={category._id}
            href={`/categories/${category._id}`}
            fontSize="sm"
            mb=".5rem"
            _hover={{
              color: "black",
              textDecoration: "underline",
            }}
          >
            {category.title}
          </Text>
        ))}
      </Box>

      <Box>
        <Text fontSize="md" fontWeight="bold" mb="1rem">
          Subscribe to Our Newsletter
        </Text>
        <form onSubmit={() => {}}>
          <FormControl mb="0.6rem">
            <FormLabel fontSize="sm" mb="0.4rem">
              Email address
            </FormLabel>
            <Input
              type="email"
              placeholder="Your email"
              size="sm"
              borderRadius="full"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" mb="0.4rem">
              Full name
            </FormLabel>
            <Flex>
              <Input
                type="text"
                placeholder="Your full name"
                size="sm"
                mr="2"
                borderRadius="full"
              />
              <Button
                type="submit"
                size="sm"
                borderRadius="full"
                bgColor="black"
                color="white"
                fontSize="sm"
              >
                Submit
              </Button>
            </Flex>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default Footer;
