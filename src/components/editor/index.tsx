// @ts-nocheck
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";

import { convertToHTML } from "draft-convert";
import { RawDraftContentState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import { schema } from "@/config/quillConfig";
import { htmlToBlocks } from "@sanity/block-tools";

const DraftailEditorComponent = () => {
  const initial = JSON.parse(sessionStorage.getItem("content") || "null");

  const blockContentType = schema
    .get("post")
    .fields.find((field: any) => field.name === "body").type;

  const toHTML = (raw: any) =>
    raw ? convertToHTML({})(convertFromRaw(raw)) : "";

  const onSave = (content: RawDraftContentState | null) => {
    sessionStorage.setItem("content", JSON.stringify(content));
    const html = toHTML(content);
    console.log("html", html);
    const blocks = htmlToBlocks(html, blockContentType);
    console.log("blocks", blocks);
  };

  return (
    <DraftailEditor
      rawContentState={initial || null}
      onSave={onSave}
      blockTypes={[
        { type: BLOCK_TYPE.HEADER_ONE },
        { type: BLOCK_TYPE.HEADER_TWO },
        { type: BLOCK_TYPE.HEADER_THREE },
        { type: BLOCK_TYPE.HEADER_FOUR },
        { type: BLOCK_TYPE.HEADER_FIVE },
        { type: BLOCK_TYPE.HEADER_SIX },
        { type: BLOCK_TYPE.UNSTYLED },
        { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
        { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
      ]}
      inlineStyles={[
        { type: INLINE_STYLE.BOLD },
        { type: INLINE_STYLE.ITALIC },
        { type: INLINE_STYLE.UNDERLINE },
      ]}
    />
  );
};

export default DraftailEditorComponent;
