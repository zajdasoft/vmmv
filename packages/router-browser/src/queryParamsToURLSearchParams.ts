import type { QueryParams } from "@vmmv/screen";

export const queryParamsToURLSearchParams = (params: QueryParams): URLSearchParams => {
  const items = Object.keys(params).map(key => [key, params[key]]).filter(x => Boolean(x[1])) as string[][];
  return new URLSearchParams(items);
}