import { FC, useState } from "react";

import Modal, { ModalProps } from "../../../Molecules/Modal/Modal.component";
import IconButton from "../../../Atoms/IconButton/IconButton.component";
import Reviews from "../../../Organisms/Reviews/Reviews.component";
import MenuItem from "../../../Atoms/MenuItem/MenuItem.component";
import image1 from "../../../../assets/images/astro.png";
import Label from "../../../Atoms/Label/Label.component";
import BuyButton from "../BuyButton/BuyButton.component";
import { IProduct, Nullable } from "../../../../types";
import Icon from "../../../Atoms/Icon/Icon.component";
import Flex from "../../../Atoms/Flex/Flex.component";
import Text from "../../../Atoms/Text/Text.component";

import Drawer, { DrawerState } from "./Drawer/Drawer.component";
import { Image } from "./styles";

export interface ProductDetailsModalProps extends ModalProps {
    product: Nullable<IProduct>;
}

const ProductDetailsModal: FC<ProductDetailsModalProps> = ({ $visible, onClose, product }) => {
    const [drawerState, setDrawerState] = useState<Nullable<DrawerState>>(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const handleDrawerStateChange = (step: Nullable<DrawerState>) => {
        setIsDrawerVisible(!!step);
        setDrawerState(step || null);
    };

    return (
        <Modal
            $visible={$visible}
            onClose={onClose}
            $maxWidth={450}
            fixedButton={product && (
                <BuyButton
                    price={product.price}
                    onClick={() => {}}
                />
            )}
        >
            {product && (
                <>
                    <Flex direction="column">
                        <Flex justify="space-between" marginBottom="spacing4">
                            <IconButton iconType="arrow_back" onClick={onClose} />
                            <IconButton iconType="bookmark" onClick={onClose} />
                        </Flex>
                        <Image src={image1} alt={product.name} />
                        <Text
                            as="p"
                            plainText={product.brand}
                            appearance="headline6"
                            color="dark60"
                            textTransform="uppercase"
                            fontWeight={700}
                            marginBottom="spacing1"
                        />
                        <Text
                            as="h3"
                            plainText={product.name}
                            appearance="headline2"
                            marginBottom="spacing4"
                        />
                        <Flex marginBottom="spacing6" justify="space-between">
                            <Label intlKey="pages.shop.available" />
                            <Flex gap="spacing1" align="center">
                                <Icon type="star" $filled color="warning" size={17} />
                                <Text plainText="4.6" />
                                <Text plainText="(120 Reviews)" fontWeight={700} color="dark60" />
                            </Flex>
                        </Flex>
                        <Text
                            as="h3"
                            intlKey="pages.shop.product_info"
                            appearance="headline5"
                            marginBottom="spacing3"
                            color="dark10"
                        />
                        <Text
                            as="p"
                            plainText={product.description}
                            appearance="paragraph"
                            fontWeight={400}
                            color="dark60"
                            marginBottom="spacing5"
                        />
                        <div>
                            <MenuItem
                                iconKey="book"
                                intlKey="pages.shop.product_details"
                                onClick={() => handleDrawerStateChange(DrawerState.Details)}
                            />
                            <MenuItem
                                iconKey="local_shipping"
                                intlKey="pages.shop.shipping_information"
                                onClick={() => handleDrawerStateChange(DrawerState.Shipping)}
                            />
                            <MenuItem
                                iconKey="undo"
                                intlKey="pages.shop.returns"
                                marginBottom="spacing5"
                                onClick={() => handleDrawerStateChange(DrawerState.Returns)}
                            />
                        </div>
                        <Reviews rating={4.6} marginBottom="spacing5" />
                        <MenuItem
                            iconKey="comment"
                            intlKey="pages.shop.reviews"
                            onClick={() => handleDrawerStateChange(DrawerState.Reviews)}
                        />
                    </Flex>
                    <Drawer
                        isOpen={isDrawerVisible}
                        onClose={() => handleDrawerStateChange(null)}
                        drawerState={drawerState}
                    />
                </>
            )}
        </Modal>
    );
};

export default ProductDetailsModal;
