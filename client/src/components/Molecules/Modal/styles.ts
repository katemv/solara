import { css, styled } from "styled-components";
import { ModalProps } from "./Modal.component";

export const animationDuration = 350;

export const Backdrop = styled.div<{ visible: boolean }>(
    ({ theme, visible }) => css`
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background: ${theme.colors.backdrop};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${theme.spacings.spacing5};
        z-index: 1000;

        animation: ${visible
            ? `fadeIn ${animationDuration * 0.7}ms forwards`
            : `fadeOut ${animationDuration * 0.7}ms forwards`};
    `
);
export const ModalContainer = styled.div<Omit<ModalProps, "onClose">>(
    ({ theme, visible, minHeight, maxWidth, maxHeight }) => css`
        animation: ${visible
            ? `slideDown ${animationDuration}ms forwards`
            : `slideUp ${animationDuration}ms forwards`};

        min-height: ${minHeight === "auto" ? minHeight : `${minHeight}px`};
        min-width: 200px;
        z-index: 1000;
        ${maxWidth && `max-width: ${maxWidth}px;`}
        ${maxHeight && `max-height: ${maxHeight}px;`}
        background: ${theme.colors.dark};
        box-shadow: ${theme.shadows.elevation2};
        border-radius: 20px;
        padding: ${theme.spacings.spacing5};
        overflow: auto;

        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-track {
            background-color: ${theme.colors.dark};
            border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${theme.colors.dark90};
            border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: ${theme.colors.black90};
        }
    `
);
