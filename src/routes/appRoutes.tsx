import { Route, Routes } from "react-router";
import { MenuLayout } from "@/layout/menuLayout";
import { Menu } from "../pages/menu";
import { NotFound } from "../pages/notFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MenuLayout />} path="/">
        <Route element={<Menu />} path="/" />
      </Route>
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
