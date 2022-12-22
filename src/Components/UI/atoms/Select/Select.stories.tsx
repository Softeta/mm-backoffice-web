import { ComponentStory, ComponentMeta } from "@storybook/react";

import MenuItem from "Components/UI/atoms/MenuItem";
import { FormControl } from "@mui/material";
import Select from "./Select";

export default {
  title: "Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <FormControl fullWidth>
    <Select {...args}>
      <MenuItem key="1" value="1">
        Option 1
      </MenuItem>
      <MenuItem key="2" value="2">
        Option 2
      </MenuItem>
    </Select>
  </FormControl>
);

export const Primary = Template.bind({});
Primary.args = { label: "Select" };
