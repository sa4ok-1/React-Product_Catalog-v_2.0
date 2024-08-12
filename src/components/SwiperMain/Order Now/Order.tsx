import React from 'react';
import styles from './Order.module.scss';

export const Order: React.FC = () => {
  return (
    <div className={`${styles.swiper__banner} ${styles.banner}`}>
      <div className={styles.banner__wrapper}>
        <div className={styles.banner__content}>
          <h1 className={styles.banner__title}>
            Now available <br /> in our store!
          </h1>
          <p className={styles.banner__text}>Be the first!</p>
        </div>
        <a href="/phones" className={styles.banner__button}>
          Order now
        </a>
      </div>
    </div>
  );
};