import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import Button from "Components/UI/atoms/Button";
import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const Primary: ComponentStory<typeof Modal> = (args) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Button label="Open modal" onClick={() => setOpen(true)} />
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        {(props: { onClose: () => void }) => (
          <>
            <p>Modal content</p>
            <Button onClick={() => props.onClose()} label="Close" fullWidth />
          </>
        )}
      </Modal>
    </div>
  );
};
