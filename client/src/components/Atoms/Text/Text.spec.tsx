import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/renderWithProviders";
import Text, { TextProps } from "./Text.component";

describe("Text Component", () => {
    const DEFAULT_PROPS: TextProps = {
        intlKey: "components.nav.profile"
    };

    it("renders with intl key", () => {
        renderWithProviders(<Text { ...DEFAULT_PROPS } />);
        expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("renders with plain text", () => {
        renderWithProviders(
            <Text { ...DEFAULT_PROPS } intlKey={undefined} plainText="Plain Text" />
        );

        expect(screen.getByText("Plain Text")).toBeInTheDocument();
    });

    it("renders with values", () => {
        renderWithProviders(
            <Text
                { ...DEFAULT_PROPS }
                intlKey="pages.shop.based_on_reviews"
                values={{ reviewCount: 120 }}
            />
        );

        expect(screen.getByText("Based on 120 reviews")).toBeInTheDocument();
    });

    it("applies custom styles", () => {
        renderWithProviders(
            <Text
                { ...DEFAULT_PROPS }
                style={{
                    fontWeight: 700,
                    textAlign: "left",
                    textTransform: "uppercase"
                }}
            />
        );

        const text = screen.getByText("Profile");

        expect(text).toHaveStyle({
            fontWeight: 700,
            textAlign: "left",
            textTransform: "uppercase"
        });
    });

    it("renders with custom element tag", () => {
        renderWithProviders(<Text { ...DEFAULT_PROPS } as="h1" />);
        const heading = screen.getByRole("heading", { level: 1 });

        expect(heading).toBeInTheDocument();
    });

    it("renders with custom color", () => {
        renderWithProviders(<Text { ...DEFAULT_PROPS } color="success" />);
        const text = screen.getByText("Profile");

        expect(text).toHaveAttribute("color", "success");
    });

    it("applies text align property", () => {
        renderWithProviders(<Text { ...DEFAULT_PROPS } textAlign="justify" />);
        const text = screen.getByText("Profile");

        expect(text).toHaveStyle({ textAlign: "justify" });
    });

    it("applies font weight property", () => {
        renderWithProviders(<Text { ...DEFAULT_PROPS } fontWeight={800} />);
        const text = screen.getByText("Profile");

        expect(text).toHaveStyle({ fontVariationSettings: "'wght' 800" });
    });

    it("applies text transform property", () => {
        renderWithProviders(<Text { ...DEFAULT_PROPS } textTransform="uppercase" />);
        const text = screen.getByText("Profile");

        expect(text).toHaveStyle({ textTransform: "uppercase" });
    });
});
