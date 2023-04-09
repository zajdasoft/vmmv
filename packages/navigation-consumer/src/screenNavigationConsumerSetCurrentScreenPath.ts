import type { ScreenBase } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenWithCurrentScreenPath extends ScreenBase {
  currentScreenPath: ScreenBase[];
}

export function isScreenWithCurrentScreenPath(screen: ScreenBase): screen is IScreenWithCurrentScreenPath {
  return Array.isArray((screen as IScreenWithCurrentScreenPath).currentScreenPath);
}

export const screenNavigationConsumerSetCurrentScreenPath: ScreenNavigationConsumerSetter = (parent, ctx) => {
  if (isScreenWithCurrentScreenPath(parent))
    parent.currentScreenPath = ctx.getScreenPath();
};
