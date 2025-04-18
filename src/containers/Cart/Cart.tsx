import React from "react";
import { useCart } from "../../views/CartContext/CartContext";
import Header from "../../views/Header/Header";
import ProductCard from "./ProductCard";

const Cart: React.FC = () => {
  const { getCartItems } = useCart();
  const cartItems = getCartItems();

  return (
    <div className="container mx-auto p-4">
      <Header sectionTitle="Shopping Cart" />
      <div className="flex flex-col space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((productData) => (
            <ProductCard key={productData.productId} {...productData} />
          ))
        ) : (
          <div className="w-full flex justify-center items-center h-[200px] shadow shadow-primary-color">
            <div className="flex flex-row">
                <span>No items in cart. Please add items to cart.</span>
                <a href="/" className="text-primary-color hover:text-black underline">(View Products)</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
