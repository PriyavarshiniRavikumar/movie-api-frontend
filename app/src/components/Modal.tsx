import { Link } from "react-router-dom";
import { IShowError } from "../Interfaces/interfaces";

interface IModal {
  errorMsg: IShowError;
  closeModal: () => void;
  navigateToHome?: () => void;
}

const Modal: React.FC<IModal> = ({ errorMsg, closeModal, navigateToHome }) => {
  return (
    <dialog open>
      <article className="ModalDialog">
        <a
          href="#close"
          aria-label="Close"
          className="close"
          onClick={() => closeModal()}
        ></a>
        <h3>{errorMsg.action}</h3>
        <p>{errorMsg.msg}</p>
        <footer>
          <Link
            to="/"
            role="button"
            data-target="modal-example"
            onClick={navigateToHome}
          >
            Confirm
          </Link>
        </footer>
      </article>
    </dialog>
  );
};

export default Modal;
