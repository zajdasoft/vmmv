import type { ScreenDescriptor, PathParams } from "@vmmv/screen";

export type RouteNavigationItem = {
  pathname: string;
  pathParams: PathParams;
  screen: ScreenDescriptor;
}
