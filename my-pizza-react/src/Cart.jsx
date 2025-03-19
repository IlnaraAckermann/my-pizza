import { useContext } from "react";
import { currencyFormatter } from "./untils/formatters";
import { CartContext } from "./context/context";

export default function Cart({ checkout }) {
  const [cart, setCart] = useContext(CartContext);
  let total = 0;

  total = cart.reduce((acc, item) => acc + item.pizza.sizes[item.size], 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <span className="size">{item.size}</span>
            <span className="type"> - {item.pizza.name} - </span>
            <span className="price">{item.price}</span>
            <button
              onClick={() =>
                setCart((prev) => prev.filter((e) => e.id !== item.id))
              }
              className="remove-button"
            >
              remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: {currencyFormatter(total)}</h3>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
