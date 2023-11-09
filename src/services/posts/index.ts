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
  title, author->{displayName}, slug, brief, likesCount,
    sharesCount, viewCount, image, categories[]->{title}
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

export const useGetIndividualPost = (slug: string) => {
  const { data, error, isLoading } = useQuery(
    ["post", slug],
    async () => {
      const res = await client.fetch(
        `*[_type == "post" && slug.current == "${slug}"][0]{
  title, author->{name}, slug, brief, likesCount, viewCount, sharesCount, body, image, _createdAt, categories->{title}
        }`,
        { slug }
      );
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  if (error) {
    throw new Error("Failed to fetch post. Please try again later.");
  }

  return { data, error, isLoading };
};

export const useGetTrendingPosts = () => {
  const { data, error, isLoading } = useQuery("trending-posts", async () => {
    const res = await client.fetch(
      `*[_type == "post"] | order(relevanceScore desc)[0...2]{title, author->{displayName}, _id, _createdAt, slug, image, categories[]->{title}}`
    );
    return res;
  });

  if (error) {
    throw new Error("Failed to fetch trending posts. Please try again later.");
  }

  return { data, error, isLoading };
};
