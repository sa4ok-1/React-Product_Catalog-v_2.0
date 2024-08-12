import { useRef } from "react";

import sliderRight from "../../images/icons/buttonSlider-right.png";
import sliderLeft from "../../images/icons/buttonSlider-left.png";

import styles from "./HotPrices.module.scss";

import { ProductCard } from "../ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/scss/navigation";
import "swiper/scss";

import { Product } from "../../types/Product";
import data from "../../../public/api/phones.json";
import { useCart } from "../../utils/useCart";
import { useFavourits } from "../../utils/useFavourites";
import { useTranslation } from "react-i18next";

function preparedHotPricesPhones(data: Product[]) {
  const phones = data.filter(
    (item) =>
      item.category === "phones" && item.name.startsWith("Apple iPhone 11 Pro")
  );
  const sortedPhones = phones.sort((a, b) => b.priceRegular - a.priceRegular);

  return sortedPhones.slice(0, 20);
}

const preparedHotPhones = preparedHotPricesPhones(data);

export const HotPrices = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperCore | null>(null);

  const { addProducts, getProductQuontity } = useCart();

  const { toggleFavouriteProduct, favouritesProducts } = useFavourits();

  return (
    <>
      <section className={styles.hotPrices}>
        <div className={styles.hotPricesBrand}>
          <h2 className={styles.hotPricesBrandTitle}>{t("hotPrice.title")}</h2>

          <div className={styles.buttonsSlider}>
            <button
              className={styles.buttonsSliderLeft}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <img src={sliderLeft} alt="left" />
            </button>
            <button
              className={styles.buttonsSliderRight}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <img src={sliderRight} alt="right" />
            </button>
          </div>
        </div>

        <div className={styles.productsList}>
          <Swiper
            className={styles.swiper}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={"auto"}
            spaceBetween={16}
            modules={[Navigation]}
          >
            {preparedHotPhones.map((phone) => {
              return (
                <SwiperSlide className={styles.swiperSlide} key={phone.id}>
                  <ProductCard
                    key={phone.id}
                    product={phone}
                    addProducts={() => addProducts(phone)}
                    productQuontity={getProductQuontity(phone.id)}
                    toggleFavouriteProduct={() => toggleFavouriteProduct(phone)}
                    isFavourite={favouritesProducts.some(
                      (favProduct) => favProduct.id === phone.id
                    )}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
};
