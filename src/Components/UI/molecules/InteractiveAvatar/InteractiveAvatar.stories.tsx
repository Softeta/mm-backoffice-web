import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import InteractiveAvatar from "./InteractiveAvatar";
import type { IInteractiveAvatar } from "./InteractiveAvatar";

export default {
  title: "InteractiveAvatar",
  component: InteractiveAvatar,
} as ComponentMeta<typeof InteractiveAvatar>;

const Template: ComponentStory<typeof InteractiveAvatar> = (
  args: IInteractiveAvatar
) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <InteractiveAvatar {...args} selected={selected} onSelect={setSelected} />
  );
};

export const Primary = Template.bind({});

Primary.args = {
  className: "w-[300px]",
  imageURL:
    "https://yt3.ggpht.com/ytc/AKedOLQf5MBcFSDzo2FeZIXSqafCvdRMGjW2C-0j8RpD=s900-c-k-c0x00ffffff-no-rj",
  title: "John Smith",
};
