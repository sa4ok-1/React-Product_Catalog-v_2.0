import { ProductList } from "../ProductList/ProductList";
import styles from "./Favourites.module.scss";
import cartEmpty from "../../../public/img/cart-is-empty.png";
import { useFavourits } from "../../utils/useFavourites";
import { useTranslation } from "react-i18next";

export const Favourites = () => {
  const { favouritesProducts } = useFavourits();
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      {favouritesProducts.length ? (
        <>
          <div className={styles.favourite__block}>
            <div className={styles.favourite__links}>
              <a href="/" className={styles.favourite__link}>
                <img src="/img/House.svg" alt="House" />
              </a>
              <a href="/" className={styles.favourite__link}>
                <img src="/img/arrow.svg" alt="arrow" />
              </a>
              <a
                href="/"
                className={`${styles.favourite__link} ${styles.favourite__link_text}`}
              >
                {t("favourites.title")}
              </a>
            </div>
            <h2 className={styles.favourite_title}> {t("favourites.title")}</h2>
            <div className={styles.favourite_score_items}>
              {favouritesProducts.length}{" "}
              {t("favourites.items", { count: favouritesProducts.length })}
            </div>
          </div>
          <div className={styles.productsList}>
            <ProductList products={favouritesProducts} />
          </div>
        </>
      ) : (
        <div className={styles.cartEmpty}>
          <h2>{t("favourites.empty")}</h2>
          <img
            className={styles.cartEmptyImg}
            src={cartEmpty}
            alt="favourites are empty"
          />
        </div>
      )}
    </div>
  );
};
