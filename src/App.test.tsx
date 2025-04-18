import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ProductList from "./containers/products/productList/ProductList";
import ProductDetail from "./containers/products/ProductDetail/ProductDetail";
import Cart from "./containers/Cart/Cart";
import { CartProvider } from "./views/CartContext/CartContext"; // Import your CartProvider

test('renders ProductList component at root path "/"', () => {
  render(
    <CartProvider> {/* Wrap with CartProvider */}
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  );

  expect(screen.getByText(/Product List/i)).toBeInTheDocument();
});

test('renders ProductDetail component at "/product/:id" path', () => {
  render(
    <CartProvider> {/* Wrap with CartProvider */}
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  );

  expect(screen.getByText(/Product Detail/i)).toBeInTheDocument();
});

test('renders Cart component at "/cart" path', () => {
  render(
    <CartProvider> {/* Wrap with CartProvider */}
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  );

  expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
});
