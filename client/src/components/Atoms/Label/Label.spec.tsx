import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/renderWithProviders";
import Label from "./Label.component";

describe("Label Component", () => {
    const DEFAULT_PROPS = {
        intlKey: "messages.confirm"
    };

    it("renders with default props", () => {
        renderWithProviders(<Label {...DEFAULT_PROPS} />);
        const label = screen.getByText("Confirm");

        expect(label).toBeInTheDocument();
    });

    it("applies custom color", () => {
        renderWithProviders(<Label {...DEFAULT_PROPS} color="warning" />);
        const container = screen.getByText("Confirm").closest("div");

        expect(container).toHaveAttribute("color", "warning");
    });
});
