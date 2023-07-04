import { flagEmojiToImg } from "../helpers/flagEmojiToImg";
import styles from "./CountryItem.module.css";

function CountryItem({
  country,
}: {
  country: { country: string; emoji: string };
}) {
  return (
    <li className={styles.countryItem}>
      {flagEmojiToImg(country.emoji)}
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
