import { FC, ReactElement } from "react";

import { ColorsKeys } from "../../../providers/theme/types/types";
import { ButtonProps } from "../Button/Button.component";
import { SpinIcon } from "../Button/styles";
import Text from "../Text/Text.component";

import { LeftContent, LoadingContainer, RightContent, StyledButton } from "./styles";

export interface DoubleButtonProps extends Omit<ButtonProps, "appearance"> {
    intlKey?: string;
    color?: ColorsKeys;
    leftContent: ReactElement;
    testId?: string;
}

const DoubleButton: FC<DoubleButtonProps> = ({
    label,
    leftContent,
    onClick,
    fullWidth = false,
    disabled = false,
    loading = false,
    loadingLabel = "messages.loading",
    type = "button",
    testId = "double-button"
}) => {
    return (
        <StyledButton
            $fullWidth={fullWidth}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            data-testid={testId}
        >
            {loading ? (
                <LoadingContainer
                    data-testid="loading-container"
                    align="center"
                    justify="center"
                    gap="spacing4"
                >
                    <SpinIcon type="progress_activity" testId="spinner" />
                    <Text
                        as="span"
                        intlKey={loadingLabel}
                        fontWeight={700}
                        textTransform="capitalize"
                    />
                </LoadingContainer>
            ) : (
                <>
                    <LeftContent
                        direction="column"
                        align="start"
                        data-testid="left-content"
                    >
                        {leftContent}
                    </LeftContent>
                    <RightContent
                        align="center"
                        disabled={disabled}
                        data-testid="right-content"
                    >
                        <Text
                            as="span"
                            intlKey={label}
                            fontWeight={700}
                            textTransform="capitalize"
                        />
                    </RightContent>
                </>
            )}
        </StyledButton>
    );
};


export default DoubleButton;
