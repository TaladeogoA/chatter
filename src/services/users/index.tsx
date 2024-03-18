import { useQuery, useQueryClient, useMutation } from "react-query";
import { client } from "../client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";

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
      createIfNotExists: userObj,
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
    return res;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const useGetUser = () => {
  const [user] = useAuthState(auth);
  return useQuery(
    ["user", user?.uid],
    async () => {
      const res = await client.fetch(`
      *[_type == "user" && _id == "${user?.uid}"][0] {
        _id,
        _createdAt,
        email,
        displayName,
        displayImage,
        bio,
        following[]->{_id, displayName, bio},
        followers[]->{_id, displayName, bio},
        likes[]->{_id, title, _createdAt, body, brief, slug},
        slug,
        posts[]->{_id, title, _createdAt, body, brief, slug}
      }
    `);

      return res;
    },
    {
      enabled: !!user,
    }
  );
};

export const useSignOutUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      },
    }
  );
};

export const completeSetup = async ({
  displayName,
  id,
}: {
  displayName: string;
  id: string;
}) => {
  console.log(displayName, id);
  const mutations = [
    {
      patch: {
        id: id,
        set: {
          displayName: displayName,
        },
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
    return res;
  } catch (error) {
    console.error("Error completing setup:", error);
  }
};

export const useEditUserDetails = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ["editUser"],
    async ({
      displayName,
      bio,
      id,
    }: {
      displayName: string;
      bio: string;
      id: string;
    }) => {
      const mutations = [
        {
          patch: {
            id: id,
            set: {
              displayName: displayName,
              bio: bio,
            },
          },
        },
      ];
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
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      },
    }
  );
};

export const getFollowersAndFollowing = async (uid?: string) => {
  try {
    const res = await client.fetch(`
      *[_type == "user" && _id == "${uid}"][0] {
        following[]->{_id, displayName, bio, displayImage},
        followers[]->{_id, displayName, bio, displayImage}
      }
    `);
    return res;
  } catch (error) {
    console.error("Error getting followers and following:", error);
  }
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({
    userToFollowId,
    userId,
  }: {
    userToFollowId: string;
    userId: string;
  }) => {
    const mutations = [
      {
        patch: {
          id: userId,
          set: {
            following: [
              {
                _type: "reference",
                _ref: userToFollowId,
                _key: userToFollowId,
              },
              ...(await getFollowersAndFollowing(userId)).following.map(
                (user: any) => ({
                  _type: "reference",
                  _ref: user._id,
                  _key: user._id,
                })
              ),
            ],
          },
        },
      },
      {
        patch: {
          id: userToFollowId,
          set: {
            followers: [
              {
                _type: "reference",
                _ref: userId,
                _key: userId,
              },
              ...(await getFollowersAndFollowing(userToFollowId)).followers.map(
                (user: any) => ({
                  _type: "reference",
                  _ref: user._id,
                  _key: user._id,
                })
              ),
            ],
          },
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
      return res;
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return useMutation(["followUser"], mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "following"],
      });
      getFollowersAndFollowing();
    },
  });
};
