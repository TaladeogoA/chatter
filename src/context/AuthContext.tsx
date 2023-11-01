import { createContext, useState } from "react";
import type { AuthContextType } from "../types";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  showLoginPopup: false,
  openLoginPopup: () => {},
  closeLoginPopup: () => {},
  signInWithGoogle: () => {},
  signOutUser: () => {},
  user: null,
  loading: false,
});

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const openLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const SignUpWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date(),
            uid: user.uid,
          });
        } else {
          console.log("User already exists");
        }
      }
    } catch (error) {
      console.error("Error signing up with email and password:", error);
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
        showLoginPopup,
        openLoginPopup,
        closeLoginPopup,
        signInWithGoogle,
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
