import { FC, HTMLAttributes } from "react";

import Text from "../Text/Text.component";
import { SpinIcon, StyledButton } from "./styles";

export interface ButtonProps extends ButtonStyleProps {
    label: string;
}

export interface ButtonStyleProps extends HTMLAttributes<HTMLButtonElement> {
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    loadingLabel?: string;
    type?: "default" | "ghost";
}

const Button: FC<ButtonProps> = ({
    label,
    fullWidth,
    disabled,
    loading,
    loadingLabel = "messages.loading",
    type = "default",
    onClick,
}) => {
    return (
        <StyledButton
            fullWidth={fullWidth}
            disabled={disabled || loading}
            loading={loading}
            type={type}
            onClick={onClick}
        >
            {loading && <SpinIcon type="progress_activity" />}
            <Text as="span" intlKey={loading ? loadingLabel : label} fontWeight={600} />
        </StyledButton>
    );
};

export default Button;
