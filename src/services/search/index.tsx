import { useQuery } from "react-query";
import { client } from "../client";

export const useSearchPostsQuery = (searchTerm: string) => {
  const { data, error, isLoading } = useQuery(
    ["searchPosts", searchTerm],
    async () => {
      const res = await client.fetch(
        `*[_type == "post" && title match "${searchTerm}"]`
      );
      return res;
    }
  );

  if (error) {
    throw new Error("Search failed", error);
  }

  return { data, isLoading };
};
