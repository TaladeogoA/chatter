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

export const useGetSingleCategory = (categoryId: string) => {
  const { data, error, isLoading } = useQuery(
    ["single-category", categoryId],
    async () => {
      const res =
        await client.fetch(`*[_type == "category" && _id == "${categoryId}"]{
        title, description, _id
      }`);
      return res;
    }
  );

  if (error) {
    throw new Error("Failed to fetch category. Please try again later.");
  }

  return { data, error, isLoading };
};
