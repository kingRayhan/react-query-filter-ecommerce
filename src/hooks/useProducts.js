import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const getLastPageNumber = (headers) => {
  const url = headers.link
    .split(",")
    .filter((l) => l.includes("next"))[0]
    ?.split(";")[0]
    .replace("<", "")
    .replace(">", "")
    .trim();

  if (!url) return;
  return parseInt(new URL(url).searchParams.get("_page"));
};
const productsApi = async ({ queryKey, pageParam = 1 }) => {
  const page = pageParam;
  const { categories, maxPrice, minPrice } = queryKey[1].filter;
  const filterQueries = new URLSearchParams();

  if (maxPrice) filterQueries.append("price_lte", maxPrice);
  if (minPrice) filterQueries.append("price_gte", minPrice);

  if (categories) {
    filterQueries.append("categories.id", categories);
  }

  const res = await axios.get(
    `products?_page=${page}&_limit=30&${filterQueries}`
  );

  return {
    data: res.data,
    pages: {
      nextPage: getLastPageNumber(res.headers),
    },
  };
};

const useProducts = ({ filter }) => {
  return useInfiniteQuery(["products", { filter }], productsApi, {
    getNextPageParam: (lastPage) => {
      return lastPage.pages?.nextPage;
    },
  });
};

export default useProducts;
