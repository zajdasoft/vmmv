import type { ParentScreen, ScreenBase, NavigationProvider } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { createParentScreenNavigationOptionsProvider } from "./createParentScreenNavigationOptionsProvider";
import { createDefaultMatchNavigation } from "./createDefaultMatchNavigation";

export const createDefaultRootScreenNavigationOptionsProvider = <
  TParentScreen extends ParentScreen<TChildScreen>,
  TChildScreen extends ScreenBase,
  TQueryParams,
>(
  action: ActionExecutioner,
  parent: TParentScreen,
  children: TChildScreen[],
): NavigationProvider =>
  createParentScreenNavigationOptionsProvider(
    action,
    parent,
    children,
    createDefaultMatchNavigation(() => ""));
