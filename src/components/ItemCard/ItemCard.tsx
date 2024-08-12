import React, { useEffect, useState } from "react";
import styles from "./ItemCard.module.scss";

import { YouMayAlsoLike } from "../YouMayAlsoLike";
import { useCart } from "../../utils/useCart";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFavourits } from "../../utils/useFavourites";
import addToFavorites from "../../images/icons/add-to-favorite.png";
import isFvoutites from "/public/img/favourite-red.svg";
import { Product, ProductDescription } from "../../types/Product";
import { CurrentLocation } from "../CurrentLocation/CurrentLocation";

import { fetchaAccessories } from "../../services/accessoriesService";
import { fetchPhones } from "../../services/phoneService";
import { fetchTablets } from "../../services/tabletsService";

export const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { addProducts, getProductQuontity } = useCart();
  const { toggleFavouriteProduct, favouritesProducts } = useFavourits();
  const location = useLocation();
  const product = location.state?.product as Product;
  const navigate = useNavigate();

  const [allData, setAllData] = useState<Product[]>([]);

  const {
    images,
    name,
    priceDiscount,
    screen,
    capacity,
    category,
    ram,
    color,
    priceRegular,
    id,
    // category,
    capacityAvailable,
    // namespaceId,
    // colorsAvailable,
    // color,
    camera,
    zoom,
    description,
    resolution,
    processor,
    cell,
    namespaceId,
    colorsAvailable,
    // year,
  } = product;

  const productQuontity = getProductQuontity(id);
  const buttonStyle =
    productQuontity && productQuontity > 0
      ? styles.productCardButtonsDisabled
      : styles.productCardButtonsAdd;

  console.log(images[0]);
  console.log(images);

  const isFavourite = favouritesProducts.some(
    (favProduct: { id: unknown }) => favProduct.id === product.id
  );

  //Клікабельна картинка і стрілки перемикання
  const [activeImageSrc, setActiveImageSrc] = useState<string>(
    product?.images[0] || ""
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (product?.images.length > 0) {
      setActiveImageSrc(product.images[currentIndex]);
    }
  }, [currentIndex, product?.images]);

  useEffect(() => {
    let index = 0;
    if (product?.images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          index = (prevIndex + 1) % product.images.length;
          return index;
        });
      }, 3000); 

      return () => clearInterval(intervalId);
    }
  }, [product?.images]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category === "phones") {
          const phones = await fetchPhones();

          setAllData(phones);
        } else if (category === "tablets") {
          const tablets = await fetchTablets();

          setAllData(tablets);
        } else if (category === "accessories") {
          const accessories = await fetchaAccessories();

          setAllData(accessories);
        }
      } catch (error) {
        console.error("Failed to fetch tablets:", error);
      }
    };
    fetchData();
  }, []);
  const colorMap = {
    black: "#201D24",
    blue: "#043458",
    coral: "#FF7F50",
    gold: "#FCDBC1",
    graphite: "#5C5B57",
    green: "#5F7170",
    midnight: "#171E27",
    midnightgreen: "#004953",
    pink: "#FAE0D8",
    purple: "#E0B0FF",
    red: "#EB5757",
    rosegold: "#B76E79",
    "rose gold": "#B76E79",
    silver: "#F5F5F0",
    sierrablue: "#9BB5CE",
    "sky blue": "#87CEEB",
    spaceblack: "#505150",
    spacegray: "#535150",
    "space gray": "#535150",

    starlight: "#F9F3EE",
    white: "#F9F6EF",
    yellow: "#F3D060",
  };

  const handleCapacityClick = (selectedCapacity: string) => {
    if (!color) return;
    const capacityLowerCase = normalizeValue(selectedCapacity);
    const normalizedColor = normalizeValue(color);

    const newProductId = `${namespaceId}-${capacityLowerCase}-${normalizedColor}`;

    const newProduct = allData.find(({ id }) => id === newProductId);

    if (newProduct) {
      navigate(`/${category}/${newProduct.namespaceId}`, {
        state: { product: newProduct },
      });
    }
  };
  const normalizeValue = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, "-");
  };
  return (
    <div>
      <CurrentLocation />

      <h1 className={styles.productTitle}>{name}</h1>

      <div className={styles.productPage}>
        <div className={styles.top}>
          {/* стилі картинкам */}
          <div className={styles.productImageWrapper}>
            <img
              src={`/${activeImageSrc}`}
              alt="Apple iPhone 11 Pro Max"
              className={styles.productImage}
            />
          </div>

          <div className={styles.gallery}>
            {images.map((img, index) => (
              <img
                key={index}
                src={`/${img}`}
                alt={`Gallery ${index + 1}`}
                className={styles.galleryImage}
                onClick={() => setActiveImageSrc(img)}
              />
            ))}
          </div>
        </div>

        <div className={styles.mainControls}>
          <div className={styles.productElements}>
            <div className={styles.colorsGroup}>
              <div className={styles.colorsText}>
                <div className={styles.Aviable}>Available colors</div>
                <div className={styles.ProdId}>ID: 802390</div>
              </div>
              <ul className={styles.colors}>
                {colorsAvailable?.map((currentColor, index) => (
                  <li className={styles.color1} key={index}>
                    <button
                      onClick={() => {
                        if (color === currentColor) return;
                        const capacityLowerCase = capacity.toLowerCase();
                        const normalizeColor = (currentColor: string) => {
                          return currentColor
                            .toLowerCase()
                            .replace(/\s+/g, "-");
                        };
                        const normalizedCurrentColor =
                          normalizeColor(currentColor);
                        console.log(currentColor);

                        const newProductId = `${namespaceId}-${capacityLowerCase}-${normalizedCurrentColor}`;

                        const newProduct = allData.find(
                          ({ id }) => id === newProductId
                        );
                        console.log("newProductId:", newProductId);
                        navigate(`/${category}/${newProduct!.namespaceId}`, {
                          state: { product: newProduct },
                        });
                      }}
                    >
                      {colorsAvailable?.map((color, index) => {
                        const normalizedColor = color.trim().toLowerCase();

                        return (
                          <div key={index}>
                            {currentColor.trim().toLowerCase() ===
                              normalizedColor && (
                              <p
                                className={styles.color}
                                style={{
                                  backgroundColor:
                                    colorMap[
                                      normalizedColor as keyof typeof colorMap
                                    ] || color,
                                }}
                              ></p>
                            )}
                          </div>
                        );
                      })}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.capacity}>
              <div className={styles.selectCapacity}>Select capacity</div>
              <div className={styles.capacityWrapper}>
                <div className={styles.capacityText}>
                  {/* перебрати мапом , додати стилі при натисканні*/}
                  <div className={styles.capacityText}>
                    {capacityAvailable?.map((capacity, index) => (
                      <div className={styles.capacity1} key={index}>
                        <button onClick={() => handleCapacityClick(capacity)}>
                          {capacity}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.AddToAndPrice}>
                <div className={styles.price}>
                  <div className={styles.newPrice}>${priceDiscount}</div>
                  <div className={styles.oldPrice}>${priceRegular}</div>
                </div>

                <div className={styles.productCardButtons}>
                  <button
                    className={buttonStyle}
                    onClick={() => addProducts(product)}
                    disabled={!!productQuontity && productQuontity > 0}
                  >
                    {productQuontity && productQuontity > 0
                      ? t("productCard.button.added")
                      : t("productCard.button.add")}
                  </button>
                  <button className={styles.toFavorite}>
                    <img
                      className={styles.productCardAddToFavorite}
                      src={isFavourite ? isFvoutites : addToFavorites}
                      alt="add to favorites"
                      onClick={() => toggleFavouriteProduct(product)}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.shortInfo}>
              <ul className={styles.shortInfoText}>
                <li className={styles.shortInfoTextItem}>
                  <div className={styles.shortInfoTextItem1}>Screen</div>
                  <div className={styles.shortInfoTextItem2}>{screen}</div>
                </li>
                <li className={styles.shortInfoTextItem}>
                  <div className={styles.shortInfoTextItem1}>Resolution</div>
                  <div className={styles.shortInfoTextItem2}>{resolution}</div>
                </li>
                <li className={styles.shortInfoTextItem}>
                  <div className={styles.shortInfoTextItem1}>Processor</div>
                  <div className={styles.shortInfoTextItem2}>{processor}</div>
                </li>
                <li className={styles.shortInfoTextItem}>
                  <div className={styles.shortInfoTextItem1}>RAM</div>
                  <div className={styles.shortInfoTextItem2}>{ram}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.productDetails}>
          <div className={styles.section}>
            <div className={styles.sectionAbout}>About</div>
          </div>

          {description.map(
            (desc: ProductDescription, index: React.Key | null | undefined) => (
              <div key={index} className={styles.section}>
                <div className={styles.sectionTitle}>{desc.title}</div>
                <div className={styles.sectionText}>
                  {desc.text.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        <div className={styles.techInfo}>
          <div className={styles.techSpecs}>Tech specs</div>
          <div className={styles.line}></div>
          <div className={styles.inlineGroup}>
            <div className={styles.shortInfoTextItem3}>Screen</div>
            <div className={styles.shortInfoTextItem4}>{screen}</div>
          </div>
          <div className={styles.inlineGroup}>
            <div className={styles.shortInfoTextItem3}>Resolution</div>
            <div className={styles.shortInfoTextItem4}>{resolution}</div>
          </div>
          <div className={styles.inlineGroup}>
            <div className={styles.shortInfoTextItem3}>Processor</div>
            <div className={styles.shortInfoTextItem4}>{processor}</div>
          </div>
          <div className={styles.inlineGroup}>
            <div className={styles.shortInfoTextItem3}>RAM</div>
            <div className={styles.shortInfoTextItem4}>{ram}</div>
          </div>
          <div className={styles.inlineGroup}>
            <div className={styles.shortInfoTextItem3}>Built in memory</div>
            <div className={styles.shortInfoTextItem4}>{capacity}</div>
          </div>
          <div className={styles.inlineGroup}>
            <div className={styles.shortInfoTextItem3}>Camera</div>
            <div className={styles.shortInfoTextItem4}>{camera}</div>
          </div>
          <div className={styles.inlineGroup}>
            <div className={styles.shortInfoTextItem3}>Zoom</div>
            <div className={styles.shortInfoTextItem4}>{zoom}</div>
          </div>
          <div className={styles.inlineGroup}>
            <div className={styles.shortInfoTextItem3}>Cell</div>
            <div className={styles.shortInfoTextItem4}>{cell.join(", ")}</div>
          </div>
        </div>
      </div>
      <YouMayAlsoLike />
    </div>
  );
};
