import { useContext } from "react";
import { CartContext } from "../store/CartContext";

export const useCart = () => useContext(CartContext);
