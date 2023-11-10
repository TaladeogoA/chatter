import { useQuery } from "react-query";
import { client } from "../client";

export const useGetHomePageData = () => {
  // get top articles
  const {
    data: trendingPosts,
    error: trendingPostsError,
    isLoading: trendingPostsLoading,
  } = useQuery(
    "trending-posts",
    async () => {
      const res = await client.fetch(
        `*[_type == "post"] | order(relevanceScore desc)[0...3]{title, author->{displayName}, body, _id, _createdAt, slug, image, categories[]->{title}}`
      );
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  // get all categories
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery(
    "categories",
    async () => {
      const res = await client.fetch(`*[_type == "category"]{
            title, description, _id
      }`);
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  // get editors picks
  const {
    data: editorsPicks,
    error: editorsPicksError,
    isLoading: editorsPicksLoading,
  } = useQuery(
    "editors-picks",
    async () => {
      const res = await client.fetch(
        `*[_type == "post" && isEditorsPick == true]{
  title, author->{displayName}, slug, brief, body, likesCount,
    sharesCount, viewCount, image, categories[]->{title}
  }`
      );
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  if (editorsPicksError || categoriesError || trendingPostsError) {
    throw new Error("Failed to fetch homepage data. Please try again later.");
  }

  return {
    trendingPosts,
    categories,
    editorsPicks,
    trendingPostsLoading,
    categoriesLoading,
    editorsPicksLoading,
  };
};

export const useGetCategoryArticles = (categoryId: string) => {
  const {
    data: categoryArticles,
    error: categoryArticlesError,
    isLoading: categoryArticlesLoading,
  } = useQuery(
    ["category-articles", categoryId],
    async () => {
      const res = await client.fetch(
        `*[_type == "post" && references('${categoryId}')]{
                title, author->{displayName}, slug, body, brief, likesCount,
                sharesCount, viewCount, categories[]->{title, description, _id }, _id, _createdAt
            }`
      );
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  if (categoryArticlesError) {
    throw new Error(
      "Failed to fetch category articles. Please try again later."
    );
  }

  return {
    data: categoryArticles,
    error: categoryArticlesError,
    isLoading: categoryArticlesLoading,
  };
};
