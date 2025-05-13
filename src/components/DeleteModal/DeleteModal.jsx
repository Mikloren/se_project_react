import "./DeleteModal.css";
import closeIcon from "../../assets/close.svg";

function DeleteModal({ isOpen, onClose, onCardDelete, itemName }) {
  return (
    <div
      className={`modal modal_type_delete-confirm ${isOpen && "modal_opened"}`}
    >
      <div className="modal__delete-overlay" onClick={onClose}>
        <div className="modal__delete-container">
          <div className="modal__delete-content">
            <button
              className="modal__delete-close"
              type="button"
              onClick={onClose}
            >
              <img src={closeIcon} alt="Close modal" />
            </button>
            <div className="modal__warning-container">
              <p className="modal__delete-warning">
                Are you sure you want to delete this item?
              </p>
              <p className="modal__delete-warning">
                This action is irreversible. <strong>{itemName}</strong>
              </p>
            </div>
            <div className="modal__delete-options">
              <button
                className="modal__btn modal__btn_type_delete-cancel"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="modal__btn modal__btn_type_delete-confirm"
                type="button"
                onClick={onCardDelete}
              >
                Yes, delete item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
