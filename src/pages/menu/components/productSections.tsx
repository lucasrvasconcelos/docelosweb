import type { Group } from "@/api/products/get-group-products";
import type { ProductsType } from "@/api/products/get-products";
import { ProductSection } from "./productSection";

interface ProductSectionsType {
  groups?: Group[];
  products?: ProductsType[];
  registerRef: (id: string) => (el: HTMLDivElement | null) => void;
}
export function ProductSections({
  products,
  groups,
  registerRef,
}: ProductSectionsType) {
  return (
    <div className="mt-8 px-2 sm:px-0 md:mt-10">
      {products?.length &&
        groups?.map((group) => {
          const groupProducts  = products.filter(
            (products) => products.group.id === group.id
          );
          return (
            <ProductSection
              group={group}
              key={group.id}
              products={groupProducts }
              ref={registerRef(group.id)}
            />
          );
        })}
    </div>
  );
}
