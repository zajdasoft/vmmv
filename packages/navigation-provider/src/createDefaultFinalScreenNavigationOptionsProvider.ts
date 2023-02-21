import type { IScreen } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { createFinalScreenNavigationOptionsProvider } from "./createFinalScreenNavigationOptionsProvider";
import { createDefaultMatchNavigation } from "./createDefaultMatchNavigation";

export const createDefaultFinalScreenNavigationOptionsProvider = <TScreen extends IScreen<TQueryParams>, TQueryParams>(
  action: ActionExecutioner,
  parent: TScreen,
  screenDescriptivePathNodeProvider: () => string,
) => createFinalScreenNavigationOptionsProvider(action, parent, createDefaultMatchNavigation(screenDescriptivePathNodeProvider));
