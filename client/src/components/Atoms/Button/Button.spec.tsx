import { screen } from "@testing-library/react";
import { fn, userEvent } from "@storybook/test";

import { renderWithProviders } from "../../../utils/renderWithProviders";
import Button from "./Button.component";

describe("Button Component", () => {
    const DEFAULT_PROPS = {
        label: "messages.continue",
        leftContent: <div>Left Content</div>,
        onClick: fn()
    };

    const user = userEvent.setup();

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Rendering", () => {
        it("renders button with correct label", () => {
            renderWithProviders(
                <Button {...DEFAULT_PROPS} />
            );

            expect(screen.getByText("Continue")).toBeInTheDocument();
        });
    });

    describe("Interactions", () => {
        it("calls onClick handler when clicked", async () => {
            renderWithProviders(
                <Button {...DEFAULT_PROPS} />
            );

            await user.click(screen.getByTestId("button"));

            expect(DEFAULT_PROPS.onClick).toHaveBeenCalledTimes(1);
        });

        it("disables button when disabled prop is true", async () => {
            renderWithProviders(
                <Button
                    {...DEFAULT_PROPS}
                    disabled
                />
            );

            const buttonElement = screen.getByTestId("button");

            await user.click(buttonElement);

            expect(buttonElement).toBeDisabled();
        });
    });

    describe("Loading State", () => {
        it("shows loading state when loading is true", () => {
            renderWithProviders(
                <Button
                    {...DEFAULT_PROPS}
                    loading
                />
            );

            expect(screen.getByText("Loading...")).toBeInTheDocument();
            expect(screen.getByTestId("spinner")).toBeInTheDocument();
            expect(screen.getByTestId("button")).toBeDisabled();
        });
    });
});
