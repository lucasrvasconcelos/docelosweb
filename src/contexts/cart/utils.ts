import type { CartAddonItemType } from "./types";

interface GenerateKeyType {
  item: {
    addons: CartAddonItemType[];
    observation?: string;
    productId: string;
  };
}

export function generateKey({ item }: GenerateKeyType) {
  return `${item.productId}-${item.observation ?? ""}-${JSON.stringify(
    item.addons
      .map((addon) => ({
        id: addon.addonId,
      }))
      .sort((a, b) => a.id.localeCompare(b.id))
  )}`;
}
