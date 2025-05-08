import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__header-text">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__header-btn"
        >
          {" "}
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((card) => {
          return (
            <ItemCard card={card} key={card._id} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
