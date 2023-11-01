import { createContext, useEffect, useState, ReactNode } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import type { Article, ChatterContextProps, User } from "../types";

interface ChatterProviderProps {
  children: ReactNode;
}

const ChatterContext = createContext<ChatterContextProps>({
  users: [],
  articles: [],
  articlesLoaded: false,
});

const ChatterProvider: React.FC<ChatterProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoaded, setArticlesLoaded] = useState<boolean>(false);

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

    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const fetchedArticles = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Article;
      });

      setArticles(fetchedArticles);
      setArticlesLoaded(true);
    };

    fetchUsers();
    fetchArticles();
  }, []);

  return (
    <ChatterContext.Provider value={{ users, articles, articlesLoaded }}>
      {children}
    </ChatterContext.Provider>
  );
};

export { ChatterContext, ChatterProvider };
