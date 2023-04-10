import type { ScreenDescriptor, AcceptsNavigation } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenForwardingNavigation extends ScreenDescriptor {
  forwardNavigation: AcceptsNavigation;
}

export function isScreenForwardingNavigation(screen: ScreenDescriptor): screen is IScreenForwardingNavigation {
  return typeof (screen as IScreenForwardingNavigation).forwardNavigation === "object";
}

export const screenNavigationConsumerForwardNavigation: ScreenNavigationConsumerSetter<ScreenDescriptor> = (parent, ctx) => {
  if (isScreenForwardingNavigation(parent))
    parent.forwardNavigation.acceptNavigation(ctx.getNavigator());
}
