import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Text from "../Text/Text.component";

import DoubleButton from "./DoubleButton.component";

const meta = {
    title: "Atoms/DoubleButton",
    component: DoubleButton,
    args: {
        onClick: fn(),
        fullWidth: false,
        disabled: false,
        loading: false,
        loadingLabel: "Work in progress..",
        type: "button",
        leftContent: (
            <Text
                as="span"
                plainText="This is additional content"
                fontWeight={600}
            />
        ),
        label: "messages.continue"
    }
} satisfies Meta<typeof DoubleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DoubleButtonStories: Story = {};
