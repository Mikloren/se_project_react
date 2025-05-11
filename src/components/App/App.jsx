import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import ItemModal from "../ItemModal/ItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/waetherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItems, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWaetherData] = useState({
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
  const [cardToDelete, setCardToDelete] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItems({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((oldItem) => [newItem, ...oldItem]);

        onClose();
      })
      .catch((err) => console.error(err));
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onClose = () => {
    setActiveModal("");
  };

  const handleCardDelete = (cardId) => {
    setActiveModal("delete-confirm");
    setCardToDelete(cardId);
  };

  const handleConfirmDelete = () => {
    if (!cardToDelete) return;
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((oldItem) =>
          oldItem.filter((item) => item._id !== cardToDelete._id)
        );
        setSelectedCard(null);
        onClose();
      })
      .catch((err) => {
        console.error(
          `Failed to delete card with ID ${cardToDelete._id}:`,
          err
        );
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWaetherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  card={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={onClose}
          onAddItemModalSubmit={handleAddItemModalSubmit}
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
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
