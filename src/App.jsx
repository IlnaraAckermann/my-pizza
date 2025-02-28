import { createRoot } from "react-dom/client";
import PizzaCard from "./PizzaCard";

const App = () => {
  return (
    <div>
      <h1>Pizza Store</h1>
      <PizzaCard
        name="Pepperoni"
        description="Pepperoni pizza"
        image="/public/pizzas/pepperoni.webp"
      />
      <PizzaCard
        name="Margherita"
        description="Margherita pizza"
        image="/public/pizzas/mediterraneo.webp"
      />
      <PizzaCard
        name="Four Cheese"
        description="Four cheese pizza"
        image="/public/pizzas/four_cheese.webp"
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
