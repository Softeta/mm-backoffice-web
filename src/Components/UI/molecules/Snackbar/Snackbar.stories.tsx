import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecoilRoot, useSetRecoilState } from "recoil";

import { useEffect } from "react";
import Snackbar from "./Snackbar";
import snackbarState from "./snackbarState";

export default {
  title: "Snackbar",
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
  component: Snackbar,
} as ComponentMeta<typeof Snackbar>;

const Snack = () => {
  const setSnackbar = useSetRecoilState(snackbarState);
  useEffect(
    () =>
      setSnackbar({
        open: true,
        message: "This is snackbar",
        severity: "success",
      }),
    [setSnackbar]
  );
  return <Snackbar />;
};

const Template: ComponentStory<typeof Snackbar> = () => <Snack />;

export const Primary = Template.bind({});
