import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export interface Group {
  default: boolean;
  description?: string;
  id: string;
  name: string;
  slug: string;
}

interface GroupProductsType {
  groups: Group[];
}

export async function fetchGroupProducts() {
  const url = "/groups";
  const { data } = await api.get<GroupProductsType>(url);

  return data.groups ?? [];
}

export function useGroupProducts() {
  const { data: groups } = useQuery<Group[]>({
    queryKey: ["product-groups"],
    queryFn: () => fetchGroupProducts(),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
  return { groups };
}
