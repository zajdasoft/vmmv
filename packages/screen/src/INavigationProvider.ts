import type { PathParams } from "./PathParams";
import type { IScreen } from "./IScreen";

export type ScreenMatchResult = [boolean, PathParams];
export type ScreenSearchResult<TScreen extends IScreen<TQueryParams>, TQueryParams> = [TScreen, PathParams];
export type ScreenSearch<TScreen extends IScreen<TQueryParams>, TQueryParams> = (pathNode: string) => ScreenSearchResult<TScreen, TQueryParams> | undefined;
export const getSearchedScreen = <TScreen extends IScreen<TQueryParams>, TQueryParams>(search: ScreenSearchResult<TScreen, TQueryParams>) => search[0] as TScreen;
export const getSearchedParams = <TScreen extends IScreen<TQueryParams>, TQueryParams>(search: ScreenSearchResult<TScreen, TQueryParams>) => search[1];

export interface INavigationProvider<TQueryParams> {
  findNavigationChild: ScreenSearch<IScreen<TQueryParams>, TQueryParams>;
  acceptNavigationChild: (child: IScreen<TQueryParams>) => void;
  setNavigationFinalStep: () => void;

  matchNavigation(pathNode: string): ScreenMatchResult;
}
