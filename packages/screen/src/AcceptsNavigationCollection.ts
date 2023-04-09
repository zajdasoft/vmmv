import type { Action } from "@vmmv/common";
import type { AcceptsNavigation } from "./AcceptsNavigation";

export type RemoveIAcceptNavigationCollectionItem = Action;

export interface AcceptsNavigationCollection extends AcceptsNavigation {
  addItem(item: AcceptsNavigation): RemoveIAcceptNavigationCollectionItem;
}
