import { Check } from "lucide-react";
import { useState } from "react";
import type { AddonsGroupType } from "@/api/products/categories";
import { cn } from "@/lib/utils";
import { AddonItem } from "./addonItem";

interface AddonsGroupTypeProps {
  addonsGroup: AddonsGroupType[];
}

type SelectedAddonsType = Record<string, Record<string, number>>;

interface handleAddonQuantity {
  addonId: string;
  groupId: string;
  maxSelect: number;
}

export function AddonsGroup({ addonsGroup }: AddonsGroupTypeProps) {
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddonsType>({});

  function incrementAddonQuantity({
    groupId,
    addonId,
    maxSelect,
  }: handleAddonQuantity) {
    setSelectedAddons((state) => {
      const currentGroup = state[groupId] ?? {};

      if (maxSelect === 1) {
        return {
          ...state,

          [groupId]: {
            [addonId]: 1,
          },
        };
      }

      const currentQuantity = currentGroup[addonId] ?? 0;

      const totalSelected = Object.values(currentGroup).reduce(
        (acc, quantity) => acc + quantity,
        0
      );

      if (totalSelected >= maxSelect) {
        return state;
      }

      return {
        ...state,
        [groupId]: {
          ...currentGroup,
          [addonId]: currentQuantity + 1,
        },
      };
    });
  }

  function decrementAddonQuantity(groupId: string, addonId: string) {
    setSelectedAddons((state) => {
      const currentGroup = state[groupId] ?? {};
      const currentQuantity = currentGroup[addonId] ?? 0;

      return {
        ...state,
        [groupId]: {
          ...currentGroup,
          [addonId]: currentQuantity - 1,
        },
      };
    });
  }

  return (
    <div className="mt-8 flex flex-col">
      <ul className="flex flex-col">
        {addonsGroup.map((addonGroup) => {
          const maxGroupSelect = addonGroup.maxSelect ?? 1;
          const selectedCount = Object.values(
            selectedAddons[addonGroup.id] ?? {}
          ).reduce((acc, quantity) => acc + quantity, 0);
          const completed = selectedCount === maxGroupSelect;
          const badgeClassName =
            "shrink-0 rounded bg-gray-500 px-1.5 py-1 font-normal text-[10px] text-white leading-3";

          return (
            <li className="bg-gray-100" key={addonGroup.id}>
              <div className="sticky top-19 z-1 flex flex-col border-gray-200 border-t border-b bg-inherit p-4 text-gray-700">
                <span className="font-medium text-sm">{addonGroup.name}</span>
                <span className="mt-1 font-light text-xs">
                  escolha até {maxGroupSelect}
                  {maxGroupSelect && maxGroupSelect > 1 ? " opções" : " opção"}
                </span>
                {addonGroup.required && (
                  <div className="absolute top-1/2 right-4 flex items-center space-x-1.5">
                    <span
                      className={cn(
                        badgeClassName,
                        completed && "bg-green-600"
                      )}
                    >
                      {selectedCount} / {maxGroupSelect}
                    </span>

                    {completed ? (
                      <span>
                        <Check
                          className="rounded-full bg-green-600 p-1 text-white"
                          size={16}
                          strokeWidth={5}
                        />
                      </span>
                    ) : (
                      <span className={cn("uppercase", badgeClassName)}>
                        Obrigatório
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start justify-center gap-0.5">
                {addonGroup.addons.map((addon) => {
                  const quantity =
                    selectedAddons[addonGroup.id]?.[addon.id] ?? 0;

                  const disabled = maxGroupSelect === selectedCount;
                  const selected = quantity > 0;

                  return (
                    <AddonItem
                      addon={addon}
                      disabled={disabled}
                      key={addon.id}
                      maxGroupSelect={maxGroupSelect}
                      onDecrement={() =>
                        decrementAddonQuantity(addonGroup.id, addon.id)
                      }
                      onIncrement={() =>
                        incrementAddonQuantity({
                          addonId: addon.id,
                          groupId: addonGroup.id,
                          maxSelect: maxGroupSelect,
                        })
                      }
                      quantity={quantity}
                      selected={selected}
                    />
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
