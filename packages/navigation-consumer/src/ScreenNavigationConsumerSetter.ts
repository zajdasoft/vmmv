import type { IScreen, INavigationContext } from "@vmmv/screen"

export type ScreenNavigationConsumerSetter<
  TScreen extends IScreen<TQueryParams>= IScreen<unknown>,
  TQueryParams = unknown,
> = (screen: TScreen, ctx: INavigationContext<TQueryParams>) => void;
