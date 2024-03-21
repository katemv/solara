import { FC } from "react";

import DoubleButton from "../../../Molecules/DoubleButton/DoubleButton.component";
import Modal, { ModalProps } from "../../../Molecules/Modal/Modal.component";
import { convertPrice } from "../../../../utils/convertPrice";
import { Flex } from "../../../Atoms/Flex/Flex.component";
import image from "../../../../assets/images/astro.png";
import { IProduct, Nullable } from "../../../../types";
import Text from "../../../Atoms/Text/Text.component";
import { Image } from "./styles";

interface ProductDetailsModalProps extends ModalProps {
    product: Nullable<IProduct>;
}

const ProductDetailsModal: FC<ProductDetailsModalProps> = ({ visible, onClose, product }) => {
    return (
        <Modal visible={visible} onClose={onClose} maxWidth={450}>
            {product && (
                <Flex direction="column" gap="spacing2">
                    <Image src={image} alt={product.name} />
                    <Text
                        as="p"
                        plainText={product.brand}
                        appearance="headline6"
                        textTransform="uppercase"
                        fontWeight={300}
                        textAlign="left"
                        color="grey60"
                    />
                    <Text
                        as="h3"
                        plainText="LuminaryDust - Galactic Gleam Highlighter"
                        marginBottom="spacing4"
                        appearance="headline2"
                        textAlign="left"
                    />
                    <Text
                        as="h3"
                        intlKey="components.product_details.product_details"
                        appearance="headline5"
                        textAlign="left"
                    />
                    <Text
                        as="p"
                        plainText={`Submerge yourself in the radiance of deep space nebulae with LuminaryDust - a 
                            cosmic-inspired highlighter. Created with minerals found in the heart of distant galaxies,
                            this unique highlighter acts as a wearable homage to the beauty of the cosmos.
                        `}
                        appearance="paragraph"
                        textAlign="left"
                        fontWeight={300}
                        color="grey60"
                        marginBottom="spacing5"
                    />
                    <DoubleButton
                        label="messages.buy_now"
                        leftContent={
                            <Flex direction="column">
                                <Text
                                    as="span"
                                    plainText={convertPrice(product.price)}
                                    textAlign="left"
                                    appearance="headline4"
                                />
                                <Text
                                    as="span"
                                    intlKey="components.product_details.unit_price"
                                    textAlign="left"
                                    appearance="small"
                                    fontWeight={300}
                                />
                            </Flex>
                        }
                    />
                </Flex>
            )}
        </Modal>
    );
};

export default ProductDetailsModal;
