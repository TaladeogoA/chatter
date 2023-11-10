import { Timestamp } from "firebase/firestore";
import type { ReactNode } from "react";
import { User as FirebaseAuthUser } from "firebase/auth";
import {
  ImageAsset,
  PortableTextBlock,
  Reference,
  Slug,
  TypedObject,
} from "@sanity/types";

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
  _id: string;
  slug: Slug;
  author: {
    displayName: string;
  };
  brief: string;
  image: ImageAsset;
  likesCount: number;
  sharesCount: number;
  title: string;
  viewCount: number;
  category?: {
    title: string;
  };
  categories?: {
    title: string;
  }[];
  body: TypedObject | TypedObject[];
  _createdAt: string;
}

interface CategoryContentProps {
  _id: string;
  slug: Slug;
  title: string;
  categories: {
    title: string;
    description: string;
    _id: string;
  }[];
  author: {
    displayName: string;
  };
  _createdAt: string;
  image: ImageAsset;
  body: TypedObject | TypedObject[];
}

interface ChatterContextProps {
  users: User[];
}

interface AuthContextType {
  showAuthPopup: boolean;
  openAuthPopup: () => void;
  closeAuthPopup: () => void;
  signInWithGoogle: () => void;
  SignUpWithEmailAndPassword: (email: string, password: string) => void;
  SignInWithEmailAndPassword: (email: string, password: string) => void;
  signOutUser: () => void;
  user: any;
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

interface NewStoryProps {
  title: string;
  body: PortableTextBlock[];
  authorId: string;
  categories: any[];
  brief: string;
  slug: string;
  headerImageAssetId?: string;
}

export type {
  Children,
  User,
  Article,
  CategoryContentProps,
  ChatterContextProps,
  Category,
  AuthContextType,
  UserContextType,
  NewStoryProps,
};
