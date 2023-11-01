import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import HeroImg from "@/assets/images/laptops-hero.jpg";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebookCircle, BiSolidShareAlt } from "react-icons/bi";
import { ChatterContext } from "@/context/ChatterContext";
import React, { useContext, useEffect, useState } from "react";
import { Article } from "@/types";
import { timestampToDaysSince } from "@/utils/dateUtils";
import ReactHtmlParser from "react-html-parser";
import Navbar from "@/components/navbar/Navbar";
import ReactMarkdown from "react-markdown";

const SingleArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const { articles } = useContext(ChatterContext);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!articles) return;

    const selectedArticle = articles.find((article) => article.id === id);
    setArticle(selectedArticle || null);
  }, [articles, id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  const { title, bannerImage, author, category, postedOn, body } = article;
  const bodyLines = body?.replace(/\\n/g, "\n").split("\n");

  return (
    <Box>
      <Navbar />
      <Box as="article" mx="auto" w="70%" mt="3rem">
        <Text as="h2" fontSize="3xl" fontWeight="bold" mb="1rem">
          {title}
        </Text>

        <Box h="70vh" mx="auto">
          <Image
            src={bannerImage || HeroImg}
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
              Published by {author}
            </Text>
            <Text fontSize="sm" fontWeight="light">
              {timestampToDaysSince(postedOn)} days ago | {category}
            </Text>
          </Flex>

          <Flex gap=".5rem">
            <AiOutlineTwitter size="1.2rem" />
            <BiLogoFacebookCircle size="1.2rem" />
            <BiSolidShareAlt size="1.2rem" />
          </Flex>
        </Flex>

        <Box mt="1rem" className="article-body">
          {bodyLines.map((line, index) => (
            <ReactMarkdown key={index}>{line}</ReactMarkdown>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleArticle;
