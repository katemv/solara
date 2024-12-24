import styled, { css } from "styled-components";

import { ColorsKeys, SpacingKeys, TypographyKeys } from "../../../providers/theme/types/types";

interface StyledProps {
    color: ColorsKeys;
    $appearance: TypographyKeys;
    $marginBottom: SpacingKeys | 0;
    $textAlign: "left" | "right" | "center" | "justify";
    $fontWeight: number;
    $textTransform: "uppercase" | "none" | "capitalize";
    $textWrap: "balance" | "pretty";
}

export const StyledText = styled.div<StyledProps>(
    ({ theme, $appearance, color, $textAlign, $fontWeight, $textTransform, $marginBottom, $textWrap }) => css`
        font-size: ${theme.typography[$appearance]?.fontSize};
        font-variation-settings: "wght" ${theme.typography[$appearance].fontWeight};
        line-height: ${theme.typography[$appearance].lineHeight};
        color: ${theme?.colors?.[color] || "black"};
        text-transform: ${$textTransform};
        text-align: ${$textAlign};
        ${$appearance === "logo" && "font-family: 'Bebas Neue', sans-serif;"}
        ${$fontWeight !== 0 && `font-variation-settings: 'wght' ${$fontWeight};`}
        ${$marginBottom && `margin-bottom: ${theme.spacings[$marginBottom]};`}
        text-wrap: ${$textWrap};
    `
);
