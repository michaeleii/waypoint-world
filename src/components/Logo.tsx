import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo}>
      <img src="/icon.png" alt="Waypoint World logo" />
      <span>Waypoint World</span>
    </div>
  );
}

export default Logo;
