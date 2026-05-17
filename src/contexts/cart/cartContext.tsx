import { createContext, useContext, useState } from "react";
import type { CartItemType } from "./types";
import { generateKey } from "./utils";

interface CartContextType {
  addToCart: (cartItem: Omit<CartItemType, "comparisonKey">) => void;
  cartItems: CartItemType[];
}

export const CartContext = createContext({} as CartContextType);

interface CartProviderProps {
  children: React.ReactNode;
}
export function CartProvider({ children }: CartProviderProps) {
  const STORAGE_KEY = "@systeam/stored-cart-item";

  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const storedCartItems = localStorage.getItem(STORAGE_KEY);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  if (cartItems) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
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

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
