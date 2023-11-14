import { AuthContext } from "@/context/AuthContext";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { TbChevronsLeft } from "react-icons/tb";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({
  isOpen,
  onClose,
  isLogin,
  setIsLogin,
}) => {
  const {
    signInWithGoogle,
    SignUpWithEmailAndPassword,
    SignInWithEmailAndPassword,
  } = useContext(AuthContext);
  const [emailAuthClicked, setEmailAuthClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formHook = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook;

  const submit: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data: any) => {
    try {
      if (isLogin) {
        setIsLoading(true);
        await SignInWithEmailAndPassword(data.email, data.password);
        toast.success("Logged in successfully");
        onClose();
        setIsLoading(false);
      } else {
        setIsLoading(true);
        await SignUpWithEmailAndPassword(data.email, data.password);
        toast.success("Signed up successfully");
        setIsLoading(false);
        router.push("/complete-setup");
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error signing up with email and password:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent h="80%">
        {!emailAuthClicked && (
          <ModalHeader
            fontWeight="normal"
            fontSize="3xl"
            textAlign="center"
            mt="2rem"
            className="toledo"
          >
            {isLogin ? "Welcome Back." : "Join Chatter."}
          </ModalHeader>
        )}

        <ModalCloseButton />

        <ModalBody
          mt="1rem"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
        >
          {emailAuthClicked ? (
            <>
              <Box mt="3rem">
                <Text className="toledo" fontSize="3xl" textAlign="center">
                  {isLogin ? "Log In" : "Sign Up"}
                </Text>
                <Text textAlign="center">
                  {isLogin
                    ? "Enter your email and password to login."
                    : "Enter your email and password to sign up."}
                </Text>
              </Box>

              <FormControl>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    width: "70%",
                    marginInline: "auto",
                  }}
                  onSubmit={handleSubmit(submit)}
                >
                  <Flex
                    flexDir="column"
                    alignItems="center"
                    gap="1rem"
                    w="100%"
                    mx="auto"
                    mb="2rem"
                  >
                    <Input
                      placeholder="Email"
                      border="none"
                      borderBottom="1px solid black"
                      borderRadius="none"
                      focusBorderColor="none"
                      _hover={{
                        borderBottom: "1px solid black",
                      }}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email",
                        },
                      })}
                    />
                    <FormHelperText color="red">
                      {errors.email && errors.email.message}
                    </FormHelperText>
                    <InputGroup>
                      <Input
                        placeholder="Password"
                        border="none"
                        borderBottom="1px solid black"
                        borderRadius="none"
                        focusBorderColor="none"
                        type={showPassword ? "text" : "password"}
                        _hover={{
                          borderBottom: "1px solid black",
                        }}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                      />

                      <InputRightElement>
                        {
                          <Button
                            bg="transparent"
                            p="2"
                            _hover={{
                              bg: "transparent",
                            }}
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <AiOutlineEyeInvisible size="1.2rem" />
                            ) : (
                              <AiOutlineEye size="1.2rem" />
                            )}
                          </Button>
                        }
                      </InputRightElement>
                    </InputGroup>

                    <FormHelperText color="red">
                      {errors.password && errors.password.message}
                    </FormHelperText>
                  </Flex>

                  <Button
                    bg="black"
                    color="white"
                    w="100%"
                    mx="auto"
                    type="submit"
                    isLoading={isLoading}
                  >
                    {isLogin ? "Log In" : "Sign Up"}
                  </Button>
                </form>
              </FormControl>
              <Button
                textAlign="center"
                bg="transparent"
                w="max-content"
                mx="auto"
                mb="2rem"
                fontWeight="normal"
                fontSize="sm"
                _hover={{
                  bg: "transparent",
                  cursor: "pointer",
                  textDecor: "underline",
                }}
                onClick={() => {
                  setEmailAuthClicked(false);
                }}
              >
                <TbChevronsLeft />
                {isLogin ? "Back to login options" : "Back to signup options"}
              </Button>
            </>
          ) : (
            <>
              <Flex flexDir="column" alignItems="center" gap="1rem">
                {isLogin ? (
                  <>
                    <Button
                      bg="transparent"
                      border="1px solid black"
                      w="60%"
                      _hover={{
                        bg: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEmailAuthClicked(true);
                      }}
                    >
                      <AiOutlineMail />
                      <Text marginInline="auto">Login with Email</Text>
                    </Button>
                    <Button
                      bg="transparent"
                      border="1px solid black"
                      w="60%"
                      _hover={{
                        bg: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={signInWithGoogle}
                    >
                      <FcGoogle />
                      <Text marginInline="auto">Login with Google</Text>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      bg="transparent"
                      border="1px solid black"
                      w="60%"
                      _hover={{
                        bg: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEmailAuthClicked(true);
                      }}
                    >
                      <AiOutlineMail />
                      <Text marginInline="auto">Sign up with Email</Text>
                    </Button>
                    <Button
                      bg="transparent"
                      border="1px solid black"
                      w="60%"
                      _hover={{
                        bg: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={signInWithGoogle}
                    >
                      <FcGoogle />
                      <Text marginInline="auto">Sign up with Google</Text>
                    </Button>
                  </>
                )}
              </Flex>

              <Text textAlign="center" mb="4rem">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Button
                  bg="transparent"
                  color="black"
                  fontWeight="semibold"
                  p="2"
                  textDecor="underline"
                  _hover={{
                    cursor: "pointer",
                    textDecor: "none",
                  }}
                  onClick={() => {
                    setIsLogin(!isLogin);
                  }}
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </Button>
              </Text>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthPopup;
