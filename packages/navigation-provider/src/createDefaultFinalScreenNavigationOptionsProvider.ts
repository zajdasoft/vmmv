import type { ScreenBase } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { createFinalScreenNavigationOptionsProvider } from "./createFinalScreenNavigationOptionsProvider";
import { createDefaultMatchNavigation } from "./createDefaultMatchNavigation";

export const createDefaultFinalScreenNavigationOptionsProvider = <TScreen extends ScreenBase, TQueryParams>(
  action: ActionExecutioner,
  parent: TScreen,
  screenDescriptivePathnameProvider: () => string,
) => createFinalScreenNavigationOptionsProvider(action, parent, createDefaultMatchNavigation(screenDescriptivePathnameProvider));
