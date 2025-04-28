import "./ItemModal.css";

function ItemModal({ activeModal, handleCloseClick, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
      <div className="modal__content modal__content_type_preview">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close modal__close_type_preview"
        ></button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__foter">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
