import React, { useContext } from "react";
import styles from "./Pagination.module.scss";
import { themeContext } from "../../store/ThemeContext";

interface Props {
  productsPerPage: number;
  totalProducts: number;
  paginate: (number: number) => void;
  currentPage: number;
  prevPage: (number: number) => void;
  nextPage: (number: number) => void;
}

export const Pagination: React.FC<Props> = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
  prevPage,
  nextPage,
}) => {
  const pageNumber: number[] = [];

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const { theme } = useContext(themeContext);

  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  const getVisiblePages = () => {
    if (totalPages <= 4) {
      return pageNumber;
    }

    if (currentPage < 3) {
      return pageNumber.slice(0, 4);
    }

    if (currentPage > totalPages - 2) {
      return pageNumber.slice(totalPages - 4, totalPages);
    }

    return pageNumber.slice(currentPage - 2, currentPage + 2);
  };
  const visiblePages = getVisiblePages();

  return (
    <div>
      <ul className={styles.pagination}>
        <p
          className={`${styles.pageLink} ${styles.arrow} ${
            theme === "light" && styles.light
          }`}
          onClick={() => prevPage(currentPage)}
        >
          <img src="./img/arrow-left-pagination.svg" alt="arrow-left" />
        </p>
        {visiblePages.map((number) => (
          <li className="" key={number}>
            <p
              className={
                currentPage === number
                  ? `${styles.pageLink} ${
                      theme === "light" ? styles.lightActive : styles.active
                    } `
                  : `${styles.pageLink} ${theme === "light" && styles.light}`
              }
              onClick={() => paginate(number)}
            >
              {number}
            </p>
          </li>
        ))}
        <p
          className={`${styles.pageLink} ${styles.arrow} ${
            theme === "light" && styles.light
          }`}
          onClick={() => nextPage(currentPage)}
        >
          <img src="./img/arrow-right-pagination.svg" alt="arrow-right" />
        </p>
      </ul>
    </div>
  );
};
