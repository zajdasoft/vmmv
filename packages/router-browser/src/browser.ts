import type { QueryParams } from "@vmmv/screen";
import { queryParamsToURLSearchParams } from "./queryParamsToURLSearchParams";

export const getBrowserQueryParamsAsString = (params: QueryParams) => Object.keys(params).length ? `?${queryParamsToURLSearchParams(params)}` : "";

export const getBrowserQueryParamsFromString = (params: string) => {
  const search = new URLSearchParams(params);
  const ret: QueryParams = {};

  search.forEach((value, key) => ret[key] = value);
  return ret;
}

export const getBrowserPathnames = (path: string) => path.trim().split("?")[0].split("/");
