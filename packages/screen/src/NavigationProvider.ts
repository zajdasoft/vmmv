import type { PathParams } from "./PathParams";
import type { ScreenDescriptor } from "./ScreenDescriptor";

export type ScreenMatchResult = PathParams | undefined;
export type ScreenSearchResult<TScreen extends ScreenDescriptor> = [TScreen, PathParams];
export type ScreenSearch<TScreen extends ScreenDescriptor> = (pathname: string) => ScreenSearchResult<TScreen> | undefined;
export const getSearchedScreen = <TScreen extends ScreenDescriptor>(search: ScreenSearchResult<TScreen>) => search[0] as TScreen;
export const getSearchedParams = <TScreen extends ScreenDescriptor>(search: ScreenSearchResult<TScreen>) => search[1];

export interface NavigationProvider {
  findNavigationChild: ScreenSearch<ScreenDescriptor>;
  acceptNavigationChild: (child: ScreenDescriptor) => void;
  setNavigationFinalStep: () => void;

  matchNavigation(pathname: string): ScreenMatchResult;
}
