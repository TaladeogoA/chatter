import Navbar from "@/components/navbar/Navbar";
import {
  Box,
  Button,
  FormControl,
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
// import dynamic from "next/dynamic";
// import { htmlToBlocks } from "@sanity/block-tools";
import { useState } from "react";
import { useGetAllCategories } from "@/services/category";
import { AsyncPaginate } from "react-select-async-paginate";
import { useForm } from "react-hook-form";
// import { formats, modules, schema } from "@/config/quillConfig";
import React, { memo } from "react";
import DraftailEditorComponent from "@/components/editor/index";

const NewStory = () => {
  // const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(null);
  // const [htmlContent, setHtmlContent] = useState(
  //   "React quill is very buggy so this doesn't work yet. Will fix soon."
  // );
  // const [blockContent, setBlockContent] = useState<any>();
  const { data: categories, isLoading } = useGetAllCategories();

  // const blockContentType = schema
  //   .get("post")
  //   .fields.find((field: any) => field.name === "body").type;

  // const handleContentChange = (content: any) => {
  //   setHtmlContent(content);

  //   const blocks = htmlToBlocks(content, blockContentType);
  //   console.log("blocks", blocks);
  //   if (blocks) {
  //     setBlockContent(blocks);
  //   }
  //   console.log("blockContent", blockContent);
  // };

  const categoriesOptions = async () => {
    return {
      options: categories?.map((category: { _id: string; title: string }) => ({
        value: category._id,
        label: category.title,
      })),
      hasMore: false,
    };
  };

  const formHook = useForm({
    defaultValues: {
      title: "",
      summary: "",
      categories: [],
    },
  });

  return (
    <Box>
      <Navbar setIsPublishModalOpen={setIsPublishModalOpen} />
      <Box px="16">
        <DraftailEditorComponent />
        {/* <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          style={{
            height: "80vh",
          }}
          value={htmlContent}
          onChange={handleContentChange}
          placeholder="Tell your story..."
          key="editor"
        /> */}
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
                // onSubmit={handleSubmit(submit)}
              >
                <FormControl>
                  <FormLabel>
                    Give your story a catchy and descriptive title. It&apos;s
                    the first thing readers will see.
                  </FormLabel>
                  <Input placeholder="Enter a captivating title for your story..." />
                </FormControl>

                <FormControl mt="1rem">
                  <FormLabel>
                    Write a brief summary of your story. This gives readers a
                    glimpse of what to expect.
                  </FormLabel>
                  <Textarea placeholder="Provide a brief description of your story..." />
                </FormControl>

                <FormControl mt="1rem">
                  <FormLabel>
                    Select one or more categories that best describe your story.
                    Categories help readers discover content that interests
                    them.
                  </FormLabel>
                  <AsyncPaginate
                    loadOptions={categoriesOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    // @ts-ignore
                    onChange={setSelectedCategories}
                    value={selectedCategories}
                    isLoading={isLoading}
                  />
                </FormControl>

                <Button
                  mt="2rem"
                  bg="black"
                  color="white"
                  alignSelf="flex-end"
                  w="fit-content"
                  type="submit"
                  isDisabled
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
