import type { IScreen } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenWithCurrentScreenPath<TQueryParams> extends IScreen<TQueryParams> {
  currentScreenPath: IScreen<TQueryParams>[];
}

export function isScreenWithCurrentScreenPath<TQueryParams>(screen: IScreen<TQueryParams>): screen is IScreenWithCurrentScreenPath<TQueryParams> {
  return Array.isArray((screen as IScreenWithCurrentScreenPath<TQueryParams>).currentScreenPath);
}

export const screenNavigationConsumerSetCurrentScreenPath: ScreenNavigationConsumerSetter = (parent, ctx) => {
  if (isScreenWithCurrentScreenPath(parent))
    parent.currentScreenPath = ctx.getScreenPath();
};
