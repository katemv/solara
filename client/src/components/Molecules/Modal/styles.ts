import { css, styled } from "styled-components";
import { ModalProps } from "./Modal.component";

export const animationDuration = 350;

export const Backdrop = styled.div<Pick<ModalProps, "$visible">>(
    ({ theme, $visible }) => css`
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

        animation: ${$visible ?
            `fadeIn ${animationDuration * 0.7}ms forwards` :
            `fadeOut ${animationDuration * 0.7}ms forwards`};
    `
);
export const ModalContainer = styled.div<Omit<ModalProps, "onClose">>(
    ({ theme, $visible, $minHeight, $maxWidth, $maxHeight }) => css`
        animation: ${$visible ?
            `slideDown ${animationDuration}ms forwards` :
            `slideUp ${animationDuration}ms forwards`};

        min-height: ${$minHeight === "auto" ? $minHeight : `${$minHeight}px`};
        min-width: 200px;
        z-index: 1000;
        ${$maxWidth && `max-width: ${$maxWidth}px;`}
        ${$maxHeight && `max-height: ${$maxHeight}px;`}
        background: ${theme.colors.dark100};
        box-shadow: ${theme.shadows.elevation2};
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
    `
);

export const ScrollContainer = styled.div(({ theme }) => css`
    overflow-x: auto;
    padding: ${theme.spacings.spacing5};
    height: 100%;
    width: 100%;
`);

export const FixedButtonContainer = styled.div(({ theme }) => css`
    padding: 0 ${theme.spacings.spacing5} ${theme.spacings.spacing4};
    position: relative;
    top: -${theme.spacings.spacing2};
`);
