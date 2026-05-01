import type { CategoriesType } from "@/api/products/categories";
import { ProductSection } from "./productSection";

interface ProductSectionsType {
  categories?: CategoriesType[];

  registerRef: (id: string) => (el: HTMLDivElement | null) => void;
}
export function ProductSections({
  categories,
  registerRef,
}: ProductSectionsType) {
  return (
    <div className="mt-8 px-2 sm:px-0 md:mt-10">
      {categories?.map((categorie) => {
        return (
          <ProductSection
            categorie={categorie}
            key={categorie.id}
            ref={registerRef(categorie.id)}
          />
        );
      })}
    </div>
  );
}
