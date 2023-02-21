import type { IScreen, PathParams } from "@vmmv/screen";

export type RouteNavigationItem<TQueryParams> = {
  pathNode: string;
  pathParams: PathParams;
  screen: IScreen<TQueryParams>;
}
