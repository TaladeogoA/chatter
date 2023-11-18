import { useSearchPosts, useSearchUsers } from "@/services/posts";
import { SearchContextType } from "@/types";
import { createContext, FC, useState, useEffect } from "react";

interface SearchContextProps {
  children: React.ReactNode;
}

const SearchContext = createContext<SearchContextType>({
  searchResults: [],
  setSearchQuery: () => {},
  searchQuery: "",
  userResults: [],
});

const SearchProvider: FC<SearchContextProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useSearchPosts({ query: searchQuery });
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
  } = useSearchUsers({ query: searchQuery });

  useEffect(() => {
    if (!isLoading && !error && !usersLoading && !usersError) {
      setSearchResults(data || []);
      setUserResults(usersData || []);
    }
  }, [data, isLoading, error, usersData, usersLoading, usersError]);

  return (
    <SearchContext.Provider
      value={{ searchResults, searchQuery, setSearchQuery, userResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
