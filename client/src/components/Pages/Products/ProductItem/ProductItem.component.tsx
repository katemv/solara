import { FC } from "react";

import { convertPrice } from "../../../../utils/convertPrice";
import Text from "../../../Atoms/Text/Text.component";
import { IProduct } from "../../../../types";

import { ImageContainer, StyledProduct, Image } from "./styles";
import Flex from "../../../Atoms/Flex/Flex.component";

export interface ProductProps {
    product: IProduct;
    horizontal?: boolean;
    onClick: () => void;
}

const ProductItem: FC<ProductProps> = ({ product, horizontal, onClick }) => {
    return (
        <StyledProduct $horizontal={horizontal} onClick={onClick}>
            <ImageContainer $horizontal={horizontal}>
                <Image src={product.image} alt={product.name} />
            </ImageContainer>
            <Flex direction="column" gap="spacing1" justify="space-around">
                <Text
                    as="p"
                    plainText={product.brand}
                    appearance="headline6"
                    color="dark20"
                    textTransform="uppercase"
                    fontWeight={300}
                />
                <Text as="h6" plainText={product.name} appearance="headline4" />
                <Text
                    as="h6"
                    plainText={convertPrice(product.price)}
                    appearance="headline4"
                    color="blue80"
                />
            </Flex>
        </StyledProduct>
    );
};

export default ProductItem;
