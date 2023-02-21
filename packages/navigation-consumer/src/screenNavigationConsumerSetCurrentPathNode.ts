import type { IScreen } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenWithCurrentPathNode<TQueryParams> extends IScreen<TQueryParams> {
  currentPathNode: string;
}

export function isScreenWithCurrentPathNode<TQueryParams>(screen: IScreen<TQueryParams>): screen is IScreenWithCurrentPathNode<TQueryParams> {
  // noinspection SuspiciousTypeOfGuard
  return typeof (screen as IScreenWithCurrentPathNode<TQueryParams>).currentPathNode === "string";
}

export const screenNavigationConsumerSetCurrentPathNode: ScreenNavigationConsumerSetter = (parent, ctx) => {
  if (isScreenWithCurrentPathNode(parent))
    parent.currentPathNode = ctx.getCurrentPathNode();
}
