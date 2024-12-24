import { screen, act } from "@testing-library/react";
import { userEvent } from "@storybook/test";
import { useForm } from "react-hook-form";

import { renderWithProviders } from "../../../utils/renderWithProviders";
import Input, { InputProps } from "./Input.component";

const TestComponent = (props: InputProps) => {
    const { control } = useForm({
        defaultValues: {
            testInput: ""
        }
    });

    return (
        <Input
            control={control}
            name="testInput"
            {...props}
        />
    );
};

describe("Input Component", () => {
    const DEFAULT_PROPS: InputProps = {
        placeholderIntlKey: "forms.email_placeholder"
    };

    const user = userEvent.setup();

    it("renders text input with placeholder", () => {
        renderWithProviders(<TestComponent { ...DEFAULT_PROPS } />);
        const input = screen.getByPlaceholderText("Email address");

        expect(input).toBeInTheDocument();
    });

    it("toggles password visibility", async () => {
        renderWithProviders(<TestComponent { ...DEFAULT_PROPS } type="password" />);

        const input = screen.getByPlaceholderText("Email address");
        const toggleButton = screen.getByText("visibility");

        expect(input).toHaveAttribute("type", "password");
        await user.click(toggleButton);
        expect(toggleButton).toHaveTextContent("visibility_off");
        expect(input).toHaveAttribute("type", "text");
    });

    it("renders with prefix icon", () => {
        renderWithProviders(<TestComponent { ...DEFAULT_PROPS } prefixIconType="star" />);
        const prefixIcon = screen.getByText("star");

        expect(prefixIcon).toBeInTheDocument();
    });

    it("renders with suffix icon", () => {
        renderWithProviders(<TestComponent { ...DEFAULT_PROPS } suffixIconType="cancel" />);
        const suffixIcon = screen.getByText("cancel");

        expect(suffixIcon).toBeInTheDocument();
    });

    it("handles input changes", async () => {
        renderWithProviders(<TestComponent { ...DEFAULT_PROPS } />);
        const input = screen.getByRole("textbox");

        await act(async() => {
            await userEvent.type(input, "test value");
        });

        expect(input).toHaveValue("test value");
    });
});
