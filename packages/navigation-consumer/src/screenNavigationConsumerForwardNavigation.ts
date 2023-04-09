import type { ScreenBase, AcceptsNavigation } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenForwardingNavigation extends ScreenBase {
  forwardNavigation: AcceptsNavigation;
}

export function isScreenForwardingNavigation<TQueryParams>(screen: ScreenBase): screen is IScreenForwardingNavigation {
  return typeof (screen as IScreenForwardingNavigation).forwardNavigation === "object";
}

export const screenNavigationConsumerForwardNavigation: ScreenNavigationConsumerSetter = (parent, ctx) => {
  if (isScreenForwardingNavigation(parent))
    parent.forwardNavigation.acceptNavigation(ctx.getNavigator());
}
