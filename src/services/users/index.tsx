export const createUser = async ({
  email,
  uid,
  displayName,
}: {
  email: string;
  uid: string;
  displayName?: string;
}) => {
  const userObj: {
    _id: string;
    _type: string;
    email: string;
    displayName?: string;
  } = {
    _id: uid,
    _type: "user",
    email: email,
  };

  if (displayName) {
    userObj.displayName = displayName;
  }

  const mutations = [
    {
      createOrReplace: userObj,
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
    console.log(res);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
