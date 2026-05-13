import { createContext, useContext, useState } from "react";
import type { CartAddonItemType, CartItemType } from "./types";

interface CartContextType {
  addToCart: (cartItem: Omit<CartItemType, "comparisonKey">) => void;
  cartItems: CartItemType[];
  selectedAddons: SelectedAddonsType;
  toggleAddon: (addon: ToggleAddonType) => void;
}

interface GenerateKeyType {
  item: {
    addons: CartAddonItemType[];
    observation?: string;
    productId: string;
  };
}

interface ToggleAddonType {
  addonId: string;
  groupId: string;
  maxSelect: number;
}



export const CartContext = createContext({} as CartContextType);

interface CartProviderProps {
  children: React.ReactNode;
}
export function CartProvider({ children }: CartProviderProps) {
  const STORAGE_KEY = "@systeam/stored-cart-item";

  const [selectedAddons, setSelectedAddons] = useState<SelectedAddonsType>({});

  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const storedCartItems = localStorage.getItem(STORAGE_KEY);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  if (cartItems) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }

  function toggleAddon({ addonId, groupId, maxSelect }: ToggleAddonType) {
    setSelectedAddons((state) => {
      const current = state[groupId] ?? [];

      const alreadySelected = current.includes(addonId);
      if (alreadySelected) {
        return {
          ...state,
          [groupId]: current.filter((id) => id !== addonId),
        };
      }
      if (maxSelect === 1) {
        return {
          ...state,
          [groupId]: [addonId],
        };
      }
      if (current.length >= maxSelect) {
        return state;
      }
      return {
        ...state,
        [groupId]: [...current, addonId],
      };
    });
  }

  function addToCart(cartItem: Omit<CartItemType, "comparisonKey">) {
    setCartItems((state) => {
      const comparisonKey = generateKey({
        item: {
          addons: cartItem.addons,
          productId: cartItem.productId,
          observation: cartItem.observation,
        },
      });

      const existingItemToCart = state.findIndex(
        (item) => item.comparisonKey === comparisonKey
      );

      if (existingItemToCart !== -1) {
        const updatedItems = [...state];

        updatedItems[existingItemToCart] = {
          ...updatedItems[existingItemToCart],
          quantity:
            updatedItems[existingItemToCart].quantity + cartItem.quantity,
        };
        return updatedItems;
      }

      return [
        ...state,
        {
          ...cartItem,
          comparisonKey,
        },
      ];
    });
  }

  function generateKey({ item }: GenerateKeyType) {
    return `${item.productId}-${item.observation ?? ""}-${JSON.stringify(
      item.addons
        .map((addon) => ({
          id: addon.addonId,
        }))
        .sort((a, b) => a.id.localeCompare(b.id))
    )}`;
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, toggleAddon, selectedAddons }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
