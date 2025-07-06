import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleSignOutClick, handleEditProfileClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar || avatar}
          alt="users avatar"
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={handleEditProfileClick}>
          Change profile data
        </button>
        <button className="sidebar__button" onClick={handleSignOutClick}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
