import { useEmailSignUp } from "@/services/auth";
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
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { TbChevronsLeft } from "react-icons/tb";

interface SignUpPopupProps {
  openSignupPopup: boolean;
  onClose: () => void;
}

const SignUpPopup: FC<SignUpPopupProps> = ({ openSignupPopup, onClose }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emailAuthClicked, setEmailAuthClicked] = useState(false);

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

  const { mutateAsync, isLoading } = useEmailSignUp();

  const submit: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data: any) => {
    console.log(data);
    // try {
    //   await mutateAsync(data);
    //   toast.success("Signed up successfully");
    //   router.push("/complete-setup");
    // } catch (error: any) {
    //   toast.error(error.message);
    //   console.error("Error signing up with email and password:", error);
    // }
  };

  return (
    <Modal isOpen={openSignupPopup} onClose={onClose} size="xl">
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
            Join Chatter.
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
                  Sign Up
                </Text>
                <Text textAlign="center">
                  Enter your email and password to sign up.
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
                    // isLoading={isLoading}
                  >
                    Log In
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
                Back to signup options
              </Button>
            </>
          ) : (
            <Flex flexDir="column" alignItems="center" gap="1rem">
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
                onClick={() => {}}
              >
                <FcGoogle />
                <Text marginInline="auto">Sign up with Google</Text>
              </Button>
            </Flex>
          )}

          <Text textAlign="center" mb="4rem">
            Already have an account?
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
              onClick={() => {}}
            >
              Log In
            </Button>
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignUpPopup;
