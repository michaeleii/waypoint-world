import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img src="/icon.png" alt="Waypoint World logo" />
      <span>Waypoint World</span>
    </Link>
  );
}

export default Logo;
