import { Minus, Plus } from "lucide-react";
import type { AddonType } from "@/api/products/categories";
import { formatCurrecy } from "@/lib/format-currency";
import { RadioIndicator } from "./radioIndicator";
import { RemoveAddonAlert } from "./removeAddonAlert";

interface AddonItemProps {
  addon: AddonType;
  disabled: boolean;
  maxGroupSelect: number;
  onDecrement: () => void;
  onIncrement: () => void;
  quantity: number;
  selected: boolean;
}

export function AddonItem({
  quantity,
  onIncrement,
  onDecrement,
  addon,
  disabled,
  maxGroupSelect,
  selected,
}: AddonItemProps) {
  return (
    <div className="relative flex w-full items-center justify-between bg-card px-4 pr-6">
      <div className="flex w-full items-center justify-center">
        {addon.image_url && (
          <img
            alt={addon.name}
            className="my-3 mr-3 flex h-15 w-15 rounded-md"
            src={addon.image_url}
          />
        )}
        <button
          className="w-full py-4 text-left"
          onClick={selected && maxGroupSelect === 1 ? onDecrement : onIncrement}
          type="button"
        >
          <span className="line-clamp-2 w-full font-normal text-gray-700 text-sm tracking-tight">
            {addon.name}
          </span>
          {addon.description && (
            <span className="line-clamp-2 font-light text-gray-700 text-xs">
              {addon.description}
            </span>
          )}
          {addon.price && (
            <span className="mt-1 font-medium text-gray-700 text-xs">
              + {formatCurrecy(addon.price)}
            </span>
          )}
        </button>
      </div>
      {maxGroupSelect > 1 ? (
        <div className="flex items-center space-x-2 rounded-md text-sm">
          {quantity > 0 && (
            <>
              {quantity === 1 ? (
                <RemoveAddonAlert
                  addonName={addon.name}
                  onDecrement={onDecrement}
                />
              ) : (
                <button
                  className="cursor-pointer p-0 text-primary text-xl disabled:opacity-50"
                  onClick={onDecrement}
                  type="button"
                >
                  <Minus size={18} />
                </button>
              )}
              <span className="w-8 overflow-hidden text-center font-normal text-gray-700 text-sx">
                {quantity}
              </span>
            </>
          )}

          <button
            className={
              "cursor-pointer p-0 text-primary text-xl disabled:opacity-50"
            }
            disabled={disabled}
            onClick={onIncrement}
            type="button"
          >
            <Plus size={18} />
          </button>
        </div>
      ) : (
        <RadioIndicator
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          selected={selected}
        />
      )}
    </div>
  );
}
