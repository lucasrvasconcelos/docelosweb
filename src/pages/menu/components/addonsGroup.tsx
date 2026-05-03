import type { AddonsGroupType } from "@/api/products/categories";
import { AddonItem } from "./addonItem";

interface AddonsGroupTypeProps {
  addonsGroup: AddonsGroupType[];
}

export function AddonsGroup({ addonsGroup }: AddonsGroupTypeProps) {
  return (
    <div className="mt-8 flex flex-col">
      <ul className="flex flex-col">
        {addonsGroup.map((addonGroup) => {
          return (
            <li className="bg-gray-100" key={addonGroup.id}>
              <div className="sticky top-19 flex flex-col border-gray-200 border-t border-b bg-inherit p-4 text-gray-700">
                <span className="font-medium text-sm">{addonGroup.name}</span>
                <span className="mt-1 font-light text-xs">
                  escolha até {addonGroup.maxSelect}{" "}
                  {addonGroup.maxSelect && addonGroup.maxSelect > 1
                    ? "opções"
                    : "opção"}
                </span>
              </div>
              <div className="flex flex-col items-start justify-center gap-0.5">
                {addonGroup.addons.map((addon) => {
                  return <AddonItem addon={addon} key={addon.id} />;
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
