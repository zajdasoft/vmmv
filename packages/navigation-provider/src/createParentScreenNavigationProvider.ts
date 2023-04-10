import type { ScreenDescriptor, ParentScreen, NavigationProvider, ScreenMatchResult } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { getScreenRoutingNavigationContext } from "@vmmv/screen";

export const createParentScreenNavigationProvider = <
  TParentScreen extends ParentScreen<TChildScreen>,
  TChildScreen extends ScreenDescriptor
>(
  action: ActionExecutioner,
  parent: TParentScreen,
  children: TChildScreen[],
  matchNavigation: (pathname: string) => ScreenMatchResult,
): NavigationProvider => ({
  matchNavigation,
  findNavigationChild: (pathname) => {
    for (const child of children) {
      const params = getScreenRoutingNavigationContext(child).provider.matchNavigation(pathname);
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
