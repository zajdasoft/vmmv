import type { ScreenBase, Navigator } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenWithNavigator extends ScreenBase {
  navigator: Navigator;
}

export function isScreenWithNavigator<TQueryParams>(screen: ScreenBase): screen is IScreenWithNavigator {
  return typeof (screen as IScreenWithNavigator).navigator === "object";
}

export const screenNavigationConsumerSetNavigator: ScreenNavigationConsumerSetter = (parent, ctx) => {
  if (isScreenWithNavigator(parent))
    parent.navigator = ctx.getNavigator();
}
