import { createRoot } from "react-dom/client";
import PizzaCard from "./PizzaCard";

const App = () => {
  return (
    <div>
      <h1>Pizza Store</h1>
      <PizzaCard name="Pepperoni" description="Pepperoni pizza" price={30} />
      <PizzaCard name="Margherita" description="Margherita pizza" price={25} />
      <PizzaCard
        name="Four Cheese"
        description="Four cheese pizza"
        price={35}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
