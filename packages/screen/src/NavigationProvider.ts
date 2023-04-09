import type { PathParams } from "./PathParams";
import type { ScreenBase } from "./ScreenBase";

export type ScreenMatchResult = PathParams | undefined;
export type ScreenSearchResult<TScreen extends ScreenBase> = [TScreen, PathParams];
export type ScreenSearch<TScreen extends ScreenBase> = (pathname: string) => ScreenSearchResult<TScreen> | undefined;
export const getSearchedScreen = <TScreen extends ScreenBase>(search: ScreenSearchResult<TScreen>) => search[0] as TScreen;
export const getSearchedParams = <TScreen extends ScreenBase>(search: ScreenSearchResult<TScreen>) => search[1];

export interface NavigationProvider {
  findNavigationChild: ScreenSearch<ScreenBase>;
  acceptNavigationChild: (child: ScreenBase) => void;
  setNavigationFinalStep: () => void;

  matchNavigation(pathname: string): ScreenMatchResult;
}
