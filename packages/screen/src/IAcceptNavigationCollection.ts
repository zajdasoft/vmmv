import type { Action } from "@vmmv/common";
import type { IAcceptNavigation } from "./IAcceptNavigation";

export type RemoveIAcceptNavigationCollectionItem = Action;

export interface IAcceptNavigationCollection<TQueryParams> extends IAcceptNavigation<TQueryParams> {
  addItem(item: IAcceptNavigation<TQueryParams>): RemoveIAcceptNavigationCollectionItem;
}
