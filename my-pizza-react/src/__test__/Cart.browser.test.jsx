import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";
import { CartContext } from "../context/context";

test("should render with nothing in the cart", async () => {
  const { asFragment } = render(
    <CartContext.Provider value={[[], () => {}]}>
      <Cart />
    </CartContext.Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test("should render with has itens in the cart", async () => {
  const { asFragment } = render(
    <CartContext.Provider
      value={[
        [
          {
            pizza: {
              name: "pepperoni",
              sizes: { M: 3.0, L: 5.0, S: 1.0 },
            },
            size: "M",
            price: "$3.00",
            id: Math.random(),
          },
        ],
        () => {},
      ]}
    >
      <Cart />
    </CartContext.Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
