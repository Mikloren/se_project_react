import "./ItemModal.css";
import closeIcon from "../../assets/close.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  if (!card) return null;

  const isOwn = currentUser ? card.owner === currentUser._id : false;
  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "modal__delete-btn" : "modal__delete-btn_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className=" modal__content_type_preview modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_preview"
        >
          <img src={closeIcon} alt="Close modal" />
        </button>
        <img
          src={card?.imageUrl}
          alt="clothing item"
          className="modal__image"
        />
        <div className="modal__foter">
          <h2 className="modal__caption">{card?.name}</h2>
          <p className="modal__weather">Weather: {card?.weather}</p>
        </div>
        {isOwn && (
          <button
            className={itemDeleteButtonClassName}
            type="button"
            onClick={() => onClick(card)}
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
