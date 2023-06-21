import CityData from "../interfaces/City";
import styles from "./CityItem.module.css";
import { formatDate } from "../helpers/formatDate";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

function CityItem({ city }: { city: CityData }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, emoji, id, position } = city;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <form>
          <button className={styles.deleteBtn} onClick={handleClick}>
            &times;
          </button>
        </form>
      </Link>
    </li>
  );
}
export default CityItem;
