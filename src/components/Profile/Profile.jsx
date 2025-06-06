import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ handleCardClick, card, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={card}
          onCardClick={handleCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
