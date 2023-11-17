import { useSearchPosts } from "@/services/posts";
import { SearchContextType } from "@/types";
import { createContext, FC, useState, useEffect } from "react";

interface SearchContextProps {
  children: React.ReactNode;
}

const SearchContext = createContext<SearchContextType>({
  searchResults: [],
  setSearchQuery: () => {},
  searchQuery: "",
});

const SearchProvider: FC<SearchContextProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);
  const { data, error, isLoading } = useSearchPosts({ query: searchQuery });

  useEffect(() => {
    if (!isLoading && !error) {
      setSearchResults(data || []);
    }
  }, [data, isLoading, error]);

  return (
    <SearchContext.Provider
      value={{ searchResults, searchQuery, setSearchQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
