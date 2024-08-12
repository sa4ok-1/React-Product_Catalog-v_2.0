import { useContext } from "react";
import { themeContext } from "../../store/ThemeContext";
import styles from "./Theme.module.scss";
// import lightIcon from "../../images/icons/themeWhite.png";
import lightIcon from "/img/light-img.png";
import darkIcon from "/img/moon.png";

export const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  const iconByTheme = theme === "dark" ? lightIcon : darkIcon;
  
  return (
    <button onClick={toggleTheme} className={styles.button}>
      <img src={iconByTheme} alt="themeButton" className={styles.themeButton} />
    </button>
  );
};
