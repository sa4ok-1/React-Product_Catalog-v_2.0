import { Cart } from "../components/cart/Cart";
import { CurrentLocation } from "../components/CurrentLocation/CurrentLocation";

export const CartPage = () => {
  return (
    <div>
      <CurrentLocation />
      <Cart />
    </div>
  );
};
