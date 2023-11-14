import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProfileProps {
  openEditProfile: boolean;
  setOpenEditProfile: (open: boolean) => void;
  displayName: string;
  bio: string;
}
const EditProfile: FC<EditProfileProps> = ({
  openEditProfile,
  setOpenEditProfile,
  displayName,
  bio,
}) => {
  const formHook = useForm({
    defaultValues: {
      displayName,
      bio,
    },
  });

  const { handleSubmit, reset, register } = formHook;

  useEffect(() => {
    reset({
      displayName,
      bio,
    });
  }, [displayName, bio, reset]);

  const submit = (data: any) => {
    console.log(data);
    // reset();
    // setOpenEditProfile(false);
  };
  return (
    <Modal
      size="xl"
      isCentered
      isOpen={openEditProfile}
      onClose={() => setOpenEditProfile(false)}
    >
      <ModalOverlay />
      <ModalContent h="max-content">
        <ModalCloseButton />
        <ModalHeader pl="3rem">Edit Profile</ModalHeader>
        <ModalBody px="3rem" py="1rem">
          <form onSubmit={handleSubmit(submit)}>
            <FormControl>
              <Input
                placeholder="Display Name"
                border="none"
                borderBottom="1px solid black"
                borderRadius="none"
                focusBorderColor="none"
                fontWeight="semibold"
                p="0"
                _hover={{
                  borderBottom: "1px solid black",
                }}
                {...(register("displayName"),
                {
                  required: true,
                  maxLength: 50,
                })}
              />
              <FormLabel fontWeight="hairline">
                Appears on your Profile page, as your byline, and in your
                responses.
              </FormLabel>
            </FormControl>

            <FormControl mt="1rem">
              <Textarea
                placeholder="Bio"
                border="none"
                borderBottom="1px solid black"
                borderRadius="none"
                focusBorderColor="none"
                fontWeight="semibold"
                p="0"
                overflowY="auto"
                maxH="4rem"
                sx={{
                  "::-webkit-scrollbar": {
                    width: "5px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "gray",
                    borderRadius: "6px",
                  },
                  "::-webkit-scrollbar-thumb:hover": {
                    background: "darkgray",
                  },
                }}
                _hover={{
                  borderBottom: "1px solid black",
                }}
                {...(register("bio"),
                {
                  maxLength: 160,
                })}
              />
              <FormLabel fontWeight="hairline">
                Appears on your Profile and next to your stories.
              </FormLabel>
            </FormControl>
            <Flex gap="1rem" justifyContent="flex-end" my="2rem">
              <Button
                bg="transparent"
                border="1px solid black"
                borderRadius=".2rem"
                color="black"
                onClick={() => setOpenEditProfile(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                bgColor="black"
                color="white"
                borderRadius=".2rem"
              >
                Save
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
