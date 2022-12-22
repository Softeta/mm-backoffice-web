import { useMemo } from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/static-toolbar";
import {
  BoldButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from "@draft-js-plugins/buttons";
import createLinkPlugin from "@draft-js-plugins/anchor";
import HeaderGroup from "./HeaderGroup";
import HeaderVariantType, { stringToHeaderVariant } from "./headerVariantTypes";

export interface IRichTextInput {
  editorState: EditorState;
  readOnly?: boolean;
  onChange: (update: EditorState) => void;
}

const staticToolbarPlugin = createToolbarPlugin({
  theme: {
    buttonStyles: {
      active: "active",
      button: "button",
    },
    toolbarStyles: {
      toolbar: "toolbar",
    },
  },
});

const { Toolbar } = staticToolbarPlugin;
const linkPlugin = createLinkPlugin();
const { LinkButton } = linkPlugin;

const RichTextInput = ({
  editorState,
  readOnly = false,
  onChange,
}: IRichTextInput) => {
  const headerType = useMemo(() => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const blockType = currentContentBlock.getType();

    return stringToHeaderVariant(blockType);
  }, [editorState]);

  const handleHeaderSelect = (headerVariant: HeaderVariantType) => {
    const newEditorState = RichUtils.toggleBlockType(
      editorState,
      headerVariant
    );
    onChange(
      EditorState.forceSelection(newEditorState, editorState.getSelection())
    );
  };

  return (
    <div
      className={`rich-text mx-4  ${
        readOnly ? "" : "border border-b border-x border-alto rounded"
      } flex flex-col overflow-hidden`}
    >
      {!readOnly && (
        <Toolbar>
          {(externalProps) => (
            <div className="px-2 flex items-center">
              <HeaderGroup value={headerType} onChange={handleHeaderSelect} />
              <Separator />
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <Separator />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <Separator />
              <LinkButton {...externalProps} />
            </div>
          )}
        </Toolbar>
      )}
      <div className="rich-text-area overflow-auto p-2 ">
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={[linkPlugin, staticToolbarPlugin]}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default RichTextInput;
