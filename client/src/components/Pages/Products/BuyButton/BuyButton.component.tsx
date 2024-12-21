import { FC } from "react";

import DoubleButton from "../../../Atoms/DoubleButton/DoubleButton.component";
import { convertPrice } from "../../../../utils/convertPrice";
import Flex from "../../../Atoms/Flex/Flex.component";
import Text from "../../../Atoms/Text/Text.component";

interface BuyButtonProps {
    price: number;
    onClick: () => void;
}

const BuyButton: FC<BuyButtonProps> = ({ price, onClick }) => (
    <DoubleButton
        fullWidth
        label="messages.buy_now"
        onClick={onClick}
        leftContent={(
            <Flex direction="column">
                <Text
                    as="span"
                    plainText={convertPrice(price)}
                    textAlign="left"
                    fontWeight={600}
                />
                <Text
                    as="span"
                    intlKey="pages.shop.unit_price"
                    textAlign="left"
                    appearance="small"
                    color="dark10"
                />
            </Flex>
        )}
    />
);

export default BuyButton;