import { createContext, useState } from "react";
import type { AuthContextType } from "../types";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUser } from "@/services/users";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  showAuthPopup: false,
  openAuthPopup: () => {},
  closeAuthPopup: () => {},
  signInWithGoogle: () => {},
  SignUpWithEmailAndPassword: () => {},
  SignInWithEmailAndPassword: () => {},
  signOutUser: () => {},
  user: null,
  loading: false,
});

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [showAuthPopup, setShowLoginPopup] = useState(false);

  // functions to be exported
  const openAuthPopup = () => {
    setShowLoginPopup(true);
  };

  const closeAuthPopup = () => {
    setShowLoginPopup(false);
  };

  const SignUpWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);

      if (res) {
        await createUser({
          email,
          uid: res.user.uid,
          displayName: res.user.displayName ? res.user.displayName : undefined,
        });
      }
    } catch (error) {
      console.error("Error signing up with email and password:", error);
    }
  };

  const SignInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error) {
      console.error("Error signing in with email and password:", error);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      console.log("User signed in");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [user, loading] = useAuthState(auth);
  const currentUser: User | null = user || null;

  return (
    <AuthContext.Provider
      value={{
        showAuthPopup,
        openAuthPopup,
        closeAuthPopup,
        signInWithGoogle,
        SignUpWithEmailAndPassword,
        SignInWithEmailAndPassword,
        signOutUser,
        user: currentUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
