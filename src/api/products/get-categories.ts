import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface AddonsType {
  id: string;
  image_url?: string;
  max_quantity: number;
  name: string;
  position: number;
  price: number;
}

interface AddonsGroupType {
  addons: AddonsType[];
  description: string;
  id: string;
  maxSelect?: number;
  name: string;
  required: boolean;
}

export type ItemsTags =
  | "best_seller"
  | "recommended"
  | "new"
  | "exclusive"
  | "promotion";

interface ItemsType {
  addonsGroup: AddonsGroupType[];
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  originalPrice?: number;
  price: number;
  tags?: ItemsTags[];
}

interface CategoriesType {
  description: string;
  id: string;
  items: ItemsType[];
  name: string;
  position?: number;
}

interface GetCategoriesType {
  categories: CategoriesType[];
}

export async function fetchCategories() {
  const url = "/categories/";
  const { data } = await api.get<GetCategoriesType>(url);

  return data.categories ?? [];
}

export function useFetchCategories() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 1000 * 60 * 5, // evita refetch imediato
  });

  return { categories };
}
