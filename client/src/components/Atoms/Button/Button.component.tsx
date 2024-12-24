import { FC } from "react";

import Text from "../Text/Text.component";
import { SpinIcon, StyledButton } from "./styles";

export interface ButtonProps {
    label: string;
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    loadingLabel?: string;
    appearance?: "primary" | "secondary";
    type?: "button" | "submit";
    testId?: string;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
    label,
    disabled,
    fullWidth = false,
    loading = false,
    loadingLabel = "messages.loading",
    appearance = "primary",
    onClick,
    type = "button",
    testId = "button"
}) => {
    return (
        <StyledButton
            $fullWidth={fullWidth}
            $loading={loading}
            $appearance={appearance}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            data-testid={testId}
        >
            {loading && <SpinIcon testId="spinner" type="progress_activity" />}
            <Text as="span" intlKey={loading ? loadingLabel : label} fontWeight={600} />
        </StyledButton>
    );
};

export default Button;
