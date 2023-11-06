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
  const { data: categoriesData, isLoading } = useGetAllCategories();
  const { user } = useContext(AuthContext);
  const initial = JSON.parse(sessionStorage.getItem("content") || "null");
  const router = useRouter();

  const blockContentType = schema
    .get("post")
    .fields.find((field: any) => field.name === "body").type;

  const toHTML = (raw: any) =>
    raw ? convertToHTML({})(convertFromRaw(raw)) : "";

  const onSave = (content: RawDraftContentState | null) => {
    sessionStorage.setItem("content", JSON.stringify(content));
    const html = toHTML(content);
    const blocks = htmlToBlocks(html, blockContentType);
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

  const formHook = useForm({
    defaultValues: {
      title: "",
      brief: "",
      categories: [],
      body: [],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = formHook;

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
    const res = await postNewStory({
      title: data.title,
      body: data.body,
      authorId: user._id,
      categories: data.categories,
      brief: data.brief,
      slug: slug,
    });
    if (res.ok) {
      toast.success("Story published successfully");
      router.push(`/articles/${slug}`);
    } else {
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

                <Button
                  mt="2rem"
                  bg="black"
                  color="white"
                  alignSelf="flex-end"
                  w="fit-content"
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
