import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useMutation } from "react-query";
import { createUser, useGetUser } from "@/services/users";

export const useEmailSignIn = () => {
  return useMutation(
    ["emailSignIn"],
    async (data: { email: string; password: string }) => {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        throw new Error((error as Error).message);
      }
    }
  );
};

export const useEmailSignUp = () => {
  return useMutation(
    ["emailSignUp"],
    async (data: { email: string; password: string }) => {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        if (res) {
          await createUser({
            email: data.email,
            uid: res.user.uid,
            displayName: res.user.displayName
              ? res.user.displayName
              : undefined,
          });
        }
      } catch (error) {
        console.error("Error signing up with email and password:", error);
      }
    }
  );
};
