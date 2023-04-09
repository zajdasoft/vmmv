import type { Navigator } from "./Navigator";

export interface AcceptsNavigation {
  acceptNavigation(navigator: Navigator): void;
}
