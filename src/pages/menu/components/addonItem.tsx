import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { AddonsType } from "@/api/products/categories";
import { formatCurrecy } from "@/lib/format-currency";
import { RemoveAddonAlert } from "./removeAddonAlert";

interface AddonItemProps {
  addon: AddonsType;
}

export function AddonItem({ addon }: AddonItemProps) {
  const [quantity, setQuantity] = useState(0);
  const MIN_QUANTITY = 0;
  const MAX_QUANTITY = 5;

  function updateQuantity(delta: number) {
    setQuantity((state) => {
      const newValue = state + delta;
      return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, newValue));
    });
  }
  return (
    <div
      className="flex w-full items-center justify-between bg-card px-4"
      key={addon.id}
    >
      <div className="flex items-center justify-center">
        {addon.image_url && (
          <img
            alt={addon.name}
            className="my-3 mr-3 flex h-15 w-15 rounded-md"
            src={addon.image_url}
          />
        )}
        <div className="py-4 pr-2">
          <span className="line-clamp-2 w-full font-normal text-gray-700 text-sm tracking-tight">
            {addon.name}
          </span>
          {addon.description && (
            <span className="line-clamp-3 font-light text-gray-700 text-xs">
              {addon.description}
            </span>
          )}
          {addon.price && (
            <span className="mt-1 font-medium text-gray-700 text-xs">
              + {formatCurrecy(addon.price)}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4 rounded-md text-sm">
        {quantity > 0 && (
          <>
            {quantity === 1 ? (
              <RemoveAddonAlert />
            ) : (
              <button
                className="cursor-pointer p-0 text-primary text-xl disabled:opacity-50"
                disabled={quantity <= MIN_QUANTITY}
                onClick={() => updateQuantity(-1)}
                type="button"
              >
                <Minus size={18} />
              </button>
            )}

            <span className="w-4 text-center font-normal text-gray-700 text-sx">
              {quantity}
            </span>
          </>
        )}

        <button
          className={
            "cursor-pointer p-0 text-primary text-xl disabled:opacity-50"
          }
          disabled={quantity >= MAX_QUANTITY}
          onClick={() => updateQuantity(1)}
          type="button"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
