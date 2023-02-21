import type { INavigationRoute } from "./INavigationRoute";

export type Navigator<TQueryParams> = (dest: string) => INavigationRoute<TQueryParams>;

export function createInitialNavigator<TQueryParams>(): Navigator<TQueryParams> {
  return () => ({
    go: () => {},
    getLinkLocation: () => "",
    getPathLocation: () => "",
  });
}
