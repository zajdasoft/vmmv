import type { Navigator } from "./Navigator";

export interface IAcceptNavigation<TQueryParams> {
  acceptNavigation(navigator: Navigator<TQueryParams>): void;
}
