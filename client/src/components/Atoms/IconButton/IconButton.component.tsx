import { FC } from "react";

import { IconKeys } from "../../../providers/theme/types/types";
import Icon from "../Icon/Icon.component";

import { StyledIconButton } from "./styles";

export interface IconButtonProps {
    iconType: IconKeys;
    onClick?: () => void;
    testId?: string;
}

const IconButton:FC<IconButtonProps> = ({ iconType, onClick, testId = "icon-button" }) => (
    <StyledIconButton onClick={onClick} data-testid={testId}>
        <Icon type={iconType} color="dark10" />
    </StyledIconButton>
);

export default IconButton;
