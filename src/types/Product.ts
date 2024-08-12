export type Product = {
  id: string;
  category: string;
  namespaceId?: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable?: string[];
  color: string;
  images: string[];
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  year: number
  camera: string;
  zoom: string;
};

export type ProductDescription = {
  title: string;
  text: string[];
};
