import { AuthContext } from "@/context/AuthContext";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { AiOutlineGoogle, AiOutlineMail } from "react-icons/ai";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isLoginClicked: boolean;
}

const LoginPopup: React.FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  isLoginClicked,
}) => {
  const { signInWithGoogle } = useContext(AuthContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent h="80%">
        <ModalHeader
          fontWeight="normal"
          fontSize="2xl"
          textAlign="center"
          mt="2rem"
        >
          {isLoginClicked ? "Welcome Back" : "Join Chatter"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody mt="2rem">
          <Button
            bg="transparent"
            borderRadius="full"
            border="1px solid black"
            w="100%"
            mb="1rem"
            _hover={{
              bg: "transparent",
              cursor: "pointer",
            }}
          >
            <AiOutlineMail
              style={{
                marginRight: "1rem",
              }}
            />
            <Link href="">Login with Email</Link>
          </Button>
          <Button
            bg="transparent"
            borderRadius="full"
            border="1px solid black"
            w="100%"
            _hover={{
              bg: "transparent",
              cursor: "pointer",
            }}
            onClick={signInWithGoogle}
          >
            <AiOutlineGoogle
              style={{
                marginRight: "1rem",
              }}
            />
            <Link href="">Login with Google</Link>
          </Button>

          {isLoginClicked ? (
            <Text textAlign="center" mt="2rem">
              Don&apos;t have an account? <Link href="">Sign Up</Link>
            </Text>
          ) : (
            <Text textAlign="center" mt="2rem">
              Already have an account? <Link href="">Login</Link>
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginPopup;
