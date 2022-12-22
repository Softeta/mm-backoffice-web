import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export const htmlToContentState = (html: string) => {
  const blocksFromHtml = htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  return ContentState.createFromBlockArray(contentBlocks, entityMap);
};

export const contentStateToHtml = (state?: EditorState) =>
  state ? draftToHtml(convertToRaw(state.getCurrentContent())) : "";
