import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { GetCategoriesType } from "./categories";

export async function fetchCategories() {
  const url = "/categories";
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
