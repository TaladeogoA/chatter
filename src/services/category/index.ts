import { useQuery } from "react-query";
import { client } from "../client";

export const useGetAllCategories = () => {
  const { data, error, isLoading } = useQuery(
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

  if (error) {
    throw new Error("Failed to fetch categories. Please try again later.");
  }

  return { data, error, isLoading };
};

export const useCategoryArticles = (categoryId: string) => {
  const { data, error, isLoading } = useQuery(
    ["category-articles", categoryId],
    async () => {
      const res = await client.fetch(
        `*[_type == "post" && category._ref == "${categoryId}"]{
                title, author->{name}, slug, brief, likesCount,
                sharesCount, viewCount, image, category->{title, description }, _id, _createdAt
            }`
      );
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  if (error) {
    throw new Error(
      "Failed to fetch category articles. Please try again later."
    );
  }

  return { data, error, isLoading };
};
