import type { IScreen, INavigationProvider, IParentScreen } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { createParentScreenNavigationOptionsProvider } from "./createParentScreenNavigationOptionsProvider";
import { createDefaultMatchNavigation } from "./createDefaultMatchNavigation";

export const createDefaultParentScreenNavigationOptionsProvider = <
  TParentScreen extends IParentScreen<TChildScreen, TQueryParams>,
  TChildScreen extends IScreen<TQueryParams>,
  TQueryParams,
>(
  action: ActionExecutioner,
  parent: TParentScreen,
  children: TChildScreen[],
  screenDescriptivePathNodeProvider: () => string,
): INavigationProvider<TQueryParams> =>
  createParentScreenNavigationOptionsProvider(
    action,
    parent,
    children,
    createDefaultMatchNavigation(screenDescriptivePathNodeProvider));
