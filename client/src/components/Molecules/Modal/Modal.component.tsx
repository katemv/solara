import { createRef, FC, ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { animationDuration, Backdrop, FixedButtonContainer, ModalContainer, ScrollContainer } from "./styles";

export interface ModalProps {
    $visible: boolean;
    $maxWidth?: number;
    $maxHeight?: number;
    $minHeight?: number | "auto";
    onClose: () => void;
    children?: ReactNode;
    fixedButton?: ReactNode;
}
const Modal: FC<ModalProps> = ({
    onClose,
    children,
    $visible,
    $maxHeight,
    $minHeight = 200,
    $maxWidth,
    fixedButton
}) => {
    const ref = createRef<HTMLDivElement>();
    const [renderModal, setRenderModal] = useState($visible);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if ($visible) {
            setRenderModal(true);
        } else {
            // Wait for the animation to finish before unmounting
            timer = setTimeout(() => {
                setRenderModal(false);
            }, animationDuration);
        }

        return () => clearTimeout(timer);
    }, [$visible]);

    const handleClickOutside = useCallback(
        (event: MouseEvent): void => {
            if (!ref?.current) {
                return;
            }

            const isClickedOutsideModal = !(ref.current).contains(event.target as Node);

            if (isClickedOutsideModal) {
                onClose();
            }
        },
        [onClose, ref]
    );

    useEffect(() => {
        if ($visible) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [$visible, handleClickOutside]);

    return renderModal ?
        createPortal(
            <Backdrop $visible={$visible}>
                <ModalContainer
                    ref={ref}
                    $visible={$visible}
                    $maxHeight={$maxHeight}
                    $maxWidth={$maxWidth}
                    $minHeight={$minHeight}
                >
                    <ScrollContainer>
                        {children}
                    </ScrollContainer>
                    {fixedButton && (
                        <FixedButtonContainer>
                            {fixedButton}
                        </FixedButtonContainer>
                    )}
                </ModalContainer>
            </Backdrop>,
            document.body
        ) :
        null;
};

export default Modal;
