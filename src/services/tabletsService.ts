import { fetchData } from "../apiService";
import { Product } from "../types/Product";

const TABLETS_URL = "/api/tablets.json";

export const fetchTablets = async (): Promise<Product[]> => {
  return fetchData<Product[]>(TABLETS_URL);
};
