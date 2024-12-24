import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/renderWithProviders";
import DoubleButton from "./DoubleButton.component";
import { userEvent } from "@storybook/test";

describe("DoubleButton", () => {
    const DEFAULT_PROPS = {
        label: "messages.continue",
        leftContent: <div>Left Content</div>,
        onClick: jest.fn()
    };

    const user = userEvent.setup();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders correctly with default props", () => {
        renderWithProviders(<DoubleButton {...DEFAULT_PROPS} />);

        expect(screen.queryByTestId("loading-container")).not.toBeInTheDocument();
        expect(screen.getByText("Continue")).toBeInTheDocument();
        expect(screen.getByText("Left Content")).toBeInTheDocument();
    });

    it("handles click events when not disabled", async () => {
        renderWithProviders(<DoubleButton {...DEFAULT_PROPS} />);
        const button = screen.getByTestId("double-button");

        await user.click(button);

        expect(DEFAULT_PROPS.onClick).toHaveBeenCalledTimes(1);
    });

    it("shows loading state correctly", () => {
        renderWithProviders(<DoubleButton {...DEFAULT_PROPS} loading />);

        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(screen.queryByTestId("left-content")).not.toBeInTheDocument();
        expect(screen.queryByTestId("right-content")).not.toBeInTheDocument();
    });

    it("shows custom loading label when provided", () => {
        renderWithProviders(<DoubleButton {...DEFAULT_PROPS} loading loadingLabel="messages.resend" />);

        expect(screen.getByText("Resend")).toBeInTheDocument();
    });

    it("disables button when loading", async () => {
        renderWithProviders(<DoubleButton {...DEFAULT_PROPS} loading />);
        const button = screen.getByTestId("double-button");

        await user.click(button);

        expect(DEFAULT_PROPS.onClick).not.toHaveBeenCalled();
        expect(button).toBeDisabled();
    });

    it("disables button when disabled prop is true", async () => {
        renderWithProviders(<DoubleButton {...DEFAULT_PROPS} disabled />);
        const button = screen.getByTestId("double-button");

        await user.click(button);

        expect(DEFAULT_PROPS.onClick).not.toHaveBeenCalled();
        expect(button).toBeDisabled();
    });

    it("applies fullWidth style when prop is true", () => {
        renderWithProviders(<DoubleButton {...DEFAULT_PROPS} fullWidth />);
        const button = screen.getByTestId("double-button");

        expect(button).toHaveStyle({ width: "100%" });
    });
});
