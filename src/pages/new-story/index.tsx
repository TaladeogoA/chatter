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
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { htmlToBlocks } from "@sanity/block-tools";
import { Schema } from "@sanity/schema";
import { useState } from "react";
import { useGetAllCategories } from "@/services/category";
import { AsyncPaginate } from "react-select-async-paginate";

const NewStory = () => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const { data: categories, isLoading } = useGetAllCategories();
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  const formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const schema = Schema.compile({
    name: "post",
    types: [
      {
        type: "object",
        name: "post",
        fields: [
          {
            title: "Title",
            type: "string",
            name: "title",
          },
          {
            title: "Body",
            name: "body",
            type: "array",
            of: [{ type: "block" }],
          },
        ],
      },
    ],
  });

  const blockContentType = schema
    .get("post")
    .fields.find((field: any) => field.name === "body").type;

  const handleContentChange = (
    content: any,
    delta: any,
    source: any,
    editor: any
  ) => {
    console.log("content", content);
    const blocks = htmlToBlocks(content, blockContentType);
    console.log("blocks", blocks);
    // console.log(editor.getHTML()); // rich text
    // console.log(editor.getText()); // plain text
    // console.log(editor.getLength()); // number of characters
  };

  const categoriesOptions = async () => {
    return {
      options: categories?.map((category: { _id: string; title: string }) => ({
        value: category._id,
        label: category.title,
      })),
      hasMore: false,
    };
  };

  // console.log("selectedCategories", selectedCategories);

  return (
    <Box>
      <Navbar setIsPublishModalOpen={setIsPublishModalOpen} />
      <Box px="16">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          style={{
            height: "80vh",
          }}
          onChange={handleContentChange}
          placeholder="Tell your story..."
        />
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

export default NewStory;
