import type { IScreen, IAcceptNavigation } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";

export interface IScreenForwardingNavigation<TQueryParams> extends IScreen<TQueryParams> {
  forwardNavigation: IAcceptNavigation<TQueryParams>;
}

export function isScreenForwardingNavigation<TQueryParams>(screen: IScreen<TQueryParams>): screen is IScreenForwardingNavigation<TQueryParams> {
  return typeof (screen as IScreenForwardingNavigation<TQueryParams>).forwardNavigation === "object";
}

export const screenNavigationConsumerForwardNavigation: ScreenNavigationConsumerSetter = (parent, ctx) => {
  if (isScreenForwardingNavigation(parent))
    parent.forwardNavigation.acceptNavigation(ctx.getNavigator());
}
