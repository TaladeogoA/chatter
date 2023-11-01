import { createContext, useEffect, useState, ReactNode } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import type { Category } from "../types";

interface CategoriesProviderProps {
  children: ReactNode;
}

const CategoriesContext = createContext<Category[]>([]);

const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));

      const fetchedCategories = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Category;
      });

      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesProvider };
