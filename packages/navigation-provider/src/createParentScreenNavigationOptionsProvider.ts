import type { IScreen, IParentScreen, INavigationProvider, ScreenMatchResult } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";

export const createParentScreenNavigationOptionsProvider = <
  TParentScreen extends IParentScreen<TChildScreen, TQueryParams>,
  TChildScreen extends IScreen<TQueryParams>,
  TQueryParams,
>(
  action: ActionExecutioner,
  parent: TParentScreen,
  children: TChildScreen[],
  matchNavigation: (pathNode: string) => ScreenMatchResult,
): INavigationProvider<TQueryParams> => ({
  matchNavigation,
  findNavigationChild: (pathNode) => {
    for (const child of children) {
      const params = child.navigationProvider.matchNavigation(pathNode);
      if (params) return [child, params];
    }

    return undefined;
  },
  acceptNavigationChild: (child) => {
    action(`Set the ${parent.constructor.name} too have a child ${child.constructor.name}`, () => (parent.child = child as TChildScreen));
  },
  setNavigationFinalStep: () => {
    action(`Set ${parent.constructor.name} is the navigation final step`, () => (parent.child = null));
  },
});
