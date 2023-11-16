import { createContext, useEffect, useState } from "react";
import type { AuthContextType } from "../types";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUser, useGetUser } from "@/services/users";

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
  const [userData, setUserData] = useState(null);
  const openAuthPopup = () => setShowLoginPopup(true);
  const closeAuthPopup = () => setShowLoginPopup(false);

  const SignUpWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

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
    } catch (error) {
      console.error("Error signing in with email and password:", error);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const res: UserCredential = await signInWithPopup(auth, provider);
      if (res) {
        await createUser({
          email: res.user.email || "",
          uid: res.user.uid,
          displayName: res.user.displayName ? res.user.displayName : undefined,
        });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [user, loading] = useAuthState(auth);

  const { data } = useGetUser(user?.uid);

  useEffect(() => {
    setUserData(data);
  }, [data]);

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
        user: userData,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
