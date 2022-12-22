import { ComponentStory, ComponentMeta } from "@storybook/react";

import Divide from "./Divide";

export default {
  title: "Divide",
  component: Divide,
} as ComponentMeta<typeof Divide>;

const Template: ComponentStory<typeof Divide> = (args) => (
  <div style={{ backgroundColor: "white", padding: "10px 0" }}>
    <Divide {...args} />
  </div>
);

export const Primary = Template.bind({});
