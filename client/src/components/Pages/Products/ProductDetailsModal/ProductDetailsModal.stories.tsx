import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import ProductDetailsModal, { ProductDetailsModalProps } from "./ProductDetailsModal.component";
import { productMock } from "../../../../utils/mocks";

const meta = {
    title: "Pages/Product/Product Details Modal",
    component: ProductDetailsModal,
    tags: ["!autodocs"]
} satisfies Meta<typeof ProductDetailsModal>;

export default meta;

type Story = StoryObj<ProductDetailsModalProps>;

export const ProductDetailsModalStory: Story = {
    args: {
        product: productMock,
        $visible: true,
        onClose: fn()
    }
};
