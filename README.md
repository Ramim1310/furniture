# Hamza Furniture House 🛋️

A modern, fully functional e-commerce web application for a furniture store, built with React and Tailwind CSS. The interface is completely in **Bangla** to cater to local customers.

## 🚀 Getting Started 

Follow these steps to set up and run the project on a new machine:

1.  **Prerequisites**: Functionally, we only need **Node.js** installed on our computer. 
2.  **Installation**:
    ```bash
    npm install
    ```
    *(This command will automatically download React and all other necessary tools into the project folder)*
3.  **Run Application**:
    ```bash
    npm run dev
    ```
4.  **Access**: Open your browser and go to `http://localhost:5173`.

---

## ✨ Features Implemented

### 👤 Customer Features
*   **User Registration & Login**: Customers can create accounts with their Name, Phone, and Address.
*   **Persistent Profile**: User sessions are saved, so they stay logged in even after refreshing.
*   **Shopping Cart**:
    *   Add products to cart.
    *   Adjust quantities (+/-).
    *   Cart items persist in browser memory (LocalStorage).
*   **Smart Checkout**:
    *   Requires login to checkout.
    *   **Auto-fills** the order form with the customer's registered address and phone number.
*   **Product Browsing**: View products by categories (Sofa, Bed, Dining, etc.).
*   **About Us Page**: A dedicated page telling the brand's story and mission.

### 🛡️ Admin Dashboard Features
*   **Secure Login**: 
    *   Protected route for Admin.
    *   Must use correct credentials (see below).
*   **Product Management**: Add, Delete, and View products.
*   **Order Management**:
    *   View all customer orders with details.
    *   Update status (Pending -> Delivered / Cancelled).
    *   **Delete Order**: Permanently remove an order from the system (includes confirmation popup).
*   **Customer List**: View a table of all registered customers and their contact info.

---

## 🔑 Default Credentials

### Admin Panel
*   **Login URL**: `/admin`
*   **Email**: `admin@hamza.com`
*   **Password**: `hamza123`

### Sample Customer (If needed for testing)
*   **Email**: `test@user.com`
*   **Password**: `123456`
*(Note: we can also register a new customer easily)*

---

## 🛠️ Tech Stack
*   **Library**: React.js (Vite)
*   **Styling**: Tailwind CSS (v4)
*   **Icons**: Lucide React
*   **State Management**: React Context API (`AuthContext`, `ShopContext`)
*   **Database**: Browser LocalStorage (No external database required)

---

## 📝 Developer Notes
*   **Data Persistence**: The app uses `localStorage` to save Users, Orders, and Cart data. If you want to reset everything, simply clear the browser's application data.
*   **Mock Data**: Initial products are loaded from `src/data/mockData.js`.
*   **Security**: This is a frontend-only project. Authentication is simulated on the client side. For a real production app, we would need a backend API.
