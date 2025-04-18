import "./WeatherCard.css";
import weather from "../../assets/weather-img.svg";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__info">75 &deg; F</p>
      <img src={weather} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
