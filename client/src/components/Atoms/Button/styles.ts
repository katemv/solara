import styled, { css } from "styled-components";

import Icon from "../Icon/Icon.component";

interface ButtonStyleProps {
    $fullWidth: boolean;
    $loading: boolean;
    $appearance: "primary" | "secondary";
}

export const StyledButton = styled.button<ButtonStyleProps>(
    ({ theme, $fullWidth, disabled, $loading, $appearance }) => css`
        height: 50px;
        background-color: ${theme.colors.purple80};
        width: ${$fullWidth ? "100%" : "auto"};
        border-radius: 10px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${theme.spacings.spacing2};
        transition: background-color 0.2s ease-in-out;

        &:hover,
        &:active {
            background: ${theme.colors.purple100};
        }

        &:hover {
            cursor: pointer;
        }

        ${$loading && `
            background: ${theme.colors.purple80};

            &:hover, &:active {
                background: ${theme.colors.purple80};
                cursor: default;
            }
        `}

        ${disabled && `
                background: ${theme.colors.dark90};

                &:hover, &:active {
                    background: ${theme.colors.dark90};
                    cursor: default;
            }
        `}

        ${$appearance === "secondary" && `
            background: transparent;
            border: 2px solid ${theme.colors.dark90};
            transition: border-color 0.2s ease-in-out;

            &:hover,
            &:active {
                background: transparent;
                border-color: ${theme.colors.dark90};
            }
        `}
    `
);

export const SpinIcon = styled(Icon)(({ theme }) => css`
    animation-name: spin;
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    color: ${theme.colors.white};
`);
