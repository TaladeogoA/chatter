import { NewStoryProps } from "@/types";

export const postNewStory = async ({
  title,
  body,
  author,
  categories,
  brief,
}: NewStoryProps) => {
  const mutations = [
    {
      create: {
        title: title,
        body: body,
        author: author,
        categories: categories,
        brief: brief,
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
          Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
      }
    );
    console.log(res);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
