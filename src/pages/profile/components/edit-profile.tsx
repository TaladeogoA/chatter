import { useEditUserDetails } from "@/services/users";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface EditProfileProps {
  openEditProfile: boolean;
  setOpenEditProfile: (open: boolean) => void;
  displayName: string;
  bio: string;
  userId: string;
}
const EditProfile: FC<EditProfileProps> = ({
  openEditProfile,
  setOpenEditProfile,
  displayName,
  bio,
  userId,
}) => {
  const editUserDetailsMutation = useEditUserDetails();
  const formHook = useForm({
    defaultValues: {
      displayName,
      bio,
    },
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = formHook;

  useEffect(() => {
    reset({
      displayName,
      bio,
    });
  }, [displayName, bio, reset]);

  const submit = async (data: any) => {
    try {
      await editUserDetailsMutation.mutateAsync({
        displayName: data.displayName,
        bio: data.bio,
        id: userId,
      });
      toast.success("Profile updated successfully");
      reset();
      setOpenEditProfile(false);
    } catch (error) {
      toast.error("Error updating profile");
    }
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
              <FormLabel fontWeight="hairline">Display Name</FormLabel>
              <Input
                border="none"
                borderBottom="1px solid black"
                borderRadius="none"
                focusBorderColor="none"
                fontWeight="semibold"
                p="0"
                _hover={{
                  borderBottom: "1px solid black",
                }}
                {...register("displayName", {
                  required: "This field is required",
                  maxLength: 50,
                })}
              />
              <FormHelperText fontWeight="hairline">
                {errors.displayName?.message ? (
                  <Text as="span" color="red.500">
                    {errors.displayName?.message}
                  </Text>
                ) : (
                  "Appears on your Profile page, as your byline and in your responses."
                )}
              </FormHelperText>
            </FormControl>

            <FormControl mt="1rem">
              <FormLabel fontWeight="hairline">Bio</FormLabel>
              <Input
                border="none"
                borderBottom="1px solid black"
                borderRadius="none"
                focusBorderColor="none"
                fontWeight="semibold"
                p="0"
                _hover={{
                  borderBottom: "1px solid black",
                }}
                {...register("bio", {
                  maxLength: 160,
                })}
              />
              <FormHelperText fontWeight="hairline">
                Appears on your Profile and next to your stories.
              </FormHelperText>
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
                _hover={{
                  bgColor: "black",
                  opacity: ".8",
                }}
                isLoading={editUserDetailsMutation.isLoading}
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
