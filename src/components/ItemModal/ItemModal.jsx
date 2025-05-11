import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className=" modal__content_type_preview modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_preview"
        ></button>
        <img
          src={card?.imageUrl}
          alt="clothing item"
          className="modal__image"
        />
        <div className="modal__foter">
          <h2 className="modal__caption">{card?.name}</h2>
          <p className="modal__weather">Weather: {card?.weather}</p>
        </div>
        <button
          className="modal__delete-btn"
          type="button"
          onClick={() => onClick(card)}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
