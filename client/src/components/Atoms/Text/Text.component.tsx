import { CSSProperties, FC, JSX } from "react";
import { useIntl } from "react-intl";

import { ColorsKeys, SpacingKeys, TypographyKeys } from "../../../providers/theme/types/types";
import { StyledText } from "./styles";

export interface TextProps {
    as?: keyof JSX.IntrinsicElements;
    intlKey?: string;
    plainText?: string;
    style?: CSSProperties;
    color?: ColorsKeys;
    values?: Record<string, string | number>;
    appearance?: TypographyKeys;
    marginBottom?: SpacingKeys | 0;
    textAlign?: "left" | "right" | "center" | "justify";
    fontWeight?: number;
    textTransform?: "uppercase" | "none" | "capitalize";
    textWrap?: "balance" | "pretty";
}

const Text: FC<TextProps> = ({
    as = "p",
    intlKey,
    values,
    plainText = "",
    fontWeight = 0,
    appearance = "paragraph",
    color = "white",
    textAlign = "left",
    textTransform = "none",
    marginBottom = 0,
    textWrap = "balance",
    style = {}
}) => {
    const { formatMessage } = useIntl();

    return (
        <StyledText
            as={as}
            color={color}
            style={style}
            $appearance={appearance}
            $fontWeight={fontWeight}
            $textTransform={textTransform}
            $marginBottom={marginBottom}
            $textAlign={textAlign}
            $textWrap={textWrap}
        >
            {intlKey ? formatMessage({ id: intlKey }, values) : plainText}
        </StyledText>
    );
};

export default Text;
