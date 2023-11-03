import { createContext, useEffect, useState, ReactNode } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import type { Article, ChatterContextProps, User } from "../types";

interface ChatterProviderProps {
  children: ReactNode;
}

const ChatterContext = createContext<ChatterContextProps>({
  users: [],
});

const ChatterProvider: React.FC<ChatterProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as User;
      });

      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <ChatterContext.Provider value={{ users }}>
      {children}
    </ChatterContext.Provider>
  );
};

export { ChatterContext, ChatterProvider };
