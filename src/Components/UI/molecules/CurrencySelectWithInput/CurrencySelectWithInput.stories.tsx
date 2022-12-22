import { ComponentStory, ComponentMeta } from "@storybook/react";
import CurrencySelectWithInput from "./CurrencySelectWithInput";

export default {
  title: "CurrencySelectWithInput",
  component: CurrencySelectWithInput,
} as ComponentMeta<typeof CurrencySelectWithInput>;

const Template: ComponentStory<typeof CurrencySelectWithInput> = (args) => (
  <CurrencySelectWithInput {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: "Currency select with input",
  value: { ammount: 100.99, currency: "EUR" },
  name: { currency: "Currency", ammount: "Ammount" },
  className: "w-[200px]",
};
