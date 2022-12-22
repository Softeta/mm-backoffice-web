import { ComponentStory, ComponentMeta } from "@storybook/react";

import SectionHeading from "./SectionHeading";

export default {
  title: "SectionHeading",
  component: SectionHeading,
} as ComponentMeta<typeof SectionHeading>;

const Template: ComponentStory<typeof SectionHeading> = (args) => (
  <SectionHeading {...args} />
);

export const Primary = Template.bind({});
Primary.args = { title: "Section Heading" };
