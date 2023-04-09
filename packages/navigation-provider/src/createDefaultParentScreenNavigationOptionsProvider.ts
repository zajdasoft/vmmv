import type { ScreenBase, NavigationProvider, ParentScreen } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { createParentScreenNavigationOptionsProvider } from "./createParentScreenNavigationOptionsProvider";
import { createDefaultMatchNavigation } from "./createDefaultMatchNavigation";

export const createDefaultParentScreenNavigationOptionsProvider = <
  TParentScreen extends ParentScreen<TChildScreen>,
  TChildScreen extends ScreenBase,
  TQueryParams,
>(
  action: ActionExecutioner,
  parent: TParentScreen,
  children: TChildScreen[],
  screenDescriptivePathnameProvider: () => string,
): NavigationProvider =>
  createParentScreenNavigationOptionsProvider(
    action,
    parent,
    children,
    createDefaultMatchNavigation(screenDescriptivePathnameProvider));
