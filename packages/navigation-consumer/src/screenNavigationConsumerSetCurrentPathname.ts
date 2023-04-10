import type { ScreenDescriptor } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenWithCurrentPathname extends ScreenDescriptor {
  currentPathname: string;
}

export function isScreenWithCurrentPathname(screen: ScreenDescriptor): screen is IScreenWithCurrentPathname {
  // noinspection SuspiciousTypeOfGuard
  return typeof (screen as IScreenWithCurrentPathname).currentPathname === "string";
}

export const screenNavigationConsumerSetCurrentPathname: ScreenNavigationConsumerSetter<ScreenDescriptor> = (parent, ctx) => {
  if (isScreenWithCurrentPathname(parent))
    parent.currentPathname = ctx.getCurrentPathname();
}
