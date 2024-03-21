import Button, { ButtonProps } from "../../Atoms/Button/Button.component";
import { FC, ReactNode } from "react";
import { SpinIcon, StyledButton } from "../../Atoms/Button/styles";
import Text from "../../Atoms/Text/Text.component";
import { css, styled } from "styled-components";
import { Flex } from "../../Atoms/Flex/Flex.component";

interface DoubleButtonProps {
    leftContent: ReactNode;
}

const StyledDoubleButton = styled(StyledButton)(
    ({ theme }) => css`
        justify-content: space-between;
        padding-left: ${theme.spacings.spacing6};
        padding-right: 0;
        height: 70px;
    `
);

const RightContent = styled(Flex)(
    ({ theme }) => css`
        background: 0 ${theme.colors.purple100};
        padding: 0 ${theme.spacings.spacing8};
        height: 100%;
        width: auto;
        border-bottom-right-radius: 15px;
        border-top-right-radius: 15px;
    `
);

const DoubleButton: FC<Omit<ButtonProps, "type"> & DoubleButtonProps> = ({
    disabled,
    fullWidth,
    label,
    onClick,
    loading,
    loadingLabel,
    leftContent,
}) => {
    return (
        <StyledDoubleButton
            fullWidth={fullWidth}
            disabled={disabled || loading}
            loading={loading}
            onClick={onClick}
        >
            {loading && <SpinIcon type="progress_activity" />}
            {!loading && leftContent}
            <RightContent justify="center" align="center">
                <Text as="span" intlKey={loading ? loadingLabel : label} fontWeight={600} />
            </RightContent>
        </StyledDoubleButton>
    );
};

export default DoubleButton;
