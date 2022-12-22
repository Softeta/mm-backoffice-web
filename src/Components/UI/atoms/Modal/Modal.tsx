/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IModal {
  /** Test id for tests */
  testId?: string;
  children?: ReactNode;
  /** Disabled closing modal on `Escape` key press */
  disableEscapeKeyDown?: boolean;
  /** Enables slide in/out animation */
  enableSlideAnimation?: boolean;
  /** Fires when component wants to be closed */
  onClose?: () => void;
  /** If `true`, component is shown */
  open: boolean;
  /** Header of Modal */
  header?: JSX.Element;
}

const animationDuration = 400;

const animationSettings = {
  animate: { x: "0" },
  exit: { x: "100%" },
  initial: { x: "100%" },
  transition: { duration: animationDuration / 1000 },
};

export const Modal = ({
  testId,
  children,
  disableEscapeKeyDown = false,
  enableSlideAnimation,
  onClose,
  open,
  header,
}: IModal) => {
  const [requestedClose, setRequestedClose] = useState(false);

  const close = useCallback(() => {
    if (enableSlideAnimation) {
      setRequestedClose(true);

      setTimeout(() => {
        if (onClose) onClose();
        setRequestedClose(false);
      }, animationDuration);
    } else if (onClose) onClose();
  }, [onClose, enableSlideAnimation]);

  const handleKeyPress = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.code === "Escape") close();
    },
    [close]
  );

  useEffect(() => {
    if (!disableEscapeKeyDown)
      window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress, disableEscapeKeyDown]);

  const animation = enableSlideAnimation ? animationSettings : {};

  useEffect(() => {
    if (open && window?.document) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (window?.document) {
        document.body.style.overflow = "unset";
      }
    };
  }, [open]);

  return open ? (
    <div className="fixed inset-0 z-50" data-testid={testId}>
      <div
        className={`z-[-1] inset-0 fixed flex ${
          enableSlideAnimation ? "justify-end" : "justify-center"
        } items-center opacity-100 bg-black/50`}
        role="dialog"
      >
        <AnimatePresence>
          {!requestedClose && (
            <motion.div
              className={`max-h-screen bg-white shadow-modal max-w-full ${
                enableSlideAnimation ? "rounded-l-2xl" : "rounded-2xl"
              }`}
              key="1"
              {...animation}
            >
              {header && <div>{header}</div>}
              <div>
                {typeof children === "function"
                  ? children({ onClose: close })
                  : children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  ) : null;
};

export default Modal;
