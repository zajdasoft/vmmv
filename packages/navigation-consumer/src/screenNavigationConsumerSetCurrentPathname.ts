import type { ScreenBase } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenWithCurrentPathname extends ScreenBase {
  currentPathname: string;
}

export function isScreenWithCurrentPathname(screen: ScreenBase): screen is IScreenWithCurrentPathname {
  // noinspection SuspiciousTypeOfGuard
  return typeof (screen as IScreenWithCurrentPathname).currentPathname === "string";
}

export const screenNavigationConsumerSetCurrentPathname: ScreenNavigationConsumerSetter = (parent, ctx) => {
  if (isScreenWithCurrentPathname(parent))
    parent.currentPathname = ctx.getCurrentPathname();
}
