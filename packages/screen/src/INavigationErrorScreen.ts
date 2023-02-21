import type { IScreen } from "./IScreen";

export interface INavigationErrorScreen<TQueryScreen> extends IScreen<TQueryScreen> {
  notifyNavigationFailed(path: string): void;
}

export function isNavigationErrorScreen<TQueryParams>(screen: IScreen<TQueryParams>): screen is INavigationErrorScreen<TQueryParams> {
  return typeof (screen as INavigationErrorScreen<TQueryParams>).notifyNavigationFailed === "function";
}
