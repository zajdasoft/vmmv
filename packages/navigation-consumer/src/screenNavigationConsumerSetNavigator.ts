import type { ScreenDescriptor, Navigator } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenWithNavigator extends ScreenDescriptor {
  navigator: Navigator;
}

export function isScreenWithNavigator(screen: ScreenDescriptor): screen is IScreenWithNavigator {
  return typeof (screen as IScreenWithNavigator).navigator === "object";
}

export const screenNavigationConsumerSetNavigator: ScreenNavigationConsumerSetter<ScreenDescriptor> = (parent, ctx) => {
  if (isScreenWithNavigator(parent))
    parent.navigator = ctx.getNavigator();
}
