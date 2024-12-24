import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Button from "../../Atoms/Button/Button.component";
import Modal, { ModalProps } from "./Modal.component";
import Text from "../../Atoms/Text/Text.component";

const meta = {
    title: "Molecules/Modal",
    component: Modal,
    argTypes: {
        $visible: { control: "boolean" },
        $maxWidth: { control: "number" },
        $maxHeight: { control: "number" },
        $minHeight: { control: "number" }
    },
    args: {
        $visible: false,
        $maxWidth: 500
    }
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<ModalProps>;

function StoryComponent({ $maxWidth, $maxHeight, $minHeight }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <Button label="Open" onClick={() => setIsVisible(true)} />
            <Modal
                {...{ $maxHeight, $maxWidth, $minHeight }}
                $visible={isVisible}
                onClose={() => setIsVisible(false)}
            >
                <Text
                    as="h3"
                    plainText="Luminary Dust"
                    appearance="headline4"
                    marginBottom="spacing4"
                    textTransform="uppercase"
                />
                <Text
                    as="p"
                    plainText={`
                        Submerge yourself in the radiance of deep space nebulae with LuminaryDust - a 
                        cosmic-inspired highlighter. Created with minerals found in the heart of distant galaxies,
                        this unique highlighter acts as a wearable homage to the beauty of the cosmos.
                    `}
                    appearance="paragraph"
                    fontWeight={300}
                    color="dark20"
                />
            </Modal>
        </>
    );
}

export const ModalStory: Story = { render: StoryComponent };
