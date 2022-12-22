import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import AutocompleteWithTags from "./AutocompleteWithTags";
import type { IAutocompleteWithTags } from "./AutocompleteWithTags";

export default {
  title: "AutocompleteWithTags",
  component: AutocompleteWithTags,
} as ComponentMeta<typeof AutocompleteWithTags>;

const Template: ComponentStory<typeof AutocompleteWithTags> = ({
  list,
  ...rest
}: IAutocompleteWithTags) => {
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value ?? "");
  };

  return (
    <AutocompleteWithTags
      {...rest}
      search={search}
      list={list}
      onSearchChange={handleSearchChange}
    />
  );
};

export const Primary = Template.bind({});

Primary.args = {
  className: "w-[300px]",
  list: [
    { id: "1", label: "IntelliMatch" },
    { id: "2", label: "Sales Management" },
    { id: "3", label: "Share Point" },
    { id: "3", label: "Reporting & Analysis" },
  ],
  selected: [
    { id: "2", label: "Sales Management" },
    { id: "3", label: "Share Point" },
  ],
  text: {
    label: "Skills",
    searchLabel: "Search for skills",
    selectedCaption: "Added skills",
  },
};
