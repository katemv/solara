import { createRef, FC, ReactNode, useCallback, useEffect, useState } from "react";
import { animationDuration, Backdrop, ModalContainer } from "./styles";
import { createPortal } from "react-dom";

export interface ModalProps {
    visible: boolean;
    maxWidth?: number;
    maxHeight?: number;
    minHeight?: number | "auto";
    onClose: () => void;
    children?: ReactNode;
}
const Modal: FC<ModalProps> = ({
    onClose,
    children,
    visible,
    maxHeight,
    minHeight = 200,
    maxWidth
}) => {
    const ref = createRef<HTMLDivElement>();
    const [renderModal, setRenderModal] = useState(visible);

    useEffect(() => {
        let timer: any;

        if (visible) {
            setRenderModal(true);
        } else {
            // Wait for the animation to finish before unmounting
            timer = setTimeout(() => {
                setRenderModal(false);
            }, animationDuration);
        }

        return () => clearTimeout(timer);
    }, [visible]);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (!ref) {
                return;
            }
            const isClickedOutsideModal = !(ref.current as any).contains(event.target);

            if (isClickedOutsideModal) {
                onClose();
            }
        },
        [onClose, ref]
    );

    useEffect(() => {
        if (visible) {
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
    }, [visible, handleClickOutside]);

    return renderModal ?
        createPortal(
            <Backdrop visible={visible}>
                <ModalContainer
                    ref={ref}
                    visible={visible}
                    maxHeight={maxHeight}
                    maxWidth={maxWidth}
                    minHeight={minHeight}
                >
                    {children}
                </ModalContainer>
            </Backdrop>,
            document.body
        ) :
        null;
};

export default Modal;
