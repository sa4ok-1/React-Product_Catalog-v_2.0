import styles from "./CartItem.module.scss";
import closeWhiteIcon from "../../../../public/img/closer-menu.svg";
import minusWhiteIcon from "../../../images/icons/MinusWhite.png";
import plusWhiteIcon from "../../../images/icons/PlusWhite.png";
import { Product } from "../../../types/Product";

type CartItemType = {
  product: Product;
  deleteProduct: () => void;
  quantity: number;
  incrementProduct: () => void;
  decrementProduct: () => void;
};
export const CartItem: React.FC<CartItemType> = ({
  product,
  quantity,
  deleteProduct,
  incrementProduct,
  decrementProduct,
}) => {
  const { images = [], name, priceDiscount } = product;
  return (
    <>
      <article className={styles.cartitem}>
        <div className={styles.topContent}>
          <button className={styles.button} onClick={deleteProduct}>
            <img src={closeWhiteIcon} alt="remove-item-icon" />
          </button>
          <img className={styles.imageItem} src={images[0]} alt={name} />
          <p className={styles.title}>{name}</p>
        </div>

        <div className={styles.buttonContent}>
          <div className={styles.buttonCounts}>
            <button className={styles.button} onClick={decrementProduct}>
              <img className={styles.icon} src={minusWhiteIcon} alt="" />
            </button>
            <p className={styles.count}>{quantity}</p>
            <button className={styles.button} onClick={incrementProduct}>
              <img
                className={`${styles.icon} ${styles.active}`}
                src={plusWhiteIcon}
                alt=""
              />
            </button>
          </div>
          <div className={styles.price}>{priceDiscount}</div>
        </div>
      </article>
    </>
  );
};
