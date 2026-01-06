import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginAdmin = (email, password) => {
    if (email === 'admin@hamza.com' && password === 'hamza123') {
      const adminUser = { name: 'Admin', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return { success: true };
    }
    return { success: false, message: 'Invalid admin credentials' };
  };

  const loginCustomer = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser; // Don't put password in session
      const sessionUser = { ...userWithoutPassword, role: 'customer' };
      setUser(sessionUser);
      localStorage.setItem('user', JSON.stringify(sessionUser));
      return { success: true };
    }
    
    // Check if user exists but wrong password
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return { success: false, message: 'ভুল পাসওয়ার্ড' };
    }

    return { success: false, message: 'ব্যবহারকারী খুঁজে পাওয়া যায়নি' };
  };

  const registerCustomer = (userData) => {
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'এই ইমেইল ইতিমধ্যে নিবন্ধিত' };
    }

    const newUser = { ...userData, id: Date.now() };
    const updatedUsers = [...users, newUser];
    
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Auto login
    const { password, ...userWithoutPassword } = newUser;
    const sessionUser = { ...userWithoutPassword, role: 'customer' };
    setUser(sessionUser);
    localStorage.setItem('user', JSON.stringify(sessionUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, users, loginAdmin, loginCustomer, registerCustomer, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
