import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product, size) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        const newItem = {
          ...product,
          selectedSize: size,
          quantity: 1, 
          cartItemId: Date.now() + Math.random(), 
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeItemFromCart = (cartItemId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.cartItemId !== cartItemId)
    );
  };

  const updateItemQuantity = (cartItemId, delta) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQuantity = item.quantity + delta;
          

          if (newQuantity < 1) {
            return null; 
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) 
    );
  };

  const contextValue = {
    cartItems,
    addItemToCart,
    removeItemFromCart, 
    updateItemQuantity, 
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};