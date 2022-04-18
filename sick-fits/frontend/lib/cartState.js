import { createContext, useContext, useState } from 'react';
import Proptype from 'prop-types';

const LocalStateContext = createContext();
const LocalStateProvide = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvide
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvide>
  );
}

CartStateProvider.propTypes = {
  children: Proptype.oneOfType([
    Proptype.node,
    Proptype.arrayOf(Proptype.node),
  ]),
};

// make a custom hook for accesssing the cart local state
function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}
export { CartStateProvider, useCart };
