import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import ChatterLogo from "@/assets/icons/ChatterLogoWhite";

const Footer = () => {
  return (
    <Flex
      as="footer"
      bg="black"
      color="white"
      p="4"
      gap="4rem"
      alignItems={{
        base: "center",
        md: "flex-start",
      }}
      className="footer"
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
    </Flex>
  );
};

export default Footer;
