import React from "react";
import styles from "./ProductList.module.scss";
import { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard";
import { useCart } from "../../utils/useCart";
import { useFavourits } from "../../utils/useFavourites";

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const { addProducts, getProductQuontity } = useCart();

  const { toggleFavouriteProduct, favouritesProducts } = useFavourits();

  return (
    <section className={styles.productList}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addProducts={() => addProducts(product)}
          productQuontity={getProductQuontity(product.id)}
          toggleFavouriteProduct={() => toggleFavouriteProduct(product)}
          isFavourite={favouritesProducts.some(
            (favProduct) => favProduct.id === product.id
          )}
        />
      ))}
    </section>
  );
};
