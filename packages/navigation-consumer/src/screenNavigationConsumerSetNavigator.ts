import type { IScreen, Navigator } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenWithNavigator<TQueryParams> extends IScreen<TQueryParams> {
  navigator: Navigator<TQueryParams>;
}

export function isScreenWithNavigator<TQueryParams>(screen: IScreen<TQueryParams>): screen is IScreenWithNavigator<TQueryParams> {
  return typeof (screen as IScreenWithNavigator<TQueryParams>).navigator === "object";
}

export const screenNavigationConsumerSetNavigator: ScreenNavigationConsumerSetter = (parent, ctx) => {
  if (isScreenWithNavigator(parent))
    parent.navigator = ctx.getNavigator();
}
