import { expect, test, vi, describe } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import usePizzaOfTheDay from "../hooks/usePizzaOfTheDay";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

const testPizza = {
  id: 1,
  name: "Pizza",
  category: "Test",
  image: "https://picsum.photos/200",
  description: "This is a pizza",
  size: {
    small: 10,
    medium: 12,
    large: 14,
  },
};

describe("usePizzaOfTheDay", () => {
  test("should return the pizza of the day", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testPizza));
    const { result } = renderHook(() => usePizzaOfTheDay());
    expect(result.current).toBeNull();
  });

  test("should call the API", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testPizza));
    const { result } = renderHook(() => usePizzaOfTheDay());
    await waitFor(() => {
      expect(result.current).toEqual(testPizza);
    });
  });
});
