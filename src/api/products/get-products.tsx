import { api } from "@/lib/axios";

interface Products {
  group: {
    id: string;
    name: string;
    slug: string;
  };
  id: string;
  imageUrl: string;
  isBestSeller: boolean;
  name: string;
  oldPrice: number;
  price: number;
}

interface GetProducts {
  products: Products[];
}

export async function getProducts() {
  const response = await api.get<GetProducts>("/products");

  return response.data.products;
}
