import React, { createContext, useState } from "react";
import { Product } from "../types/Product";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContext = {
  products: CartItem[];
  addProducts: (product: Product) => void;
  getProductQuontity: (productId: string) => number;
  totalPrice: number;
  deleteProduct: (productId: string) => void;
  decrementProduct: (productId: string) => void;
  totalQuantity: number;
  clearCart: () => void;
};
type Props = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContext>({
  products: [],
  addProducts: () => {},
  getProductQuontity: () => 0,
  totalPrice: 0,
  deleteProduct: () => {},
  decrementProduct: () => {},
  totalQuantity: 0,
  clearCart: () => {},
});

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const getCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [products, setProducts] = useState<CartItem[]>(getCartFromLocalStorage);

  const totalPrice = products.reduce((acc, product) => {
    return acc + product.product.priceDiscount * product.quantity;
  }, 0);

  const totalQuantity = products.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0
  );

  const saveCartToLocalStorage = (cart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addProducts = (product: Product) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (p) => p.product.id === product.id
      );
      let updatedProducts;

      if (existingProduct) {
        updatedProducts = prevProducts.map((p) =>
          p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        updatedProducts = [...prevProducts, { product, quantity: 1 }];
      }

      saveCartToLocalStorage(updatedProducts);

      return updatedProducts;
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.product.id !== productId
      );
      saveCartToLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  const decrementProduct = (productId: string) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (p) => p.product.id === productId
      );
      const updatedProducts = existingProduct
        ? existingProduct.quantity > 1
          ? prevProducts.map((p) =>
              p.product.id === productId
                ? { ...p, quantity: p.quantity - 1 }
                : p
            )
          : prevProducts.filter((p) => p.product.id !== productId)
        : prevProducts;

      saveCartToLocalStorage(updatedProducts);

      return updatedProducts;
    });
  };

  const getProductQuontity = (prductId: string) => {
    const item = products.find((p) => p.product.id === prductId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    saveCartToLocalStorage([]);
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProducts,
        getProductQuontity,
        totalPrice,
        deleteProduct,
        decrementProduct,
        totalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
