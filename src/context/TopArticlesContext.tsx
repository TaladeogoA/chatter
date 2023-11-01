import { createContext, useEffect, useState, ReactNode } from "react";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";
import type { Article } from "../types";

interface TopArticlesProviderProps {
  children: ReactNode;
}

const TopArticlesContext = createContext<Article[]>([]);

const TopArticlesProvider: React.FC<TopArticlesProviderProps> = ({
  children,
}) => {
  const [topArticles, setTopArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchTopArticles = async () => {
      const articlesRef = collection(db, "articles");
      const querySnapshot = await getDocs(
        query(articlesRef, orderBy("relevanceScore", "desc"), limit(3))
      );

      const fetchedTopArticles = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Article;
      });

      setTopArticles(fetchedTopArticles);
    };

    fetchTopArticles();
  }, []);

  return (
    <TopArticlesContext.Provider value={topArticles}>
      {children}
    </TopArticlesContext.Provider>
  );
};

export { TopArticlesContext, TopArticlesProvider };
