import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CartContext } from "../context/context";
import Header from "./../Header";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

describe("Header component", () => {
  it("renders the logo correctly", () => {
    const screen = render(
      <CartContext.Provider value={[[]]}>
        <Header />
      </CartContext.Provider>,
    );
    const logo = screen.getByRole("heading", { level: 1 });
    expect(logo).toBeInTheDocument();
    expect(logo.textContent).toContain("Padre Gino's Pizza");
    const icon = screen.getByText("🛒");
    expect(icon).toBeInTheDocument();
    const cartNumber = screen.getByText("0");
    expect(cartNumber).toBeInTheDocument();
  });

  it("displays the correct number of items in the cart", () => {
    const cartItems = [{ id: 1 }, { id: 2 }];
    const screen = render(
      <CartContext.Provider value={[cartItems]}>
        <Header />
      </CartContext.Provider>,
    );
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
