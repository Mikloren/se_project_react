import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const userItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];
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
        {userItems.map((filteredCard, index) => (
          <ItemCard
            key={filteredCard._id || `item-${index}`}
            item={filteredCard}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
