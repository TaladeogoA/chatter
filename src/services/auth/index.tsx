import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useMutation } from "react-query";

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
