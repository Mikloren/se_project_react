import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";

import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="logo" className="header__image" />
      </Link>

      <p className="date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <nav className="navigation">
        <ul className="navigation__container">
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <li>
                <button
                  className="header__add-clothes-btn"
                  onClick={handleAddClick}
                >
                  + Add clothes
                </button>
              </li>
              <li>
                <Link to="/profile" className="header__link">
                  <span className="header__username"> {currentUser.name}</span>

                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      className="navigation__user"
                      alt="avatar"
                    />
                  ) : (
                    <span className="navigation__user navigation__user_type_none">
                      {" "}
                      {currentUser?.name?.toUpperCase().chartAt(0) || ""}
                    </span>
                  )}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className="navigation__button nav__btn_type_login"
                  onClick={handleLoginClick}
                >
                  Log in
                </button>
              </li>
              <li>
                <button
                  className="navigation__button"
                  onClick={handleRegisterClick}
                >
                  Sign up
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
