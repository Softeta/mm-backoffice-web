import { ComponentStory, ComponentMeta } from "@storybook/react";

import Paper from "./Paper";

export default {
  title: "Paper",
  component: Paper,
} as ComponentMeta<typeof Paper>;

const Template: ComponentStory<typeof Paper> = (args) => <Paper {...args} />;

export const Primary = Template.bind({});
