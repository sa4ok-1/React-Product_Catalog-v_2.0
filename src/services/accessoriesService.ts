import { fetchData } from "../apiService";
import { Product } from "../types/Product";

const ACCESSORIES_URL = "/api/accessories.json";

export const fetchaAccessories = async (): Promise<Product[]> => {
  return fetchData<Product[]>(ACCESSORIES_URL);
};
