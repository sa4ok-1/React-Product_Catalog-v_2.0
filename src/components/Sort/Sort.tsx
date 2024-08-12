import { FC, useState, useContext } from "react";
import styles from "./Sort.module.scss";
import { Product } from "../../types/Product";
import { useTranslation } from "react-i18next";
import { themeContext } from "../../store/ThemeContext";

export enum Sorting {
  BY_YEAR = "newest",
  BY_NAME = "alphabetically",
  BY_PRICE = "cheapest",
}

interface Props {
  products: Product[];
  productsPerPage: number;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setProductsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Sort: FC<Props> = ({
  setProducts,
  products,
  setProductsPerPage,
  productsPerPage,
  setCurrentPage,
}) => {
  const [isSortActive, setIsSortActive] = useState(false);
  const [isSortNumberActive, setIsSortNumberActive] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(Sorting.BY_NAME);
  const { theme } = useContext(themeContext);
  const { t } = useTranslation();

  const getSortOptionLabel = (sortOption: Sorting): string => {
    switch (sortOption) {
      case Sorting.BY_YEAR:
        return t("sortBy.newest");
      case Sorting.BY_NAME:
        return t("sortBy.alphabetically");
      case Sorting.BY_PRICE:
        return t("sortBy.cheapest");
      default:
        return "";
    }
  };
  const sortProducts = (criteria: Sorting) => {
    const sortedProducts = [...products];
    switch (criteria) {
      case Sorting.BY_YEAR:
        sortedProducts.sort((a, b) => b.year - a.year);
        break;
      case Sorting.BY_NAME:
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case Sorting.BY_PRICE:
        sortedProducts.sort((a, b) => a.priceRegular - b.priceRegular);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };
  const onSortTrigger = () => {
    setIsSortActive((prev) => !prev);
  };

  const handleSortOptionClick = (criteria: Sorting) => {
    setSortCriteria(criteria);
    sortProducts(criteria);
    onSortTrigger();
  };

  const handleSortByNumberClick = (number: number) => {
    setProductsPerPage(number);
    setCurrentPage(1);
    setIsSortNumberActive((current) => !current);
  };

  console.log(products);

  return (
    <div className={styles.sort__container}>
      <div className={styles.dropdown}>
        <p className={styles.dropdown__label}>{t("sortBy.title")}</p>

        <div
          className={`${styles.dropdown__box} ${
            theme === "light" && styles.lightBox
          }`}
          onClick={() => {
            onSortTrigger();
            if (isSortNumberActive) {
              setIsSortNumberActive((current) => !current);
            }
          }}
        >
          <span
            className={`${styles.dropdown__box__text} ${styles.Alphabetically}`}
          >
            {getSortOptionLabel(sortCriteria)}
          </span>
          <button className={styles.dropdown__box__trigger}>
            {isSortActive ? (
              <img src="/img/arrow-upp.svg" alt="" />
            ) : (
              <img src="/img/arrow-down.svg" alt="" />
            )}
          </button>
        </div>

        <ul
          className={`${styles.dropdown__options} ${
            isSortActive && styles.active
          } ${theme === "light" && styles.lightBox}`}
        >
          <li
            className={styles.dropdown__options__option}
            data-value={Sorting.BY_YEAR}
            onClick={() => {
              handleSortOptionClick(Sorting.BY_YEAR);
            }}
          >
            {t("sortBy.newest")}
          </li>
          <li
            className={styles.dropdown__options__option}
            data-value={Sorting.BY_NAME}
            onClick={() => handleSortOptionClick(Sorting.BY_NAME)}
          >
            {t("sortBy.alphabetically")}
          </li>
          <li
            className={styles.dropdown__options__option}
            data-value={Sorting.BY_PRICE}
            onClick={() => handleSortOptionClick(Sorting.BY_PRICE)}
          >
            {t("sortBy.cheapest")}
          </li>
        </ul>
      </div>

      <div className={styles.dropdown}>
        <p className={styles.dropdown__label}>{t("sortBy.items")}</p>

        <div
          className={`${styles.dropdown__box} ${styles.sort__number} ${
            theme === "light" && styles.lightBox
          }`}
          onClick={() => {
            setIsSortNumberActive((current) => !current);
            if (isSortActive) {
              onSortTrigger();
            }
          }}
        >
          <span className={styles.dropdown__box__text}>
            {productsPerPage > 16 ? t("sortBy.all") : productsPerPage}
          </span>
          <button className={styles.dropdown__box__trigger}>
            {isSortNumberActive ? (
              <img src="/img/arrow-upp.svg" alt="" />
            ) : (
              <img src="/img/arrow-down.svg" alt="" />
            )}
          </button>
        </div>

        <ul
          className={`${styles.dropdown__options} ${styles.sort__number} ${
            isSortNumberActive && styles.active
          } ${theme === "light" && styles.lightBox}`}
        >
          <li
            className={styles.dropdown__options__option}
            data-value={Sorting.BY_YEAR}
            onClick={() => handleSortByNumberClick(4)}
          >
            4
          </li>
          <li
            className={styles.dropdown__options__option}
            data-value={Sorting.BY_NAME}
            onClick={() => handleSortByNumberClick(8)}
          >
            8
          </li>
          <li
            className={styles.dropdown__options__option}
            data-value={Sorting.BY_PRICE}
            onClick={() => handleSortByNumberClick(16)}
          >
            16
          </li>
          <li
            className={styles.dropdown__options__option}
            data-value={Sorting.BY_PRICE}
            onClick={() => handleSortByNumberClick(products.length)}
          >
            {t("sortBy.all")}
          </li>
        </ul>
      </div>
    </div>
  );
};
