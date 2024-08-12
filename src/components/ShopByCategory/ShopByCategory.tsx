import { Link } from "react-router-dom";
import styles from "./ShopByCategory.module.scss";
import { useTranslation } from "react-i18next";
import MobPhones from "../../images/icons/Phones for  banner.png";
import Tablet from "../../images/icons/IpadPhotoBanner.png";
import Accessories from "../../images/icons/AccessoriesforIphoneBanner.png";

export const ShopByCategory = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}> {t("byCategory.title.text")}</h2>

      <div className={styles.category} data-cy="categoryLinksContainer">
        <div className={styles.category__wrapper}>
          <Link to="phones">
            <div
              className={`${styles.category__photo} ${styles["category__photo--phones"]}`}
            >
              <img
                src={MobPhones}
                alt="phones category"
                className={`${styles.category__image} ${styles["category__image--phones"]}`}
              />
            </div>
            <h3 className={styles.category__title}>
              {" "}
              {t("byCategory.mobile.text")}
            </h3>
            <p className={styles.category__text}>
              {" "}
              {t("byCategory.models.text")}
            </p>
          </Link>
        </div>

        <div className={styles.category__wrapper}>
          <Link to="tablets">
            <div
              className={`${styles.category__photo} ${styles["category__photo--tablets"]}`}
            >
              <img
                src={Tablet}
                alt="tablets category"
                className={`${styles.category__image} ${styles["category__image--tablets"]}`}
              />
            </div>
            <h3 className={styles.category__title}>
              {" "}
              {t("byCategory.tablets.text")}
            </h3>
            <p className={styles.category__text}>
              {" "}
              {t("byCategory.24models.text")}
            </p>
          </Link>
        </div>

        <div className={styles.category__wrapper}>
          <Link to="accessories">
            <div
              className={`${styles.category__photo} ${styles["category__photo--accessories"]}`}
            >
              <img
                src={Accessories}
                alt="accessories category"
                className={`${styles.category__image} ${styles["category__image--accessories"]}`}
              />
            </div>

            <h3 className={styles.category__title}>
              {t("byCategory.Accessories.text")}
            </h3>
            <p className={styles.category__text}>
              {t("byCategory.100models.text")}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
