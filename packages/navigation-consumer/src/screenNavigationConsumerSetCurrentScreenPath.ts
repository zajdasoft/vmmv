import type { ScreenDescriptor } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenWithCurrentScreenPath extends ScreenDescriptor {
  currentScreenPath: ScreenDescriptor[];
}

export function isScreenWithCurrentScreenPath(screen: ScreenDescriptor): screen is IScreenWithCurrentScreenPath {
  return Array.isArray((screen as IScreenWithCurrentScreenPath).currentScreenPath);
}

export const screenNavigationConsumerSetCurrentScreenPath: ScreenNavigationConsumerSetter<ScreenDescriptor> = (parent, ctx) => {
  if (isScreenWithCurrentScreenPath(parent))
    parent.currentScreenPath = ctx.getScreenPath();
};
