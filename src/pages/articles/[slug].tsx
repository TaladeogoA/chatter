import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebookCircle, BiSolidShareAlt } from "react-icons/bi";
import { Article } from "@/types";
import { daysSinceDate } from "@/utils/dateUtils";
import Navbar from "@/components/navbar/Navbar";
import { useGetIndividualPost } from "@/services/posts";
import { buildImageUrl } from "@/services/sanityImageBuilder";
import { PortableText } from "@portabletext/react";
import Loader from "../../../loading";

const SingleArticle = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useGetIndividualPost(slug as string);

  if (isLoading) return <Loader />;

  const postData: Article | null = data;
  if (!postData || error) {
    return <p>Post not found</p>;
  }
  console.log(postData);
  const { title, body, author, categories, image, _createdAt } = postData;
  const imageUrl = image ? buildImageUrl(image).url() : "";

  return (
    <Box>
      <Navbar />
      <Box as="article" mx="auto" w="70%" mt="3rem">
        <Text as="h2" fontSize="4xl" fontWeight="bold" mb="1rem">
          {title}
        </Text>

        {imageUrl && (
          <Box h="70vh" mx="auto">
            <Image
              src={imageUrl}
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
        )}

        <Flex mt="1rem" justifyContent="space-between">
          <Flex gap="1rem">
            <Text fontSize="md" fontWeight="light">
              Published by {author?.displayName} |
            </Text>
            <Text fontSize="md" fontWeight="light">
              {daysSinceDate(_createdAt)} | {categories?.[0]?.title}
            </Text>
          </Flex>

          <Flex gap=".5rem">
            <AiOutlineTwitter size="1.2rem" />
            <BiLogoFacebookCircle size="1.2rem" />
            <BiSolidShareAlt size="1.2rem" />
          </Flex>
        </Flex>

        <Box mt="3rem" className="article-body">
          <PortableText value={body} />
        </Box>
      </Box>
    </Box>
  );
};

export default SingleArticle;
