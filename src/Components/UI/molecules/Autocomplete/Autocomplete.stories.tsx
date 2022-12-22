import { ComponentStory, ComponentMeta } from "@storybook/react";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import AvatarWithText from "../AvatarWithText";

import Autocomplete from "./Autocomplete";

export default {
  title: "Autocomplete",
  component: Autocomplete,
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = (args) => (
  <Autocomplete {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  className: "w-[400px]",
  multiple: true,
  limitTags: 1,
  label: "Country",
  options: [
    {
      id: "id-1",
      label: "Belize",
      labelNode: (
        <AvatarWithText
          size={AvatarSizeType.Small}
          title="Belize"
          imageURL="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flag_of_Belize.svg/1280px-Flag_of_Belize.svg.png"
        />
      ),
    },
    {
      id: "id-2",
      label: "Dominica",
      labelNode: (
        <AvatarWithText
          size={AvatarSizeType.Small}
          title="Dominica"
          imageURL="https://upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Dominica.png"
        />
      ),
    },
    {
      id: "id-3",
      label: "Grenada",
      labelNode: (
        <AvatarWithText
          size={AvatarSizeType.Small}
          title="Grenada"
          imageURL="https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Grenada.svg"
        />
      ),
    },
    {
      id: "id-4",
      label: "Jamaica",
      labelNode: (
        <AvatarWithText
          size={AvatarSizeType.Small}
          title="Jamaica"
          imageURL="https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Jamaica.svg"
        />
      ),
    },
  ],
  defaultValue: [
    { id: "id-2", label: "Dominican Republic" },
    { id: "id-4", label: "Jamaica" },
  ],
};
