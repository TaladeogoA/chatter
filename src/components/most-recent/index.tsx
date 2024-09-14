import { Article } from "@/types";
import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import MostRecentCard from "../most-recent-card";

const MostRecent = ({ data }: { data: Article[] }) => {
  return (
    <Flex flexDir="column" gap="1rem" mb="6rem">
      <Heading fontSize="2rem" fontWeight="300" mb="1rem">
        Top Chatter
      </Heading>
      <Flex flexWrap="wrap" gap="1rem">
        {data?.map((article) => (
          <MostRecentCard key={article._id} article={article} />
        ))}
      </Flex>
    </Flex>
  );
};

export default MostRecent;
