import { css, styled } from "styled-components";
import Flex from "../Flex/Flex.component";
import Icon from "../Icon/Icon.component";

interface StyledInputProps {
    $prefixIconType?: string;
    $suffixIconType?: string;
    $error?: boolean;
}

interface IconProps {
    $error: boolean;
}

export const StyledInput = styled.input<StyledInputProps>(
    ({ theme, $prefixIconType, $suffixIconType, $error }) => css`
        color: ${theme.colors.white};
        background: ${theme.colors.dark90};
        border-radius: 10px;
        width: 100%;
        height: 100%;
        background: ${theme.colors.dark90};
        padding: 0 ${theme.spacings.spacing4};
        
        ${$prefixIconType && css`
            padding-left: ${theme.spacings.spacing8};
        `}

        ${$suffixIconType && css`
            padding-right: ${theme.spacings.spacing8};
        `}
        
        ${$error && css`
            color: ${theme.colors.danger};

            &::placeholder {
                color: ${theme.colors.danger};
                opacity: 1;
            }

            &::-ms-input-placeholder {
                color: ${theme.colors.danger};
            }
        `}
    `
);

export const Container = styled(Flex)`
    height: 50px;
    position: relative;
    padding-top: 2px;
`;

export const PrefixIcon = styled(Icon)<IconProps>(({ theme, $error }) => css`
    position: absolute;
    left: ${theme.spacings.spacing4};
    font-size: 20px;

    ${$error && css`
        color: ${theme.colors.danger};
    `}
`);

export const PostfixIcon = styled(Icon)<IconProps>(({ theme, $error }) => css`
    position: absolute;
    right: ${theme.spacings.spacing4};
    font-size: 20px;

    ${$error && css`
        color: ${theme.colors.danger};
    `}
`);

export const PasswordButton = styled.button<IconProps>(({ theme, $error }) => css`
    background: transparent;
    position: absolute;
    right: ${theme.spacings.spacing4};
    padding-top: 3px;
    cursor: pointer;
    
    & span {
        font-size: 20px;

        ${$error && css`
            color: ${theme.colors.danger};
        `}
    }
`);
