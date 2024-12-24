import type { Meta, StoryObj } from "@storybook/react";

import { typography } from "../../../providers/theme/defaults/typography";
import { spacings } from "../../../providers/theme/defaults/spacings";
import { colors } from "../../../providers/theme/defaults/colors";
import Flex from "../Flex/Flex.component";
import Text from "./Text.component";

const SampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const meta = {
    title: "Atoms/Text",
    component: Text,
    argTypes: {
        intlKey: { control: "text" },
        plainText: { control: "text" },
        fontWeight: { control: "number" },
        appearance: {
            control: "select",
            options: [
                "headline1",
                "headline2",
                "headline3",
                "headline4",
                "headline5",
                "headline6",
                "paragraph",
                "small",
                "tiny",
                "logo"
            ]
        },
        color: {
            control: "select",
            options: Object.keys(colors)
        },
        textAlign: {
            control: "select",
            options: Object.keys(colors)
        },
        textTransform: {
            control: "select",
            options: ["none", "uppercase", "capitalize"]
        },
        marginBottom: {
            control: "select",
            options: Object.keys(spacings)
        }

    },
    args: {
        plainText: SampleText,
        textAlign: "left"
    },
    render: (args) => (
        <Flex gap="spacing6" marginBottom="spacing6">
            <Text
                color="dark60"
                appearance={args.appearance}
                plainText={args.appearance}
                textTransform="capitalize"
                style={{ minWidth: "180px" }}
            />

            <Flex direction="column" align="start" gap="spacing2">
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Text {...args} />
                <Text
                    color="dark60"
                    plainText={`
                        ${args.appearance ? typography[args.appearance]?.fontWeight : "500"} / 
                        ${args.appearance ? typography[args.appearance]?.fontSize : "14"} / 
                        ${args.appearance ? typography[args.appearance]?.lineHeight : "140"}
                    `}
                />
            </Flex>
        </Flex>
    )
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Headline1: Story = {
    args: {
        appearance: "headline1"
    }
};

export const Headline2: Story = {
    args: {
        appearance: "headline2"
    }
};

export const Headline3: Story = {
    args: {
        appearance: "headline3"
    }
};

export const Headline4: Story = {
    args: {
        appearance: "headline4"
    }
};

export const Headline5: Story = {
    args: {
        appearance: "headline5"
    }
};

export const Headline6: Story = {
    args: {
        appearance: "headline6"
    }
};

export const Paragraph: Story = {
    args: {
        appearance: "paragraph"
    }
};

export const Small: Story = {
    args: {
        appearance: "small"
    }
};

export const Tiny: Story = {
    args: {
        appearance: "tiny"
    }
};
