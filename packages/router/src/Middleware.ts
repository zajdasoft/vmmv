import type { Navigator } from "@vmmv/screen";
import type { RouteNavigationItem } from "./RouteNavigationItem";
import type { QueryParams } from "@vmmv/screen";

export type MiddlewareParams = {
  next(): void;
  navigate(dest: string, queryParams: QueryParams): void;
  path: string;
  isNavError: boolean;
  screens: RouteNavigationItem[];
  navigator: Navigator,
  queryParams: QueryParams;
}

export type Middleware = (params: MiddlewareParams) => void;
