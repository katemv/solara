import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/renderWithProviders";
import IconButton, { IconButtonProps } from "./IconButton.component";
import { userEvent } from "@storybook/test";

describe("IconButton Component", () => {
    const DEFAULT_PROPS: IconButtonProps = {
        iconType: "book",
        onClick: jest.fn()
    };

    const user = userEvent.setup();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders with icon", () => {
        renderWithProviders(<IconButton {...DEFAULT_PROPS} />);
        const icon = screen.getByText("book");

        expect(screen.getByTestId("icon-button")).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass("material-symbols-outlined");
    });

    it("handles click events", async () => {
        renderWithProviders(<IconButton {...DEFAULT_PROPS} />);

        await user.click(screen.getByTestId("icon-button"));
        expect(DEFAULT_PROPS.onClick).toHaveBeenCalledTimes(1);
    });
});
