import type { ScreenDescriptor, NavigationProvider, ParentScreen } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { createParentScreenNavigationProvider } from "./createParentScreenNavigationProvider";
import { createDefaultMatchNavigation } from "./createDefaultMatchNavigation";

export const createDefaultParentScreenNavigationProvider = <
  TParentScreen extends ParentScreen<TChildScreen>,
  TChildScreen extends ScreenDescriptor,
>(
  action: ActionExecutioner,
  parent: TParentScreen,
  children: TChildScreen[],
  screenDescriptivePathnameProvider: () => string,
): NavigationProvider =>
  createParentScreenNavigationProvider(
    action,
    parent,
    children,
    createDefaultMatchNavigation(screenDescriptivePathnameProvider));
