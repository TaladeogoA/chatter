import { useEmailSignUp } from "@/services/auth";
import {
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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface SignUpPopupProps {
  openSignupPopup: boolean;
  onClose: () => void;
  openLoginPopup: () => void;
}

const SignUpPopup: FC<SignUpPopupProps> = ({
  openSignupPopup,
  onClose,
  openLoginPopup,
}) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
    try {
      await mutateAsync(data);
      toast.success("Signed up successfully");
      router.push("/complete-setup");
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error signing up with email and password:", error);
    }
  };

  return (
    <Modal isOpen={openSignupPopup} onClose={onClose} size="xl">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent h="80%">
        <ModalHeader mt="3rem">
          <Text className="playfair" fontSize="3xl" textAlign="center">
            Join Chatter.
          </Text>
          <Text textAlign="center" fontWeight="normal" fontSize="medium">
            Enter your email and password to sign up
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          mt="1rem"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
        >
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
                Sign Up
              </Button>
            </form>
          </FormControl>

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
              onClick={() => {
                onClose();
                openLoginPopup();
              }}
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
