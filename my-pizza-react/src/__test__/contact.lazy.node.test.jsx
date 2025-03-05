import { cleanup, render } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";
import createFetchMock from "vitest-fetch-mock";

const queryClient = new QueryClient();

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

function renderWithClient(ui) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

describe("ContactRoute", () => {
  beforeEach(() => {
    cleanup();
    fetchMock.resetMocks();
  });
  it("submits the form successfully", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    const screen = renderWithClient(<Route.options.component />);

    const testData = {
      name: "John Doe",
      email: "john@mail.com",
      message: "Hello!",
    };
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("email@mail.com");
    const messageInput = screen.getByPlaceholderText("Message");

    nameInput.value = testData.name;
    emailInput.value = testData.email;
    messageInput.value = testData.message;

    const submitButton = screen.getByRole("button", { name: "Send" });
    submitButton.click();

    const successHeading = await screen.findByRole("heading", { level: 3 });
    expect(successHeading.textContent).toContain("Thanks for contacting us!");

    const request = fetchMock.requests();
    expect(request.length).toBe(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      body: JSON.stringify(testData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("submits the form unsuccessfully", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to submit"));
    const screen = renderWithClient(<Route.options.component />);

    const testData = {
      name: "John Doe",
      email: "john@mail.com",
      message: "Hello!",
    };
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("email@mail.com");
    const messageInput = screen.getByPlaceholderText("Message");

    nameInput.value = testData.name;
    emailInput.value = testData.email;
    messageInput.value = testData.message;

    const submitButton = screen.getByRole("button", { name: "Send" });
    submitButton.click();

    const successHeading = await screen.findByRole("heading", { level: 3 });
    expect(successHeading.textContent).toContain("Something went wrong");
  });
});
