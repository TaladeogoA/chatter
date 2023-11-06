import { NewStoryProps } from "@/types";

export const postNewStory = async ({
  title,
  body,
  authorId,
  categories,
  brief,
  slug,
}: NewStoryProps) => {
  const mutations = [
    {
      create: {
        title: title,
        slug: {
          _type: "slug",
          current: slug,
        },
        body: body,
        author: {
          _type: "reference",
          _ref: authorId,
        },
        categories: categories.map((category) => ({
          _type: "reference",
          _ref: category.value,
          _key: category.value,
        })),
        brief: brief,
        _type: "post",
      },
    },
  ];

  try {
    const res = await fetch(
      `https://x9n5g34c.api.sanity.io/v2021-10-21/data/mutate/production`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
      }
    );
    sessionStorage.removeItem("content");
    return res;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
