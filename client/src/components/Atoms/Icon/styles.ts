import { css, styled } from "styled-components";
import { ColorsKeys } from "../../../providers/theme/types/types";

interface StyledIconProps {
    color: ColorsKeys;
    $filled: boolean;
    size: number;
}

export const StyledIcon = styled.span<StyledIconProps>(({ theme, color, $filled, size }) => css`
    font-variation-settings:
        "FILL" ${$filled ? 1 : 0},
        "wght" 400,
        "GRAD" 0,
        "opsz" ${size};
    color: ${theme?.colors?.[color] || "black"};
    font-size: ${size}px;
`);
