import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import HeroImg from "@/assets/images/laptops-hero.jpg";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebookCircle, BiSolidShareAlt } from "react-icons/bi";
import { Article } from "@/types";
import { daysSinceDate } from "@/utils/dateUtils";
import Navbar from "@/components/navbar/Navbar";
import { useGetIndividualPost } from "@/services/posts";
import { buildImageUrl } from "@/services/sanityImageBuilder";
import { PortableText } from "@portabletext/react";

const SingleArticle = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useGetIndividualPost(slug as string);
  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const postData: Article | null = data;
  if (!postData || error) {
    return <p>Post not found</p>;
  }
  const { title, body, author, category, image, _createdAt } = postData;

  return (
    <Box>
      <Navbar />
      <Box as="article" mx="auto" w="70%" mt="3rem">
        <Text as="h2" fontSize="3xl" fontWeight="bold" mb="1rem">
          {title}
        </Text>

        <Box h="70vh" mx="auto">
          <Image
            src={buildImageUrl(image).url() || HeroImg}
            alt="hero"
            width={100}
            height={100}
            style={{
              borderRadius: "10px",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>

        <Flex mt="1rem" justifyContent="space-between">
          <Flex gap="1rem">
            <Text fontSize="sm" fontWeight="light">
              Published by {author?.name}
            </Text>
            <Text fontSize="sm" fontWeight="light">
              {daysSinceDate(_createdAt)} | {category?.title}
            </Text>
          </Flex>

          <Flex gap=".5rem">
            <AiOutlineTwitter size="1.2rem" />
            <BiLogoFacebookCircle size="1.2rem" />
            <BiSolidShareAlt size="1.2rem" />
          </Flex>
        </Flex>

        <PortableText value={body} />
      </Box>
    </Box>
  );
};

export default SingleArticle;
