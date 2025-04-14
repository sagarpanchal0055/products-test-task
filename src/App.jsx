import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Bounce, ToastContainer } from "react-toastify";
import UserNew from "./pages/User/UserNew";
import Layout from "./components/Layout";
import User from "./pages/User/User";
import UserEdit from "./pages/User/UserEdit";
import Products from "./pages/Products/Products";
import AuthProvider from "./context/AuthProvider";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<User />} />
              <Route path="/dashboard/user-new" element={<UserNew />} />
              <Route path="/dashboard/user-edit/:id" element={<UserEdit />} />
            </Route>
            <Route path="/products" element={<Layout />}>
              <Route index element={<Products />} />
              {/* <Route path="/dashboard/user-new" element={<UserNew />} />
            <Route path="/dashboard/user-edit/:id" element={<UserEdit />} /> */}
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
