import type { IParentScreen, IScreen, INavigationProvider } from "@vmmv/screen";
import type { ActionExecutioner } from "@vmmv/common";
import { createParentScreenNavigationOptionsProvider } from "./createParentScreenNavigationOptionsProvider";
import { createDefaultMatchNavigation } from "./createDefaultMatchNavigation";

export const createDefaultRootScreenNavigationOptionsProvider = <
  TParentScreen extends IParentScreen<TChildScreen, TQueryParams>,
  TChildScreen extends IScreen<TQueryParams>,
  TQueryParams,
>(
  action: ActionExecutioner,
  parent: TParentScreen,
  children: TChildScreen[],
): INavigationProvider<TQueryParams> =>
  createParentScreenNavigationOptionsProvider(
    action,
    parent,
    children,
    createDefaultMatchNavigation(() => ""));
