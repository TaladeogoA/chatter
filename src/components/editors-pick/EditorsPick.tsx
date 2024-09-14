import { useRef } from "react";
import { Box, Flex, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import EditorsPickCard from "../editors-pick-card/EditorsPickCard";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Article } from "@/types";

const EditorsPick = ({ data }: { data: Article[] }) => {
  const splideRef = useRef(null);
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
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
    <Box
      mx={{
        base: "1rem",
        lg: "6rem",
      }}
      my="4rem"
      as="section"
    >
      <Flex alignItems="center" justifyContent="center">
        <Text
          as="h1"
          fontSize={{
            base: "2xl",
            sm: "3xl",
            lg: "4xl",
          }}
          fontWeight="semibold"
          mt="2rem"
          mb="1rem"
          className="playfair"
          color="black"
        >
          Editor&apos;s Pick
        </Text>

        {isLargerThan1024 && (
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
        )}
      </Flex>

      {isLargerThan1024 ? (
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
      ) : (
        <VStack spacing={4}>
          {data.map((article: Article) => (
            <EditorsPickCard key={article.slug.current} article={article} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default EditorsPick;
