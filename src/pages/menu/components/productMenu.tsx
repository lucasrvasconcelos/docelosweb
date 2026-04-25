import { Boxes } from "lucide-react";
import { useEffect } from "react";
import type { Group } from "@/api/products/get-group-products";
import type { ProductsType } from "@/api/products/get-products";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypographyH4 } from "@/components/ui/typographyH4";
import { useGroupScroll } from "@/hooks/useSectionScroll";
import { ProductSections } from "./productSections";

interface ProductMenuProps {
  groups?: Group[];
  products?: ProductsType[];
}
export function ProductMenu({ groups, products }: ProductMenuProps) {
  const {
    activeGroupId,
    setActiveGroupId,
    registerGroupSection,
    scrollToGroup,
    observeSections,
  } = useGroupScroll({ offset: 80 });

  useEffect(() => {
    if (groups?.length && !activeGroupId) {
      setActiveGroupId(groups[0].id);
    }
  }, [groups, activeGroupId]);

  useEffect(() => {
    const cleanup = observeSections();
    return cleanup;
  }, [groups, observeSections]);

  return (
    <div className="border-b">
      <Select onValueChange={scrollToGroup} value={activeGroupId}>
        <div className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-card px-4 py-2">
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Boxes />
            <TypographyH4 className="text-sm">Categorias</TypographyH4>
          </div>
          <SelectTrigger className="inline-flex h-10 max-w-full items-center justify-center space-x-2 truncate rounded-md border border-divider border-b bg-white pr-1.5 pl-2.5 font-medium text-gray-500 text-sm shadow-sm hover:bg-gray-50 sm:h-11 md:px-4">
            <SelectValue placeholder={"Selecione a categoria"} />
          </SelectTrigger>
        </div>

        <SelectContent>
          <SelectGroup>
            {groups?.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ProductSections
        groups={groups}
        products={products}
        registerRef={registerGroupSection}
      />
    </div>
  );
}
