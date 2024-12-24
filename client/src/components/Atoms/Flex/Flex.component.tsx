import { FC, HTMLAttributes } from "react";

import { SpacingKeys } from "../../../providers/theme/types/types";
import { StyledFlex } from "./styles";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    justify?: "start" | "end" | "center" | "space-between" | "space-around";
    align?: "start" | "end" | "center" | "space-between" | "space-around" | "baseline";
    direction?: "row" | "column";
    wrap?: boolean;
    gap?: SpacingKeys;
    marginBottom?: SpacingKeys;
    fullWidth?: boolean;
    fullHeight?: boolean;
    testId?: string;
    onClick?: () => void;
}

const Flex: FC<FlexProps> = ({
    justify,
    align,
    direction,
    wrap,
    gap,
    marginBottom,
    fullWidth,
    fullHeight,
    children,
    onClick,
    className,
    testId = "flex"
}) => (
    <StyledFlex
        $justify={justify}
        $align={align}
        direction={direction}
        $wrap={wrap}
        $gap={gap}
        $marginBottom={marginBottom}
        $fullWidth={fullWidth}
        $fullHeight={fullHeight}
        data-testid={testId}
        className={className}
        onClick={onClick}
    >
        {children}
    </StyledFlex>
);

export default Flex;
