import React, { createContext, useState, useEffect } from "react";
import { Product } from "../types/Product";

type FavouritesContext = {
  favouritesProducts: Product[];
  toggleFavouriteProduct: (product: Product) => void;
};

type Props = {
  children: React.ReactNode;
};

export const FavouritesContext = createContext<FavouritesContext>({
  favouritesProducts: [],
  toggleFavouriteProduct: () => { },
});

export const FvouritesContextProvider: React.FC<Props> = ({ children }) => {
  const getFavouritesFromLocalStorage = () => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  };

  const [favouritesProducts, setFavouritesProducts] = useState<Product[]>(
    getFavouritesFromLocalStorage
  );

  const saveFavouritesToLocalStorage = (favourites: Product[]) => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  const toggleFavouriteProduct = (product: Product) => {
    setFavouritesProducts((prevProducts) => {
      const productExists = prevProducts.some((p) => p.id === product.id);

      const updatedProducts = productExists
        ? prevProducts.filter((p) => p.id !== product.id)
        : [...prevProducts, product];

      saveFavouritesToLocalStorage(updatedProducts);

      return updatedProducts;
    });
  };

  // Persist favourites to localStorage whenever it changes
  useEffect(() => {
    saveFavouritesToLocalStorage(favouritesProducts);
  }, [favouritesProducts]);

  return (
    <FavouritesContext.Provider
      value={{
        favouritesProducts,
        toggleFavouriteProduct,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
