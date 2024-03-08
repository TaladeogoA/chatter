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
import TableOfContent from "@/components/table-of-content";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";

const SingleArticle = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useGetIndividualPost(slug as string);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      if (data && data.image) {
        const url = await buildImageUrl(data.image).url();
        setImageUrl(url);
        setImageLoaded(true);
      }
    };

    loadImage();
  }, [data]);

  if (isLoading) return <Loader />;

  const postData: Article | null = data;
  if (!postData || error) {
    return <p>Post not found</p>;
  }

  const { title, body, author, categories, _createdAt } = postData;
  // console.log(body);
  // const imageUrl = image ? buildImageUrl(image).url() : "";

  const portableTextComponents = {
    block: {
      h2: (props) => (
        // console.log(props),
        <h2 id={`heading-${props.node._key}`} className="heading">
          {props.children}
        </h2>
      ),
      h3: (props) => (
        <h3 id={`heading-${props.node._key}`} className="heading">
          {props.children}
        </h3>
      ),
      h4: (props) => (
        <h4 id={`heading-${props.node._key}`} className="heading">
          {props.children}
        </h4>
      ),
      h5: (props) => (
        <h5 id={`heading-${props.node._key}`} className="heading">
          {props.children}
        </h5>
      ),
    },
  };

  return (
    <Box>
      <Navbar />
      <Box as="article" mx="auto" w="80%" mt="3rem">
        <Text as="h1" fontSize="4xl" fontWeight="bold" mb="1rem">
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

        <Flex
          mt="1rem"
          justifyContent="space-between"
          bg="black"
          color="white"
          p="5"
          borderRadius=".2rem"
          className="article-meta"
        >
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

        <Flex mt="3rem" gap="2rem">
          <Box w="27%" alignSelf="flex-start" position="sticky" top="10">
            <TableOfContent body={body} />
          </Box>
          <Box className="article-body" w="70%">
            <PortableText value={body} components={portableTextComponents} />
          </Box>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default SingleArticle;
