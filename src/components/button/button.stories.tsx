import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./button";

export default {
  title: "noyirmibir-react/button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ClickMe = Template.bind({});
ClickMe.args = {
    label: "Button"
};