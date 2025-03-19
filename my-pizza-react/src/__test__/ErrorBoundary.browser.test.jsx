import { cleanup, render } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

describe("ErrorBoundary", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children without error", () => {
    const screen = render(
      <ErrorBoundary>
        <p>Test Child</p>
      </ErrorBoundary>,
    );
    const paragraph = screen.getByRole("paragraph");
    expect(paragraph.textContent).toBe("Test Child");
  });

  it("renders error message when there is an error", () => {
    const TestComponent = () => {
      throw new Error("Test error");
    };

    const screen = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe("Something went wrong.");

    const link = screen.getByRole("link");
    expect(link.textContent).toBe("Click Here");
    expect(link).toHaveAttribute("href", "/");
  });
});
