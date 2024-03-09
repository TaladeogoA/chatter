import Navbar from "@/components/navbar/Navbar";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import { useGetAllCategories } from "@/services/category";
import { Controller, useForm } from "react-hook-form";
import React, { memo } from "react";
import DraftailEditorComponent from "@/components/editor/index";
// @ts-ignore
import { convertToHTML } from "draft-convert";
import { RawDraftContentState, convertFromRaw } from "draft-js";
import { schema } from "@/config/quillConfig";
import { htmlToBlocks } from "@sanity/block-tools";
import AsyncSelect from "@/components/async-select";
import { AuthContext } from "@/context/AuthContext";
import { postNewStory } from "@/services/new-story";
import slugify from "slugify";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const NewStory = () => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  // const [headerImage, setHeaderImage] = useState<File | null>(null);
  // const [isWrongFileType, setIsWrongFileType] = useState(false);
  const { data: categoriesData, isLoading } = useGetAllCategories();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const formHook = useForm({
    defaultValues: {
      title: "",
      brief: "",
      categories: [],
      body: [],
    },
  });
  if (typeof sessionStorage === "undefined") {
    return null;
  }
  const initial = JSON.parse(sessionStorage.getItem("content") || "null");

  const blockContentType = schema
    .get("post")
    .fields.find((field: any) => field.name === "body").type;

  const toHTML = (raw: any) =>
    raw ? convertToHTML({})(convertFromRaw(raw)) : "";

  const onSave = (content: RawDraftContentState | null) => {
    sessionStorage.setItem("content", JSON.stringify(content));
    const html = toHTML(content);
    const blocks = htmlToBlocks(html, blockContentType);
    // @ts-ignore
    formHook.setValue("body", blocks);
  };

  const categoriesOptions = (searchTerm?: string) => {
    const categories = categoriesData.map((category: any) => ({
      label: category.title,
      value: category._id,
    }));
    return {
      options: categories,
      hasMore: false,
    };
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = formHook;

  // const onUpload = (e: any) => {
  //   const file = e.target.files[0];

  //   if (!file) {
  //     return;
  //   }

  //   if (!file.type.includes("image")) {
  //     setIsWrongFileType(true);
  //     return;
  //   }

  //   setHeaderImage(file);
  // };

  const submit = async (data: any) => {
    console.log(data);
    const slug = slugify(data.title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
    if (!user) {
      toast.error("You need to be logged in to publish a story");
      return;
    }
    if (data.body.length === 0) {
      toast.error("You need to write something to publish a story");
      return;
    }

    try {
      // let headerImageAssetId = undefined;

      // if (headerImage) {
      //   headerImageAssetId = await uploadImage(headerImage);
      // }

      // if (headerImage) {
      //   const { _id } = await sanityClientWithToken.assets.upload(
      //     "image",
      //     headerImage
      //   );
      //   headerImageAssetId = _id;
      // }

      const res = await postNewStory({
        title: data.title,
        body: data.body,
        authorId: user._id,
        categories: data.categories,
        brief: data.brief,
        slug: slug,
        // headerImageAssetId: headerImageAssetId,
      });

      if (res?.ok) {
        toast.success("Story published successfully");
        router.push(`/articles/${slug}`);
      } else {
        toast.error("Failed to publish story");
      }
    } catch (error) {
      console.error("Error publishing story:", error);
      toast.error("Failed to publish story");
    }
  };

  return (
    <Box>
      <Navbar setIsPublishModalOpen={setIsPublishModalOpen} />
      <Box px="16">
        <DraftailEditorComponent initial={initial} onSave={onSave} />
      </Box>

      {isPublishModalOpen && (
        <Modal
          size="full"
          isOpen={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton mt=".5rem" />
            <Box my="1rem" borderBottom="solid 1px darkGray">
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                Publish your story
              </Text>
            </Box>
            <Box w="60%" mx="auto" my="2rem">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
                onSubmit={handleSubmit(submit)}
              >
                <FormControl>
                  <FormLabel>
                    Give your story a catchy and descriptive title. It&apos;s
                    the first thing readers will see.
                  </FormLabel>
                  <Input
                    placeholder="Enter a captivating title for your story..."
                    {...register("title", {
                      required: "This field is required",
                    })}
                  />
                  <FormHelperText color="red.500">
                    {errors.title?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl mt="1rem">
                  <FormLabel>
                    Write a brief summary of your story. This gives readers a
                    glimpse of what to expect.
                  </FormLabel>
                  <Textarea
                    placeholder="Provide a brief description of your story..."
                    {...register("brief", {
                      required: "This field is required",
                    })}
                  />

                  <FormHelperText color="red.500">
                    {errors.brief?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl mt="1rem">
                  <FormLabel>
                    Select one or more categories that best describe your story.
                    Categories help readers discover content that interests
                    them.
                  </FormLabel>
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                      <AsyncSelect
                        placeholder="Select categories..."
                        loadOptions={categoriesOptions}
                        isMulti
                        isLoading={isLoading}
                        closeOnSelect={false}
                        {...field}
                      />
                    )}
                  />
                  <FormHelperText color="red.500">
                    {errors.categories?.message}
                  </FormHelperText>
                </FormControl>

                {/* <FormControl mt="1rem">
                  <FormLabel>Header Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      e.preventDefault();
                      onUpload(e);
                    }}
                  />
                  <FormHelperText color="red.500">
                  
                  </FormHelperText>
                </FormControl> */}

                <Button
                  mt="2rem"
                  bg="black"
                  color="white"
                  alignSelf="flex-end"
                  w="fit-content"
                  borderRadius=".2rem"
                  type="submit"
                >
                  Publish Now
                </Button>
              </form>
            </Box>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default memo(NewStory);
