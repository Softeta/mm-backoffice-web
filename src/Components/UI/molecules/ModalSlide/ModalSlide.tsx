import Modal from "Components/UI/atoms/Modal";
import { ReactNode } from "react";

interface IModalSlide {
  open: boolean;
  children: ReactNode;
}

export const ModalSlide = ({ open, children }: IModalSlide) => (
  <Modal disableEscapeKeyDown enableSlideAnimation open={open}>
    {() => <div className="w-full h-100v lg:w-[85vw]">{children}</div>}
  </Modal>
);

export default ModalSlide;
