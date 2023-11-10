// @ts-nocheck
import { TypedObject } from "@sanity/types";
import { readingTime } from "reading-time-estimator";

export const calculateReadingTime = (
  blockContent: TypedObject | TypedObject[],
  wordsPerMinute = 200
) => {
  const mainText = blockContent
    .filter((block) => block._type === "block" && block.style === "normal")
    .map((block) => block.children.map((child: any) => child.text).join(""))
    .join("");

  const result = readingTime(mainText, wordsPerMinute);
  console.log(result);
  return result;
};
