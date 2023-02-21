import type { IScreen } from "./IScreen";

export interface IParentScreen<TChildren extends IScreen<TQueryParams>, TQueryParams> extends IScreen<TQueryParams> {
  child: TChildren | null;
}
