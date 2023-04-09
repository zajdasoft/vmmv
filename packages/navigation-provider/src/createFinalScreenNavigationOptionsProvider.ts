import type { ScreenBase, NavigationProvider, ScreenMatchResult } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";

export const createFinalScreenNavigationOptionsProvider = <
  TScreen extends ScreenBase,
  TQueryParams
>(
  action: ActionExecutioner,
  parent: TScreen,
  matchNavigation: (pathname: string) => ScreenMatchResult,
): NavigationProvider => ({
  matchNavigation,
  findNavigationChild: () => undefined,
  acceptNavigationChild: () => {
    throw Error(`It is not allowed for ${parent.constructor.name} to a accept a child.`);
  },
  setNavigationFinalStep: () => {
    action(`Set ${parent.constructor.name} is the navigation final step`, () => {})
  },
});
