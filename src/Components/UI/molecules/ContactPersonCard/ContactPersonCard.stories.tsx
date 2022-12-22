import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContactPersonCard from "./ContactPersonCard";

export default {
  title: "ContactPersonCard",
  component: ContactPersonCard,
} as ComponentMeta<typeof ContactPersonCard>;

const Template: ComponentStory<typeof ContactPersonCard> = (args) => (
  <ContactPersonCard {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  person: {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    position: {
      id: "123",
      code: "Manager",
    },
    phone: "+14844731128",
    picture: {
      uri: "https://yt3.ggpht.com/ytc/AKedOLQf5MBcFSDzo2FeZIXSqafCvdRMGjW2C-0j8RpD=s900-c-k-c0x00ffffff-no-rj",
    },
  },
  className: "w-[500px]",
};
