import { Heading } from "@/types";
import { TypedObject } from "@sanity/types";
import { readingTime } from "reading-time-estimator";

export const calculateReadingTime = (
  blockContent: TypedObject | TypedObject[],
  wordsPerMinute = 200
) => {
  //@ts-ignore
  const mainText = blockContent
    .filter((block: any) => block._type === "block" && block.style === "normal")
    .map((block: any) =>
      block.children.map((child: any) => child.text).join("")
    )
    .join("");

  const result = readingTime(mainText, wordsPerMinute);
  return result;
};

export const generateTableOfContents = (body: TypedObject | TypedObject[]) => {
  const headings: Heading[] = [];
  const toc: Heading[] = [];

  // Function to add a heading to the TOC
  const addHeadingToTOC = (heading: Heading) => {
    toc.push({
      level: heading.level,
      text: heading.text,
      id: heading.id,
    });
  };

  const blocks = Array.isArray(body) ? body : [body];

  blocks.forEach((block) => {
    if (
      block._type === "block" &&
      (block.style as string) &&
      (block.style as string).startsWith("h") &&
      (block.children as [
        {
          _type: string;
          _key: string;
          text: string;
          marks: string[];
        }
      ]) &&
      (
        block.children as [
          {
            _type: string;
            _key: string;
            text: string;
            marks: string[];
          }
        ]
      ).length > 0
    ) {
      const heading: Heading = {
        level: parseInt((block.style as string).slice(1), 10),
        text: (
          block.children as [
            {
              _type: string;
              _key: string;
              text: string;
              marks: string[];
            }
          ]
        )[0].text as string,
        id: block._key as string,
      };
      headings.push(heading);
      addHeadingToTOC(heading);
    }
  });

  return toc;
};
