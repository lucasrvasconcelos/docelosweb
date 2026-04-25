import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { Group } from "./get-group-products";

export interface ProductsType {
  description: string;
  group: Group;
  id: string;
  imageUrl: string;
  name: string;
  originalPrice?: number;
  price: number;
  tags?: ProductTag[];
}

export type ProductTag =
  | "best_seller"
  | "recommended"
  | "new"
  | "exclusive"
  | "promotion";

interface GetProductsType {
  products: ProductsType[];
}

export async function fetchProducts() {
  const url = "/products";
  const { data } = await api.get<GetProductsType>(url);

  return data.products ?? [];
}

export function useFetchProducts() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: 1000 * 60 * 5, // evita refetch imediato
  });

  return { products };
}
