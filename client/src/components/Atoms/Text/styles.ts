import styled, { css } from "styled-components";

import { TextStyleProps } from "./Text.component";
import { SpacingKeys } from "../../../providers/theme/types/types";

type StyledTextProps = Omit<
    TextStyleProps,
    "textAlign" | "textTransform" | "marginBottom" | "textWrap"
> & {
    $textAlign?: "left" | "right" | "center";
    $textTransform?: "uppercase" | "none";
    $marginBottom?: SpacingKeys | 0;
    $textWrap?: "balance" | "pretty" | "unset";
};
export const StyledText = styled.div<StyledTextProps>(
    ({
        theme,
        appearance,
        color,
        $textWrap,
        $textAlign,
        fontWeight,
        $textTransform,
        $marginBottom,
    }) => css`
        font-size: ${theme.typography[appearance].fontSize};
        font-variation-settings: "wght" ${theme.typography[appearance].fontWeight};
        line-height: ${theme.typography[appearance].lineHeight};
        color: ${theme.colors[color]};
        text-transform: ${$textTransform};
        text-align: ${$textAlign};
        text-wrap: ${$textWrap ? $textWrap : "balance"};
        ${appearance === "logo" && "font-family: 'Bebas Neue', sans-serif;"}
        ${fontWeight !== 0 && `font-variation-settings: 'wght' ${fontWeight};`}
        ${$marginBottom && `margin-bottom: ${theme.spacings[$marginBottom]};`}
    `
);
