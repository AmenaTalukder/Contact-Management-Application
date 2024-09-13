import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="min-h-[200px] max-w-[30%] bg-white p-4 z-50 relative rounded-md shadow-lg m-auto">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl cursor-pointer"
              />
            </div>

            <div className="modal-content">{children}</div>
          </div>

          <div
            className="fixed top-0 inset-0 backdrop-blur bg-black bg-opacity-50 z-30"
            onClick={onClose}
          />
        </>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
