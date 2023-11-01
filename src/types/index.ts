import { Timestamp } from "firebase/firestore";
import type { ReactNode } from "react";
import { User as FirebaseAuthUser } from "firebase/auth";
import { ImageAsset, Slug } from "@sanity/types";

type Children = {
  children: ReactNode;
};

type UserData = {
  displayName: string;
  email: string;
  photoURL: string;
  // Add other fields as needed
};

interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  followerCount: number;
  followingCount: number;
  bio: string;
  joinedOn: Timestamp;
  // posts: number;
  // views: number;
  // bio: string;
}

interface Article {
  slug: Slug;
  author: {
    name: string;
  };
  brief: string;
  image: ImageAsset;
  likesCount: number;
  sharesCount: number;
  title: string;
  viewCount: number;
  category: {
    title: string;
  };
}

interface ChatterContextProps {
  users: User[];
  articles: Article[];
  articlesLoaded: boolean;
}

interface AuthContextType {
  showLoginPopup: boolean;
  openLoginPopup: () => void;
  closeLoginPopup: () => void;
  signInWithGoogle: () => void;
  signOutUser: () => void;
  user: FirebaseAuthUser | null;
  loading: boolean;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
}

interface Category {
  relatedCategories: any;
  id: string;
  name: string;
  description: string;
}

export type {
  Children,
  User,
  Article,
  ChatterContextProps,
  Category,
  AuthContextType,
  UserContextType,
};
