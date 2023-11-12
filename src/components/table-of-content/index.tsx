import { generateTableOfContents } from "@/utils/textUtils";
import { Text, ListItem, Box, UnorderedList } from "@chakra-ui/react";
import { TypedObject } from "@sanity/types";
import { Fragment } from "react";

const TableOfContent = ({ body }: { body: TypedObject | TypedObject[] }) => {
  const headings = generateTableOfContents(body);
  //   console.log(headings);

  const nestedHeadings: { level: number; id: string; text: string }[] = [];
  const stack: { level: number; id: string }[] = [];

  headings.forEach((heading) => {
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length > 0) {
      const parent = stack[stack.length - 1];
      nestedHeadings.push({ ...heading, level: parent.level + 1 });
    } else {
      nestedHeadings.push(heading);
    }

    stack.push({ level: heading.level, id: heading.id });
  });

  return (
    <details>
      <Text as="summary" fontWeight="bold" fontSize="2xl">
        Table of Contents
      </Text>
      <UnorderedList
        mt="1rem"
        listStyleType="none"
        overflowY="auto"
        maxH="80vh"
        sx={{
          "::-webkit-scrollbar": {
            width: "7px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "6px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "darkgray",
          },
        }}
      >
        {nestedHeadings.map((heading, index) => (
          <Fragment key={heading.id}>
            <ListItem
              ml={`${heading.level * 1}rem`}
              cursor="pointer"
              _hover={{
                textDecoration: "underline",
              }}
            >
              <a
                href={`#heading-${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(`heading-${heading.id}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {heading.text}
              </a>
            </ListItem>
            {index < nestedHeadings.length - 1 && (
              <Box
                borderBottom="1px solid #ccc"
                my="0.5rem"
                mx={`${heading.level * 1}rem`}
              />
            )}
          </Fragment>
        ))}
      </UnorderedList>
    </details>
  );
};

export default TableOfContent;
