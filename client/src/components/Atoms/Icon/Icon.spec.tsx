import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/renderWithProviders";
import Icon, { IconProps } from "./Icon.component";

describe("Icon Component", () => {
    const DEFAULT_PROPS: IconProps = {
        type: "check"
    };

    it("renders with default props", () => {
        renderWithProviders(<Icon {...DEFAULT_PROPS} />);
        const iconContainer = screen.getByTestId("icon");

        expect(iconContainer).toBeInTheDocument();
        expect(iconContainer).toHaveClass("material-symbols-outlined");
        expect(screen.getByText("check")).toBeInTheDocument();
    });

    it("renders with custom size", () => {
        renderWithProviders(<Icon {...DEFAULT_PROPS} size={32} />);
        const icon = screen.getByTestId("icon");

        expect(icon).toHaveStyle({ fontSize: "32px" });
    });

    it("renders icon with correct color", () => {
        renderWithProviders(<Icon {...DEFAULT_PROPS} color="purple5" />);
        const icon = screen.getByTestId("icon");

        expect(icon).toHaveAttribute("color", "purple5");
    });
});
