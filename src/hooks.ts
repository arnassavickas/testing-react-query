import axios from "axios";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { fetchRepoData } from "./api";

export function useRepoData() {
  return useQuery(["repoData"], async () => await fetchRepoData());
}

export function useInfiniteRepoData() {
  const { data, ...rest } = useInfiniteQuery(
    ["repoData"],
    async () => {
      return await fetchRepoData();
    },
    {
      getNextPageParam: () => 1,
    }
  );

  return { ...rest, flatData: data?.pages?.flat() || [] };
}

export function useMutateRepo() {
  const mutation = useMutation(async () => {
    await fetchRepoData();
  });

  return mutation;
}
