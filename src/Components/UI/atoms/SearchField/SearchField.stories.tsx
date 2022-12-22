import { ComponentStory, ComponentMeta } from "@storybook/react";

import SearchField from "./SearchField";

export default {
  title: "SearchField",
  component: SearchField,
} as ComponentMeta<typeof SearchField>;

const Template: ComponentStory<typeof SearchField> = (args) => (
  <SearchField {...args} />
);

export const Primary = Template.bind({});
Primary.args = { label: "SearchField" };
