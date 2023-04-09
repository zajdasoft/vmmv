import type { NavigationRoute } from "./NavigationRoute";

export type Navigator = (dest: string) => NavigationRoute;

export function createInitialNavigator(): Navigator {
  return () => ({
    go: () => {},
    getLinkLocation: () => "",
    getPathLocation: () => "",
  });
}
