import { ComponentStory, ComponentMeta } from "@storybook/react";

import NumberSelect from "./NumberSelect";

export default {
  title: "NumberSelect",
  component: NumberSelect,
} as ComponentMeta<typeof NumberSelect>;

const Template: ComponentStory<typeof NumberSelect> = (args) => (
  <NumberSelect {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: "Number Select",
};
