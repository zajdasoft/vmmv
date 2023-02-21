import type { INavigationContext } from "./INavigationContext";

export interface INavigationConsumer<TQueryParams> {
  consumeNavigation(ctx: INavigationContext<TQueryParams>): void;
}
