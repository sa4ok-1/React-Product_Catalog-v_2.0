import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useState, useContext } from "react";
import { themeContext } from "../../store/ThemeContext";
import { useCart } from "../../utils/useCart";
import { useFavourits } from "../../utils/useFavourites";
import { useTranslation } from "react-i18next";
import { ThemeButton } from "../ThemeButton/ThemeButton";
import { imageConfig } from "../../utils/imageConfig";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const { favouritesProducts } = useFavourits();
  const { t, i18n } = useTranslation();
  const { theme } = useContext(themeContext);
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "uk" : "en";
    i18n.changeLanguage(newLanguage);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenuWhenActive = () => {
    if (isMenuOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
  };


  return (
    <header
      className={`${isMenuOpen ? styles.dropdown__menu : ""} ${
        theme === "light" && styles.light
      }`}
    >
      <div className={styles.header__top}>
        <NavLink to="/" className="">
          {theme === "light" ? (
            <img src="/img/Logo-light.svg" alt="logo" className="" />
          ) : (
            <img src="/img/Logo.svg" alt="logo" className="" />
          )}
        </NavLink>

        <nav className={""}>
          <ul className={`${styles.navbar} ${i18n.language === 'uk' && styles.gapForUkr}`}>
            <li>
              <NavLink
                to="/"
                className={`${styles.nav__link} ${
                  theme === "light" && styles.light
                } ${i18n.language === 'uk' && styles.forUkrLink}` }
                onClick={() => toggleMenuWhenActive()}
              >
                {i18n.t("nav.home.text")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`${styles.nav__link} ${
                  theme === "light" && styles.light
                } ${i18n.language === 'uk' && styles.forUkrLink}`}
                to="phones"
                onClick={() => toggleMenuWhenActive()}
              >
                {i18n.t("nav.phones.text")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`${styles.nav__link} ${
                  theme === "light" && styles.light
                } ${i18n.language === 'uk' && styles.forUkrLink}`}
                to="tablets"
                onClick={() => toggleMenuWhenActive()}
              >
                {i18n.t("nav.tablets.text")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`${styles.nav__link} ${
                  theme === "light" && styles.light
                } ${i18n.language === 'uk' && styles.forUkrLink}`}
                to="accessories"
                onClick={() => toggleMenuWhenActive()}
              >
                {t("nav.accessories.text")}
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to='developers'>
          <img
            src="/img/developers.png"
            alt="logo"
            className={styles.developers}
          />
        </NavLink>

        <div className={styles.icons}>
          <div
            className={`${styles.icon} ${theme === "light" && styles.light}`}
          >
            <ThemeButton />
          </div>
          <button
            onClick={toggleLanguage}
            className={`${styles.icon} ${styles.language} ${
              theme === "light" && styles.light
            }`}
          >
            {currentLanguage === "en"
              ? i18n.t("header.lang.text")
              : i18n.t("header.lang.text")}
          </button>
          <NavLink
            to="favourites"
            className={`${styles.icon} icon--favourit ${
              theme === "light" && styles.light
            }`}
            onClick={() => toggleMenuWhenActive()}
          >
            <img src={imageConfig.favourit[theme]} alt="logo" className="" />

            <span className={`${styles.iconCount} ${styles.favourit}`}>
              {favouritesProducts.length}
            </span>
          </NavLink>
          <NavLink
            to="cart"
            className={`${styles.icon} icon--shoping ${
              theme === "light" && styles.light
            }`}
            onClick={() => toggleMenuWhenActive()}
          >
            <img src={imageConfig.shoping[theme]} alt="logo" className="" />

            <span className={styles.iconCount}>{totalQuantity}</span>
          </NavLink>
        </div>

        <div className={styles.burger__menu}>
          {isMenuOpen ? (
            <div
              className={`${styles.burger__menu__close}`}
              onClick={() => toggleMenu()}
            >
              <img
                src={imageConfig["close-menu"][theme]}
                alt="logo"
                className=""
              />
            </div>
          ) : (
            <div
              className={`${styles.burger__menu__open}`}
              onClick={() => toggleMenu()}
            >
              <img
                src={imageConfig["open-menu"][theme]}
                alt="logo"
                className=""
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
