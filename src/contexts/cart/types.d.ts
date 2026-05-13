export interface CartAddonItemType {
  addonId: string;
  addonQuantity: number;
}

interface CartAddonType {
  addonItem: CartAddonItemType[];
  id: string;
  idAddonGroup: string;
}

interface CartItemType {
  addons: CartAddonItemType[];
  comparisonKey: string;
  observation?: string;
  productId: string;
  quantity: number;
}

export interface CartType {
  cartItems: CartItemType[];
  id: string;
}
