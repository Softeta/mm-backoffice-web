import { ComponentStory, ComponentMeta } from "@storybook/react";

import Circle, { CircleSide } from "./Circle";

export default {
  title: "Circle",
  component: Circle,
} as ComponentMeta<typeof Circle>;

const Template: ComponentStory<typeof Circle> = (args) => <Circle {...args} />;

export const Primary = Template.bind({});
Primary.args = { text: "Circle", side: CircleSide.Left };
