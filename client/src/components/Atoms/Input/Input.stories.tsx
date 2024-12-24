import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

import Input from "./Input.component";
import { Icons } from "../../../providers/theme/defaults/icons";

const meta = {
    title: "Atoms/Input",
    component: Input,
    argTypes: {
        fullWidth: { control: "boolean" },
        placeholderIntlKey: { control: "text" },
        type: {
            control: "select",
            options: ["password", "default"]
        },
        prefixIconType: {
            control: "select",
            options: [...Icons, undefined]
        },
        suffixIconType: {
            control: "select",
            options: [...Icons, undefined]
        }
    },
    args: {
        fullWidth: false,
        placeholderIntlKey: "forms.email_placeholder",
        name: "email",
        prefixIconType: "mail",
        suffixIconType: "check"
    }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputStory: Story = {
    render: function Render(args) {
        const { control } = useForm();

        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Input {...args} control={control} name="email" />
        );
    }
};
