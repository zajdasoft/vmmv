import type { INavigationProvider } from "./INavigationProvider";
import type { INavigationConsumer } from "./INavigationConsumer";

export interface IScreen<TQueryParams> {
  navigationProvider: INavigationProvider<TQueryParams>;
  navigationConsumer: INavigationConsumer<TQueryParams>;
}
