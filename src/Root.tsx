import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { PhonePage } from "./pages/PhonePage";
import { TabletsPage } from "./pages/TabletsPage";
import { AccessoriesPage } from "./pages/AccessoriesPage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { ThemeContextProvider } from "./store/ThemeContext";

import { CartContextProvider } from "./store/CartContext";
import { FvouritesContextProvider } from "./store/FavouritesContext";

import { ThankYouPage } from "./components/cart/ThankYou/ThankYou";
import { Cart } from "./components/cart/Cart";

import { ProductPage } from "./components/ItemCard/ItemCard";
import { AboutDevelopersPage } from "./pages/AboutDevelopersPage";

export const Root = () => (
  <HashRouter>
    <ThemeContextProvider>
      <FvouritesContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />

              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="phones/:phoneId" element={<ProductPage />} />
              <Route path="phones">
                <Route index element={<PhonePage />} />
              </Route>
              <Route path="tablets/:tabletId" element={<ProductPage />} />
              <Route path="tablets">
                <Route index element={<TabletsPage />} />
              </Route>
              <Route
                path="accessories/:accessoriesId"
                element={<ProductPage />}
              />
              <Route path="accessories">
                <Route index element={<AccessoriesPage />} />
              </Route>

              <Route path="developers">
                <Route index element={<AboutDevelopersPage />} />
              </Route>

              <Route path="favourites" element={<FavouritesPage />} />

              <Route path="cart" element={<Cart />} />
              <Route path="thank-you" element={<ThankYouPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CartContextProvider>
      </FvouritesContextProvider>
    </ThemeContextProvider>
  </HashRouter>
);
