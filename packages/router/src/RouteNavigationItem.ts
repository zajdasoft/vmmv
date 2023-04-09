import type { ScreenBase, PathParams } from "@vmmv/screen";

export type RouteNavigationItem = {
  pathname: string;
  pathParams: PathParams;
  screen: ScreenBase;
}
