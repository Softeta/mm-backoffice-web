import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import ToggleSwitch from "./ToggleSwitch";

export default {
  title: "ToggleSwitch",
  component: ToggleSwitch,
} as ComponentMeta<typeof ToggleSwitch>;

const Template: ComponentStory<typeof ToggleSwitch> = (args) => {
  const [selected, setSelected] = useState<number>(0);
  return <ToggleSwitch {...args} selected={selected} onChange={setSelected} />;
};

export const Primary = Template.bind({});
Primary.args = {
  options: [{ label: "First" }, { label: "Second" }],
};
