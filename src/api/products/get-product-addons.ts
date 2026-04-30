import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface AddonOptionType {
  id: string;
  name: string;
  price: number;
}

interface AddonGroup {
  id: string;
  maxSelect: number;
  name: string;
  options: AddonOptionType[];
  required: boolean;
}

interface Product {
  addonGroups: AddonGroup[];
  id: string;
  name: string;
  price: number;
}

interface ProductAddonsType {
  productaddons: Product[];
}

interface ProductAddonsProps {
  producId: string;
}

export async function fetchProductAddons({ producId }: ProductAddonsProps) {
  const url = `/productaddons/${producId}`;
  const { data } = await api.get<ProductAddonsType>(url);

  return data.productaddons ?? [];
}

export function useFetchProducts({ producId }: ProductAddonsProps) {
  const { data: productAddons } = useQuery({
    queryKey: ["productaddons"],
    queryFn: () => fetchProductAddons({ producId }),
    staleTime: 1000 * 60 * 5, // evita refetch imediato
  });

  return { productAddons };
}
