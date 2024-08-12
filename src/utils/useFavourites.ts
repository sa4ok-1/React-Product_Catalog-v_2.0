import { useContext } from "react";
import { FavouritesContext } from "../store/FavouritesContext";

export const useFavourits = () => useContext(FavouritesContext);
