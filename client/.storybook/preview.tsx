import type { Preview } from "@storybook/react";
import ThemeProvider from "../src/providers/theme/ThemeProvider";
import IntlProvider from "../src/providers/intlProvider";

const preview: Preview = {
    tags: ['autodocs'],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            toc: true,
        },
        layout: "centered",
    },

    decorators: [
        (Story) => (
            <IntlProvider>
                <ThemeProvider>
                    <Story />
                </ThemeProvider>
            </IntlProvider>
        ),
    ],
};

export default preview;
