import React, { useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import useFocusTrap from "utils/hooks/useFocusTrap";
import useKeydownEvent from "utils/hooks/useKeydownEvent";
import useOutsideClick from "utils/hooks/useOutsideClick";
import usePageScrollDisabling from "utils/hooks/usePageScrollDisabling";
import Button from "components/Button/Button";
import IconClose from "./assets/times.svg";
import styles from "./Modal.module.scss";

export type TModalProps = {
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  children: React.ReactNode | React.ReactNode[];
};

const Modal = ({ children, onClose, onConfirm, onCancel }: TModalProps) => {
  const refModal: React.RefObject<HTMLDivElement> = useRef(null);

  useKeydownEvent({ Escape: onClose });
  useOutsideClick(refModal, onClose);
  useFocusTrap(refModal);
  usePageScrollDisabling();

  // Trigger sliding animation after mounting:

  // Unmount the element after it has slid out:
  // TODO: This does not work! The element does not slide out on mobile!

  return ReactDOM.createPortal(
    <dialog open className={classNames(styles.Modal)} aria-live="polite">
      <div className={styles.modalPanel} ref={refModal}>
        <Button
          className={styles.btnClose}
          onClick={onClose}
          title="Close this modal"
        >
          <img className={styles.iconClose} alt="X" src={IconClose} />
        </Button>

        {children}
      </div>

      <footer>
        <Button onClick={onCancel || onClose}>Cancel</Button>
        <Button onClick={onConfirm || onClose}>Ok</Button>
      </footer>
    </dialog>,
    document.body,
  );
};

export default Modal;
