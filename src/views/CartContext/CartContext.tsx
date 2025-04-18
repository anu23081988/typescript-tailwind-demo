import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../../containers/products/types';

// Define the structure of a cart item
interface CartItem {
  productId: number;
  productDetail: Product;
  count: number;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  addToCart: (productId: number, productDetail: Product, itemCount?: number) => void;
  getProductCount: (productId: number) => number;
  getCartItems: () => CartItem[];
  deleteCartItem: (productId: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((total, item) => total + item.count, 0);

  const addToCart = (productId: number, productDetail: Product, itemCount: number = 1) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.productId === productId);

      if (itemIndex !== -1) {
        // Product already in cart, increment count
        const newItems = [...prevItems];
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          count: newItems[itemIndex].count + itemCount,
        };
        return newItems;
      } else {
        // New product, add to cart
        return [...prevItems, { productId, productDetail, count: itemCount }];
      }
    });
  };

  const getProductCount = (productId: number) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.count : 0;
  };

  const getCartItems = () => {
    return cartItems;
  };

  const deleteCartItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, getProductCount, getCartItems, deleteCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
