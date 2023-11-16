import { UserContextType } from "@/types";
import { createContext, FC, useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getFollowersAndFollowing } from "@/services/users";

interface UserContextProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({
  followers: [],
  following: [],
});

const UserProvider: FC<UserContextProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
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
