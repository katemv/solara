import { css, styled } from "styled-components";

import Flex from "../Flex/Flex.component";

interface DoubleButtonProps {
    $fullWidth: boolean;
    disabled: boolean;
}

export const StyledButton = styled.button<DoubleButtonProps>(
    ({ theme, $fullWidth, disabled }) => css`
        height: 70px;
        background-color: ${theme.colors.purple80};
        width: ${$fullWidth ? "100%" : "auto"};
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${theme.spacings.spacing2};
        transition: background-color 0.2s ease-in-out;
        min-width: 320px;

        &:active {
            background: ${theme.colors.purple100};
        }

        &:hover {
            cursor: pointer;
        }

        ${disabled && `
                background: ${theme.colors.dark90};
                
                & span {
                    color: ${theme.colors.dark60};
                }

                &:hover, &:active {
                    background: ${theme.colors.dark90};
                    cursor: default;
            }
        `}
    `
);

export const RightContent = styled(Flex)<Pick<DoubleButtonProps, "disabled">>(({ theme, disabled }) => css`
    background: ${theme.colors.purple100};
    height: 100%;
    border-radius: 0 10px 10px 0;
    padding: 0 ${theme.spacings.spacing7};

    ${disabled && `
        background: ${theme.colors.dark95};
        
        & span {
            color: ${theme.colors.dark60};
        }
    `}
`);

export const LeftContent = styled(Flex)(({ theme }) => css`
    padding: 0 ${theme.spacings.spacing5};
`);

export const LoadingContainer = styled(Flex)(({ theme }) => css`
    height: 100%;
    width: 100%;
    padding: 0 ${theme.spacings.spacing7};
    border-radius: 10px;
`);
