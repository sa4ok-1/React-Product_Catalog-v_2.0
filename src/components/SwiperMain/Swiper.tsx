import React, { useContext} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Swiper.module.scss";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Order } from "./Order Now/Order";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import swiperPrevButton from "../../images/icons/Chevron(Arrow Left).png";
import swiperNextButton from "../../images/icons/Chevron(Arrow Right).png";

import { themeContext } from "../../store/ThemeContext";

export const Slider: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useContext(themeContext);

  return (
    <div>
      <section className={`${styles.page__main} ${styles.main}`}>
        <h1 className={`${styles.main__title} ${theme === 'light' && styles.light}`}>{t("slider.text")}</h1>
      </section>

      <div className={`main__swiper ${styles.swiper}`}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: `.${styles.swiper__next}`,
            prevEl: `.${styles.swiper__prev}`,
          }}
          pagination={{
            el: `.${styles.swiper__pagination}`,
            clickable: true,
            bulletClass: `${styles["swiper-pagination-bullet"]}`,
            bulletActiveClass: `${styles["swiper-pagination-bullet-active"]} ${theme === 'light' && styles.lightActive}`,
          }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide className={styles.swiper__slide}>
            <Order />
            <a
              className={`${styles.swiper__image} ${
                styles[`swiper__image--1`]
              }`}
            ></a>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper__slide}>
            <div
              className={`${styles.swiper__wrapper} ${styles["swiper__wrapper--1"]} `}
            >
              <a
                className={`${styles.swiper__image} ${
                  styles[`swiper__image--2`]
                }`}
              ></a>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper__slide}>
            <div
              className={`${styles.swiper__wrapper} ${styles["swiper__wrapper--2"]} `}
            >
              <a
                className={`${styles.swiper__image} ${
                  styles[`swiper__image--3`]
                }`}
              ></a>
            </div>
          </SwiperSlide>
        </Swiper>
        <div
          className={classNames(styles.swiper__prev, "swiper__Button__Prev", )}
        >
          <img
            src= {swiperPrevButton}
            alt="Prev"
            className={styles.overlayImage}
          />
        </div>
        <div
          className={classNames(styles.swiper__next, "swiper__Button__Next")}
        >
          <img
            src={swiperNextButton}
            alt="Next"
            className={styles.overlayImage}
          />
        </div>
        <div
          className={classNames(styles.swiper__pagination, "swiper-pagination")}
        ></div>
      </div>
    </div>
  );
};
