import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";

afterEach(cleanup);

test("should render", async () => {
  const props = {
    name: "Pizza",
    image: "https://picsum.photos/200",
    description: "This is a pizza",
  };
  const screen = render(<Pizza {...props} />);

  const img = screen.getByRole("img");
  expect(img.src).toBe(props.image);
  expect(img.alt).toBe(props.name);
  const heading = screen.getByRole("heading");
  expect(heading.textContent).toBe(props.name);
  const paragraph = screen.getByRole("paragraph");
  expect(paragraph.textContent).toBe(props.description);
});

test("should render with default image", async () => {
  const props = {
    name: "Pizza",
    description: "This is a pizza",
  };
  const screen = render(<Pizza {...props} />);
  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
