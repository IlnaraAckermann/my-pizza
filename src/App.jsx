import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";
import { CartContext } from "./context/context";
import Header from "./Header";


const App = () => {
  const cartContextValue = useState([]);
  return (
    <StrictMode>
      <CartContext.Provider value={cartContextValue}>
      <div>
        <Header />
        <Order />
        <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
