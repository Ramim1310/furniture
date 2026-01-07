import React, { createContext, useContext, useState } from 'react';
import { initialProducts, initialOrders } from '../data/mockData';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Persist Products
  React.useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);
  
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist Cart and Orders
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  React.useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Product Actions
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id, updatedData) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  // Order Actions
  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  const placeOrder = (customerDetails) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      customerName: customerDetails.name,
      customerAddress: customerDetails.address,
      customerPhone: customerDetails.phone,
      items: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'Pending'
    };
    setOrders([newOrder, ...orders]);
    setCart([]); // Clear cart
    return newOrder.id;
  };

  // Cart Actions
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, amount) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + amount);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider value={{ 
      products, 
      orders, 
      cart,
      addProduct, 
      deleteProduct, 
      updateProduct,
      updateProduct,
      updateOrderStatus,
      deleteOrder,
      placeOrder,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart 
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
