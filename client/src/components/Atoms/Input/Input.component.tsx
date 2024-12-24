import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { useIntl } from "react-intl";
import { useState } from "react";

import { Container, PasswordButton, PostfixIcon, PrefixIcon, StyledInput } from "./styles";
import Icon, { IconProps } from "../Icon/Icon.component";

export interface InputProps {
    fullWidth?: boolean;
    placeholderIntlKey?: string;
    type?: string;
    prefixIconType?: IconProps["type"];
    suffixIconType?: IconProps["type"];
}

function Input <T extends FieldValues>({
    fullWidth,
    placeholderIntlKey,
    control,
    type,
    name,
    prefixIconType,
    suffixIconType
}: InputProps & UseControllerProps<T>) {
    const [visibility, setVisibility] = useState<boolean>(false);
    const { formatMessage } = useIntl();
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, isTouched, isDirty }
        // formState: { touchedFields, dirtyFields }
    } = useController({
        name,
        control
    });

    const getInputType = () => {
        if (type === "password") {
            return visibility ? "text" : "password";
        }

        return "text";
    };

    const hasError = (isTouched || isDirty) && invalid;

    return (
        <Container fullWidth={fullWidth} align="center" direction="row">
            {prefixIconType && <PrefixIcon type={prefixIconType} $error={hasError} />}
            <StyledInput
                type={getInputType()}
                $prefixIconType={prefixIconType}
                $suffixIconType={suffixIconType}
                placeholder={placeholderIntlKey && formatMessage({ id: placeholderIntlKey })}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                $error={hasError}
                ref={ref}
            />
            {type === "password" && (
                <PasswordButton
                    type="button"
                    onClick={() => setVisibility(!visibility)}
                    $error={hasError}
                >
                    <Icon type={visibility ? "visibility_off" : "visibility"} />
                </PasswordButton>
            )}
            {type !== "password" && suffixIconType && <PostfixIcon type={suffixIconType} $error={hasError} />}
        </Container>
    );
}

export default Input;
