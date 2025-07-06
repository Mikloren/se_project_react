import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import ItemModal from "../ItemModal/ItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import Profile from "../Profile/Profile";
import { getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItem,
  addItem,
  deleteItem,
  login,
  register,
  checkToken,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("jwt");
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const likeRequest = !isLiked ? addCardLike : removeCardLike;

    likeRequest(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handleSubmit(request) {
    console.log("Submitting...");
    setIsLoading(true);
    return request()
      .then(onClose)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleAddItemModalSubmit = (item) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return addItem({ ...item, token }).then((item) => {
        setClothingItems([item, ...clothingItems]);
      });
    };
    return handleSubmit(makeRequest, onClose);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const onClose = () => {
    setActiveModal("");
  };

  const handleCardDelete = () => {
    setActiveModal("delete-confirm");
  };

  function handleConfirmDelete() {
    const token = localStorage.getItem("jwt");
    const makeRequest = () =>
      deleteItem(selectedCard._id, token).then(() => {
        setClothingItems((cards) =>
          cards.filter((card) => card._id !== selectedCard._id)
        );
      });

    handleSubmit(makeRequest, onClose);
  }

  const getUserData = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
        });
    }
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    register({ email, password, name, avatar })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          onClose();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegistrationModal = () => {
    setActiveModal("register");
  };

  const handleUpdateProfile = (updatedData) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    updateProfile({
      ...updatedData,
      token,
    })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onClose();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItem()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const ProtectedRoute = ({ children, currentUser }) => {
    return currentUser ? children : <Navigate to="/" replace />;
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={currentUser !== null}
              handleRegisterClick={openRegistrationModal}
              handleLoginClick={openLoginModal}
              handleSignOut={handleSignOut}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute currentUser={currentUser}>
                    <Profile
                      card={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleSignOut={handleSignOut}
                      handleEditProfile={handleEditProfile}
                      onCardLike={handleCardLike}
                      isLoggedIn={currentUser !== null}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={onClose}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={onClose}
            onClick={handleCardDelete}
          />
          <DeleteModal
            onClose={onClose}
            onCardDelete={handleConfirmDelete}
            isOpen={activeModal === "delete-confirm"}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onSubmit={handleRegister}
            onClickLogin={openLoginModal}
            onClose={onClose}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onSubmit={handleLogin}
            onClickRegister={openRegistrationModal}
            onClose={onClose}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={onClose}
            onEditProfileSubmit={handleUpdateProfile}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
