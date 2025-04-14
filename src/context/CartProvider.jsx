import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();
  const addToCart = (data) => {};

  return (
    <CartContext.Provider value={{ cartItem, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return useContext(CartContext);
};
