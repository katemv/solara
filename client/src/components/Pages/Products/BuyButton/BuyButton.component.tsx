import { FC } from "react";

import DoubleButton from "../../../Atoms/DoubleButton/DoubleButton.component";
import { ButtonProps } from "../../../Atoms/Button/Button.component";
import { convertPrice } from "../../../../utils/convertPrice";
import Flex from "../../../Atoms/Flex/Flex.component";
import Text from "../../../Atoms/Text/Text.component";

interface BuyButtonProps extends Pick<ButtonProps, "loading" | "loadingLabel" | "disabled" | "fullWidth" | "type"> {
    price: number;
    onClick: () => void;
}

const BuyButton: FC<BuyButtonProps> = ({
    price,
    onClick,
    loading,
    loadingLabel = "messages.loading",
    disabled,
    fullWidth = true,
    type = "button"
}) => (
    <DoubleButton
        fullWidth={fullWidth}
        label="messages.buy_now"
        onClick={onClick}
        loading={loading}
        loadingLabel={loadingLabel}
        disabled={disabled}
        type={type}
        leftContent={(
            <Flex direction="column">
                <Text
                    as="span"
                    plainText={convertPrice(price)}
                    fontWeight={600}
                />
                <Text
                    as="span"
                    intlKey="pages.shop.unit_price"
                    appearance="small"
                    color="dark10"
                />
            </Flex>
        )}
    />
);

export default BuyButton;
