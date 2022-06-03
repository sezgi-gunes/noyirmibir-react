import React from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Form from ".";
import InputDate from "./items/input-date";
import { ValidationType } from './models/validations';
import InputSplit from "./items/input-split";
import FileUpload from "./items/file-upload";

export default {
    title: "noyirmibir-react/form",
    component: Form,
};

const Template: Story = (args) => {
    return <Noyirmibir>
        <Form submitFunction={(model: any) => { console.log(model) }}>
            <FileUpload name="file"></FileUpload>
            <button type="submit">Gönder</button>
        </Form>
    </Noyirmibir>
};

export const Sample = Template.bind({});
Sample.args = {
    classNames: "Test"
};