import type { QueryParams } from "./QueryParams";

export interface NavigationRoute {
  go(queryParams: QueryParams): void;

  getLinkLocation(queryParams: QueryParams): string;

  getPathLocation(queryParams: QueryParams): string;
}
