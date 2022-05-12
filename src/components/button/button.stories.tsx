import React from "react";
import { Story } from "@storybook/react";
import Button, { ButtonProps } from "./button";

export default {
  title: "noyirmibir-react/button",
  component: Button,
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const ClickMe = Template.bind({});
ClickMe.args = {
    label: "Button"
};