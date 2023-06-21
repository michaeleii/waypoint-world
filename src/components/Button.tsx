import styles from "./Button.module.css";

function Button({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "primary" | "back" | "position";
}) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
export default Button;
