import type { Navigator } from "@vmmv/screen";
import type { RouteNavigationItem } from "./RouteNavigationItem";

export type MiddlewareParams<TQueryParams> = {
  next(): void;
  navigate(dest: string, queryParams: TQueryParams): void;
  path: string;
  isNavError: boolean;
  screens: RouteNavigationItem<TQueryParams>[];
  navigator: Navigator<TQueryParams>,
  queryParams: TQueryParams;
}

export type Middleware<TQueryParams> = (params: MiddlewareParams<TQueryParams>) => void;
