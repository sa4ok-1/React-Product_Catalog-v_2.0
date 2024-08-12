import React from "react";
import notFoundImage from "../images/icons/404_error_checking_FI.webp";
import style from '../styles/NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={style.container}>
      <img className={style.image} src={notFoundImage} alt="Not Found" />
    </div>
  );
};