import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { createWrapper } from "./utils";
import { useInfiniteRepoData } from "../hooks";
import * as api from "../api";

describe("query hook", () => {
  const apiCall = jest.spyOn(api, "fetchRepoData");

  beforeEach(() => {
    apiCall.mockResolvedValue({ name: "mocked-react-query" });
  });

  const tries = new Array(10).fill(undefined).map((_, index) => index);

  test.each(tries)("flaky try: %s", async () => {
    const { result } = renderHook(() => useInfiniteRepoData(), {
      wrapper: createWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.flatData).toEqual([{ name: "mocked-react-query" }]);

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => result.current.isFetching);
    await waitFor(() => !result.current.isFetching);

    expect(result.current.flatData).toEqual([
      { name: "mocked-react-query" },
      { name: "mocked-react-query" },
    ]);
  });

  test.each(tries)("success try: %s", async () => {
    const { result } = renderHook(() => useInfiniteRepoData(), {
      wrapper: createWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.flatData).toEqual([{ name: "mocked-react-query" }]);

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() =>
      expect(result.current.flatData).toEqual([
        { name: "mocked-react-query" },
        { name: "mocked-react-query" },
      ])
    );
  });
});
