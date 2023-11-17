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
import { createUser, getUser } from "@/services/users";

interface AuthContextProps {
  children: React.ReactNode;
}
const AuthContext = createContext<AuthContextType>({
  signInWithGoogle: () => {},
  SignUpWithEmailAndPassword: () => {},
  SignInWithEmailAndPassword: () => {},
  signOutUser: () => {},
  user: null,
  openLogin: false,
  openSignup: false,
  setOpenLogin: () => {},
  setOpenSignup: () => {},
});

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const SignUpWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const firebaseRes = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (firebaseRes) {
        await createUser({
          email: firebaseRes.user.email || "",
          uid: firebaseRes.user.uid,
          displayName: firebaseRes.user.displayName
            ? firebaseRes.user.displayName
            : undefined,
        });
        const res = await getUser(firebaseRes.user.uid);
        setUserData(res);
        console.log(userData);
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

  const getUserData = async (uid: string): Promise<void> => {
    try {
      const res = await getUser(uid);
      setUserData(res);
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      getUserData(auth.currentUser.uid);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        SignUpWithEmailAndPassword,
        SignInWithEmailAndPassword,
        signOutUser,
        user: userData,
        openLogin,
        openSignup,
        setOpenLogin,
        setOpenSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
