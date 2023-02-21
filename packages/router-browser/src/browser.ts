export type BrowserQueryParams = Record<string, string>;

export const getBrowserQueryParamsAsString = (params: BrowserQueryParams) => Object.keys(params).length ? `?${new URLSearchParams(params)}` : "";

export const getBrowserQueryParamsFromString = (params: string) => {
  const search = new URLSearchParams(params);
  const ret: BrowserQueryParams = {};

  search.forEach((value, key) => ret[key] = value);
  return ret;
}

export const getBrowserPathNodes = (path: string) => path.trim().split("?")[0].split("/");
