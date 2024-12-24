import type { Meta, StoryObj } from "@storybook/react";

import Flex from "./Flex.component";
import { colors } from "../../../providers/theme/defaults/colors";
import { spacings } from "../../../providers/theme/defaults/spacings";

const meta = {
    title: "Atoms/Flex",
    component: Flex,
    argTypes: {
        justify: {
            control: "select",
            options: ["start", "end", "center", "space-between", "space-around"]
        },
        align: {
            control: "select",
            options: ["start", "end", "center", "space-between", "space-around"]
        },
        direction: {
            control: "select",
            options: ["row", "column"]
        },
        wrap: {
            control: "boolean"
        },
        gap: {
            control: "select",
            options: Object.keys(spacings)
        },
        marginBottom: {
            control: "select",
            options: Object.keys(spacings)
        },
        fullWidth: {
            control: "boolean"
        },
        fullHeight: {
            control: "boolean"
        }
    },
    args: {
        align: "center",
        justify: "center",
        fullHeight: true,
        fullWidth: true,
        gap: "spacing2",
        direction: "row",
        wrap: false,
        marginBottom: "spacing1"
    }
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FlexStory: Story = {
    render: (args) => (
        <div style={{ height: 300, minWidth: 700 }}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Flex {...args}>
                <Flex style={{ height: "100px", width: "100px", backgroundColor: colors.purple100 }} />
                <Flex style={{ height: "100px", width: "100px", backgroundColor: colors.purple80 }} />
                <Flex style={{ height: "100px", width: "100px", backgroundColor: colors.purple60 }} />
                <Flex style={{ height: "100px", width: "100px", backgroundColor: colors.purple40 }} />
                <Flex style={{ height: "100px", width: "100px", backgroundColor: colors.purple20 }} />
            </Flex>
        </div>
    )
};
