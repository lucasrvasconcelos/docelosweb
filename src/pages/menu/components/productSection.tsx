import { forwardRef } from "react";
import type { Group } from "@/api/products/get-group-products";
import type { ProductsType } from "@/api/products/get-products";
import { TypographyH3 } from "@/components/ui/typographyH3";
import { cn } from "@/lib/utils";
import { ProductItem } from "./productItem";

interface ProductSectionProps {
  group: Group;
  products: ProductsType[];
}

export const ProductSection = forwardRef<HTMLDivElement, ProductSectionProps>(
  ({ group, products }, ref) => {
    return (
      <div className="mt-8">
        <div
          className="mb-3 scroll-mt-24 px-1 sm:px-0 md:mb-5"
          id={group.id}
          ref={ref}
        >
          <TypographyH3
            className={cn("font-semibold text-gray-800 text-xl md:text-2xl")}
          >
            {group.name}
          </TypographyH3>
          {group.description && (
            <p className="mt-1 line-clamp-2 font-light text-gray-500 text-sm md:text-base">
              {group.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
);

ProductSection.displayName = "ProductsFromGroup";
