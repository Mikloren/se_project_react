import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWaetherData] = useState({ type: "cold" });

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm buttonText="Add garment" title="New garment">
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-btn">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label_type_radio">
            <input type="radio" className="modal__radio-input" id="hot" /> Hot
          </label>

          <label htmlFor="warm" className="modal__label_type_radio">
            <input type="radio" className="modal__radio-input" id="warm" /> Warm
          </label>

          <label htmlFor="cold" className="modal__label_type_radio">
            <input type="radio" className="modal__radio-input" id="cold" /> Cold
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
