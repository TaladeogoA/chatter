import { Box, Flex, Text } from "@chakra-ui/react";
import ArticleCard from "../trending-article-card/TrendingArticleCard";
import CustomTag from "../custom-tag/CustomTag";
import AuthorCard from "../author-card/AuthorCard";

interface Topic {
  id: number;
  label: string;
}

const AuthSideBar = () => {
  const topics: Topic[] = [
    { id: 0, label: "All" },
    { id: 1, label: "Technology" },
    { id: 2, label: "Science" },
    { id: 3, label: "Art" },
    { id: 4, label: "Sports" },
  ];
  return (
    <Box w="25%">
      <AuthorCard />

      <Text>Continue Reading</Text>

      <ArticleCard />

      <Text>These topics may interest you</Text>

      <Box>
        {topics.map((topic) => {
          return (
            <CustomTag
              key={topic.id}
              label={topic.label}
              onClick={() => {}}
              isSelected={false}
            />
          );
        })}
      </Box>

      <Text>Top Articles</Text>
    </Box>
  );
};

export default AuthSideBar;
