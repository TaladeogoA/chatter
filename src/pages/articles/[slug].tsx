import Image from "next/image";
import { Article } from "@/types";
import Loader from "../../../loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { AiOutlineTwitter } from "react-icons/ai";
import { daysSinceDate } from "@/utils/dateUtils";
import { Box, Flex, Text } from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import { useGetIndividualPost } from "@/services/posts";
import TableOfContent from "@/components/table-of-content";
import { buildImageUrl } from "@/services/sanityImageBuilder";
import { BiLogoFacebookCircle, BiSolidShareAlt } from "react-icons/bi";

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
      h2: (props: any) => (
        // console.log(props),
        <h2 id={`heading-${props.node._key}`} className="heading">
          {props.children}
        </h2>
      ),
      h3: (props: any) => (
        <h3 id={`heading-${props.node._key}`} className="heading">
          {props.children}
        </h3>
      ),
      h4: (props: any) => (
        <h4 id={`heading-${props.node._key}`} className="heading">
          {props.children}
        </h4>
      ),
      h5: (props: any) => (
        <h5 id={`heading-${props.node._key}`} className="heading">
          {props.children}
        </h5>
      ),
    },
  };

  return (
    <Box>
      <Navbar />
      <Box as="article" m={{ base: "1.5rem", md: "3rem" }}>
        <Text
          as="h1"
          fontSize={{ base: "2rem", md: "3rem" }}
          fontWeight="bold"
          mb="1rem"
          textAlign={{ base: "center", md: "left" }}
        >
          {title}
        </Text>

        {/* {imageUrl && (
          <Box
            h={{
              base: "10rem",
              md: "20rem",
            }}
            mx="auto"
            display={imageLoaded ? "block" : "none"}
          >
            <Image
              src={imageUrl}
              alt="hero"
              width={100}
              height={100}
              style={{
                borderRadius: "5px",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        )} */}

        <Flex
          mt="1rem"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          bg="black"
          color="white"
          p="5"
          borderRadius=".2rem"
          className="article-meta"
        >
          <Flex gap="1rem" alignItems="center" flexWrap="wrap">
            <Text fontSize="md" fontWeight="light">
              Published by {author?.displayName} |
            </Text>
            <Text fontSize="md" fontWeight="light">
              {daysSinceDate(_createdAt)} |
            </Text>
            <Text fontSize="md" fontWeight="light">
              {categories?.[0]?.title}
            </Text>
            <Flex gap=".5rem">
              <AiOutlineTwitter size="1.2rem" />
              <BiLogoFacebookCircle size="1.2rem" />
              <BiSolidShareAlt size="1.2rem" />
            </Flex>
          </Flex>
        </Flex>

        <Flex
          mt="3rem"
          gap="2rem"
          flexDir={{
            base: "column",
            md: "row",
          }}
        >
          <Box
            w={{ base: "100%", md: "27%" }}
            alignSelf="flex-start"
            position={{
              base: "unset",
              md: "sticky",
            }}
            top="10"
          >
            <TableOfContent body={body} />
          </Box>
          <Box className="article-body" w={{ base: "100%", md: "70%" }}>
            <PortableText value={body} components={portableTextComponents} />
          </Box>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default SingleArticle;
