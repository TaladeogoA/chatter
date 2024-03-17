import { useEmailSignIn } from "@/services/auth";
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

interface LoginPopupProps {
  openLoginPopup: boolean;
  onClose: () => void;
}

const LoginPopup: FC<LoginPopupProps> = ({ openLoginPopup, onClose }) => {
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

  const { mutateAsync, isLoading } = useEmailSignIn();

  const submit: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data: any) => {
    try {
      await mutateAsync(data);
      onClose();
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Modal isOpen={openLoginPopup} onClose={onClose} size="xl">
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
            Welcome Back.
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
                  Log In
                </Text>
                <Text textAlign="center">
                  Enter your email and password to login
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
                Back to login options
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
                onClick={() => {}}
              >
                <FcGoogle />
                <Text marginInline="auto">Login with Google</Text>
              </Button>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginPopup;
