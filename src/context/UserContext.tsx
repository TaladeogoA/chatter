import { UserContextType } from "@/types";
import { createContext, FC, useContext, useState, useEffect } from "react";
import { getFollowersAndFollowing, useGetUser } from "@/services/users";

interface UserContextProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({
  followers: [],
  following: [],
});

const UserProvider: FC<UserContextProps> = ({ children }) => {
  const { data: user, isLoading } = useGetUser();
  const [userData, setUserData] = useState<UserContextType>({
    followers: [],
    following: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user?._id) {
        const data = await getFollowersAndFollowing(user._id);
        setUserData({
          followers: data?.followers || [],
          following: data?.following || [],
        });
      }
    };

    fetchData();
  }, [user?._id]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
