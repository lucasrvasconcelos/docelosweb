import { forwardRef } from "react";
import type { CategoriesType } from "@/api/products/categories";
import { TypographyH3 } from "@/components/ui/typographyH3";
import { cn } from "@/lib/utils";
import { ProductItem } from "./productItem";

interface ProductSectionProps {
  categorie: CategoriesType;
}

export const ProductSection = forwardRef<HTMLDivElement, ProductSectionProps>(
  ({ categorie }, ref) => {
    return (
      <div className="mt-8">
        <div
          className="mb-3 scroll-mt-24 px-1 sm:px-0 md:mb-5"
          id={categorie.id}
          ref={ref}
        >
          <TypographyH3
            className={cn("font-semibold text-gray-800 text-xl md:text-2xl")}
          >
            {categorie.name}
          </TypographyH3>
          {categorie.description && (
            <p className="mt-1 line-clamp-2 font-light text-gray-500 text-sm md:text-base">
              {categorie.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          {categorie.items.map((item) => {
            return <ProductItem item={item} key={item.id} />;
          })}
        </div>
      </div>
    );
  }
);

ProductSection.displayName = "ProductsFromGroup";
