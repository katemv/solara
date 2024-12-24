import { FC } from "react";

import { IconKeys } from "../../../providers/theme/types/types";
import Flex, { FlexProps } from "../Flex/Flex.component";
import Text from "../Text/Text.component";
import Icon from "../Icon/Icon.component";

import { Container } from "./styles";

export interface MenuItemProps extends FlexProps {
    intlKey: string;
    iconKey: IconKeys;
    onClick?: () => void;
    testId?: string;
}

const MenuItem: FC<MenuItemProps> = ({
    intlKey,
    onClick,
    iconKey,
    marginBottom,
    fullWidth = true,
    testId = "menu-item"
}) => (
    <Container
        testId={testId}
        justify="space-between"
        align="center"
        onClick={onClick}
        marginBottom={marginBottom}
        fullWidth={fullWidth}
    >
        <Flex gap="spacing3">
            <Icon type={iconKey} color="dark40" />
            <Text
                intlKey={intlKey}
                appearance="paragraph"
                fontWeight={400}
                color="dark20"
                textTransform="capitalize"
                style={{ lineHeight: "1.6" }}
            />
        </Flex>
        <Icon size={20} type="arrow_forward_ios" />
    </Container>
);

export default MenuItem;
