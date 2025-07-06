import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleCardClick,
  card,
  handleAddClick,
  handleSignOut,
  handleEditProfile,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfile}
          handleSignOutClick={handleSignOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={card}
          onCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
        />
      </section>
    </div>
  );
}

export default Profile;
