import styled, { css } from "styled-components";

import { TextStyleProps } from "./Text.component";

export const StyledText = styled.div<TextStyleProps>(
    ({ theme, appearance, color, bold, textAlign }) => css`
        font-size: ${theme.typography[appearance].fontSize};
        font-variation-settings: "wght"
            ${theme.typography[appearance].fontWeight};
        line-height: ${theme.typography[appearance].lineHeight};
        font-variation-settings: "wght" ${bold ? "600" : "500"};
        color: ${theme.colors[color]};
        text-align: ${textAlign};
        ${appearance === "logo" &&
        `
        font-family: "Bebas Neue", sans-serif;
    `}
    `
);
