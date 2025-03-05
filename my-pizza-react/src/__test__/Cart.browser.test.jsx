import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";
import { CartContext } from "../context/context";

test("should render with nothing in the cart", async () => { 
  const { asFragment } = render(
  <CartContext.Provider value={[[], () => {}]}>  
      <Cart />
  </CartContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
}); 
