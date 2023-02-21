import type { IScreen, INavigationProvider, ScreenMatchResult } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";

export const createFinalScreenNavigationOptionsProvider = <
  TScreen extends IScreen<TQueryParams>,
  TQueryParams
>(
  action: ActionExecutioner,
  parent: TScreen,
  matchNavigation: (pathNode: string) => ScreenMatchResult,
): INavigationProvider<TQueryParams> => ({
  matchNavigation,
  findNavigationChild: () => undefined,
  acceptNavigationChild: () => {
    throw Error(`It is not allowed for ${parent.constructor.name} to a accept a child.`);
  },
  setNavigationFinalStep: () => {
    action(`Set ${parent.constructor.name} is the navigation final step`, () => {})
  },
});
