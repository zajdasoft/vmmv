import type { ScreenDescriptor } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { createFinalScreenNavigationProvider } from "./createFinalScreenNavigationProvider";
import { createDefaultMatchNavigation } from "./createDefaultMatchNavigation";

export const createDefaultFinalScreenNavigationProvider = <TScreen extends ScreenDescriptor>(
  action: ActionExecutioner,
  parent: TScreen,
  screenDescriptivePathnameProvider: () => string,
) => createFinalScreenNavigationProvider(action, parent, createDefaultMatchNavigation(screenDescriptivePathnameProvider));
