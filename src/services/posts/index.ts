import { useQuery } from "react-query";
import { client } from "../client";

export const useGetAllPosts = () => {
  const { data, error, isLoading } = useQuery(
    "posts",
    async () => {
      const res = await client.fetch(`*[_type == "post"]`);
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  if (error) {
    throw new Error("Failed to fetch posts. Please try again later.");
  }

  return { data, error, isLoading };
};

export const useGetEditorsPicks = () => {
  const { data, error, isLoading } = useQuery(
    "editors-picks",
    async () => {
      const res = await client.fetch(
        `*[_type == "post" && isEditorsPick == true]{
  title, author->{name}, slug, brief, likesCount,
    sharesCount, viewCount, image, category->{title}
  }`
      );
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  if (error) {
    throw new Error("Failed to fetch editors picks. Please try again later.");
  }

  return { data, error, isLoading };
};
