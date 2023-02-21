import type { IScreen } from "./IScreen";
import type { Navigator } from "./Navigator";
import type { PathParams } from "./PathParams";

export interface INavigationContext<TQueryParams> {
  getNavigator(): Navigator<TQueryParams>;
  getScreenPath(): IScreen<TQueryParams>[];
  getPathParams(): PathParams;
  getCurrentPathNode(): string;
}
