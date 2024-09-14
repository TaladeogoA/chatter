// // @ts-ignore
// import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";
// import "draft-js/dist/Draft.css";
// import "draftail/dist/draftail.css";
// import { RawDraftContentState } from "draft-js";

// const DraftailEditorComponent = ({
//   initial,
//   onSave,
// }: {
//   initial: RawDraftContentState | null;
//   onSave: (content: RawDraftContentState | null) => void;
// }) => {
//   return (
//     <DraftailEditor
//       rawContentState={initial || null}
//       onSave={onSave}
//       blockTypes={[
//         { type: BLOCK_TYPE.HEADER_ONE },
//         { type: BLOCK_TYPE.HEADER_TWO },
//         { type: BLOCK_TYPE.HEADER_THREE },
//         { type: BLOCK_TYPE.HEADER_FOUR },
//         { type: BLOCK_TYPE.HEADER_FIVE },
//         { type: BLOCK_TYPE.HEADER_SIX },
//         { type: BLOCK_TYPE.UNSTYLED },
//         { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
//         { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
//       ]}
//       inlineStyles={[
//         { type: INLINE_STYLE.BOLD },
//         { type: INLINE_STYLE.ITALIC },
//         { type: INLINE_STYLE.UNDERLINE },
//       ]}
//       style={{ minHeight: "80vh" }}
//     />
//   );
// };

// export default DraftailEditorComponent;
