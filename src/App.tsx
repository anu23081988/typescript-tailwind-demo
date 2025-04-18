import "./App.css";
import { Routes, Route } from 'react-router-dom';

import ProductList from "./containers/products/productList/ProductList";
import ProductDetail from "./containers/products/ProductDetail/ProductDetail";
import { CartProvider } from "./views/CartContext/CartContext";
import Cart from "./containers/Cart/Cart";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
