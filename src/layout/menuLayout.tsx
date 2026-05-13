import { Outlet } from "react-router";
import { CartProvider } from "@/contexts/cart/cartContext";

export function MenuLayout() {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}
