import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import addToFavorites from "../../images/icons/add-to-favorite.png";
import isFvoutites from "/public/img/favourite-red.svg";
import { useTranslation } from "react-i18next";
import { Product } from "../../types/Product";
import { themeContext } from "../../store/ThemeContext";

export type ProducType = "phones" | "tablets" | "accessories";

interface ProductCardProps {
  product: Product;
  addProducts?: () => void;
  productQuontity?: number;
  toggleFavouriteProduct?: () => void;
  isFavourite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addProducts,
  productQuontity,
  toggleFavouriteProduct,
  isFavourite,
}) => {
  const navigate = useNavigate();
  const { theme } = useContext(themeContext);
  const { t } = useTranslation();
  if (!product) {
    return <div>No product available</div>;
  }
  const {
    images,
    name,
    priceDiscount,
    screen,
    capacity,
    ram,
    priceRegular,
    id,
    category,
    capacityAvailable,
    namespaceId,
    colorsAvailable,
    color,
    description,
    resolution,
    processor,
    cell,
    year,
  } = product;

  const navigateToProduct = () => {
    const productData = {
      id,
      category,
      namespaceId,
      name,
      capacityAvailable,
      capacity,
      priceRegular,
      priceDiscount,
      colorsAvailable,
      color,
      images,
      description,
      screen,
      resolution,
      processor,
      ram,
      cell,
      year,
    };

    if (category === "phones") {
      navigate(`/phones/${namespaceId}`, { state: { product: productData } });
    } else if (category === "tablets") {
      navigate(`/tablets/${namespaceId}`, { state: { product: productData } });
    } else if (category === "accessories") {
      navigate(`/accessories/${namespaceId}`, {
        state: { product: productData },
      });
    }
  };

  const buttonStyle =
    productQuontity && productQuontity > 0
      ? styles.productCardButtonsDisabled
      : styles.productCardButtonsAdd;
  styles.productCardTitle;
  return (
    <div
      className={`${styles.productCard} ${
        theme === "light" && styles.light_Product
      }`}
    >
      <div
        className={`${styles.wrapper} ${
          theme === "light" && styles.lightTitle
        }`}
      >
        <div onClick={navigateToProduct} className={styles.details}>
          <img
            src={`/${images[0]}`}
            alt={"images"}
            className={styles.productImage}
          />
          <p className={`${styles.productCardTitle} `}>{name}</p>
        </div>
        <div className={styles.priceWrapper}>
          <p className={styles.productCardPrice}>${priceDiscount}</p>
          {priceRegular && <p className={styles.oldPrice}>${priceRegular}</p>}
        </div>

        <p className={`${styles.productCardUnderscore} `}></p>

        <div className={styles.productCardSpecs}>
          <div className={styles.productCardSpec}>
            <span className={styles.productCardLabel}>
              {" "}
              {t("productCard.screen")}
            </span>
            <span
              className={`${styles.productCardValue} ${
                theme === "light" ? styles.lightValue : ""
              }`}
            >
              {screen}
            </span>
          </div>

          <div className={styles.productCardSpec}>
            <span className={styles.productCardLabel}>
              {t("productCard.capacity")}
            </span>
            <span
              className={`${styles.productCardValue} ${
                theme === "light" ? styles.lightValue : ""
              }`}
            >
              {capacity}
            </span>
          </div>

          <div className={styles.productCardSpec}>
            <span className={styles.productCardLabel}>
              {" "}
              {t("productCard.ram")}
            </span>
            <span
              className={`${styles.productCardValue} ${
                theme === "light" ? styles.lightValue : ""
              }`}
            >
              {ram}
            </span>
          </div>
        </div>

        <div className={styles.productCardButtons}>
          <button
            onClick={addProducts}
            className={`${buttonStyle} ${
              theme === "light" && styles.lightProduct
            }`}
            disabled={!!productQuontity && productQuontity > 0}
          >
            {productQuontity && productQuontity > 0
              ? t("productCard.button.added")
              : t("productCard.button.add")}
          </button>
          <button className={styles.toFavorite}>
            <img
              className={styles.productCardAddToFavorite}
              src={
                isFavourite
                  ? isFvoutites
                  : theme === "light"
                  ? "/img/favourit-lightTem.svg"
                  : addToFavorites
              }
              alt="add to favorites"
              onClick={toggleFavouriteProduct}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
