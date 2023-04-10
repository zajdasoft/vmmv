import type { ParentScreen, ScreenDescriptor, NavigationProvider } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { createParentScreenNavigationProvider } from "./createParentScreenNavigationProvider";
import { createDefaultMatchNavigation } from "./createDefaultMatchNavigation";

export const createDefaultRootScreenNavigationProvider = <
  TParentScreen extends ParentScreen<TChildScreen>,
  TChildScreen extends ScreenDescriptor,
>(
  action: ActionExecutioner,
  parent: TParentScreen,
  children: TChildScreen[],
): NavigationProvider =>
  createParentScreenNavigationProvider(
    action,
    parent,
    children,
    createDefaultMatchNavigation(() => ""));
