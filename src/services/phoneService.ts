import { fetchData } from "../apiService";
import { Product } from "../types/Product";

const PHONES_URL = "/api/phones.json";

export const fetchPhones = async (): Promise<Product[]> => {
  return fetchData<Product[]>(PHONES_URL);
};