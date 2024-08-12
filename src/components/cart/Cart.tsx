import styles from "./Cart.module.scss";
import cartEmpty from "../../../public/img/cart-is-empty.png";
import { useCart } from "../../utils/useCart";

import { CartItem } from "./CartItem/CartItem";
import { createForm, publicKey, Params } from "./liqpayUtils";
import { useTranslation } from "react-i18next";
import { getItemForm } from "../../utils/getItemForm";

export const Cart = () => {
  const {
    products,
    totalPrice,
    deleteProduct,
    addProducts,
    decrementProduct,
    totalQuantity,
  } = useCart();
  const { t } = useTranslation();
  const itemForm = getItemForm(totalQuantity, t);
  const cartOrder = products.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
  }));

  const formatOrderDescription = (
    cartOrder: { name: string; quantity: number }[]
  ) => {
    return cartOrder.map(
      (item) => `Name: ${item.name} Quantity: ${item.quantity}`
    );
  };

  const handleConfirm = () => {
    const description = formatOrderDescription(cartOrder);

    const data: Params = {
      action: "pay",
      amount: totalPrice,
      currency: "UAH",
      description: `${description}`,
      order_id: new Date().getTime().toString(),
      version: 3,
      server_url: "https://react-product-catalog-74o7.vercel.app",
      public_key: publicKey,
      language: "uk",
      result_url: "https://react-product-catalog-74o7.vercel.app/#/thank-you",
    };

    const formHtml = createForm(data);

    const existingForm = document.getElementById("liqpay-form");
    if (existingForm) {
      existingForm.remove();
    }

    document.body.insertAdjacentHTML("beforeend", formHtml);

    const form = document.getElementById("liqpay-form");
    if (form !== null) {
      (form as HTMLFormElement).submit();
    }
  };

  console.log(products);

  return products.length > 0 ? (
    <div className={styles.cart}>
      <h1>{t("cart.cart")}</h1>
      <div className={styles.cartList}>
        {products.map((product) => (
          <CartItem
            key={product.product.id}
            product={product.product}
            quantity={product.quantity}
            deleteProduct={() => deleteProduct(product.product.id)}
            incrementProduct={() => addProducts(product.product)}
            decrementProduct={() => {
              decrementProduct(product.product.id);
            }}
          />
        ))}
      </div>
      <div className={styles.checkout}>
        <div className={styles.totalPrice}>
          <p className={styles.price}>{totalPrice}</p>
          <span>
            {" "}
            {t("cart.totalItems", { count: totalQuantity, item: itemForm })}
          </span>
        </div>
        <button className={styles.button} onClick={handleConfirm}>
          {t("cart.checkout")}
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.cartEmpty}>
      <h2>{t("cart.text")}</h2>
      <img
        className={styles.cartEmptyImg}
        src={cartEmpty}
        alt="cart is empty"
      />
    </div>
  );
};
