import { useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import EditorsPickCard from "../editors-pick-card/EditorsPickCard";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Article } from "@/types";

const EditorsPick = ({ data }: { data: Article[] }) => {
  const splideRef = useRef(null);
  const nextSlide = () => {
    if (splideRef.current) {
      // @ts-ignore
      splideRef.current.go("+1");
    }
  };
  const prevSlide = () => {
    if (splideRef.current) {
      // @ts-ignore
      splideRef.current.go("-1");
    }
  };

  return (
    <Box mx="6rem" my="4rem">
      <Flex alignItems="center">
        <Text
          as="h1"
          fontSize="6xl"
          fontWeight="semibold"
          mt="2rem"
          mb="1rem"
          className="toledo"
          color="black"
        >
          Editor&apos;s Pick
        </Text>

        <Flex ml="auto" gap="1rem">
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor="black"
            w="4rem"
            h="4rem"
            onClick={prevSlide}
            cursor="pointer"
            borderRadius=".2rem"
          >
            <ArrowBackIcon w="2rem" h="2rem" color="white" />
          </Flex>

          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor="black"
            w="4rem"
            h="4rem"
            onClick={nextSlide}
            cursor="pointer"
            borderRadius=".2rem"
          >
            <ArrowForwardIcon w="2rem" h="2rem" color="white" />
          </Flex>
        </Flex>
      </Flex>

      <Splide
        tag="section"
        options={{
          perPage: 2,
          gap: "1rem",
          height: "20rem",
        }}
        hasTrack={false}
        ref={splideRef}
      >
        <SplideTrack>
          {data.map((article: Article) => {
            return (
              <SplideSlide key={article.slug.current}>
                <EditorsPickCard article={article} />
              </SplideSlide>
            );
          })}
        </SplideTrack>
      </Splide>
    </Box>
  );
};

export default EditorsPick;
