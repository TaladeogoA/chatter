import { Article } from "@/types";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import MostRecentCard from "../most-recent-card";

const MostRecent = ({ data }: { data: Article[] }) => {
  return (
    <Flex flexDir="column" gap="1rem" mb="6rem">
      <Text fontSize="2rem" fontWeight="600" className="playfair" mb="1rem">
        Top Chatter
      </Text>
      <Flex flexWrap="wrap" gap="1rem">
        {data?.map((article) => (
          <MostRecentCard key={article._id} article={article} />
        ))}
      </Flex>
    </Flex>
  );
};

export default MostRecent;
