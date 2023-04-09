import type { AcceptsNavigation } from "./AcceptsNavigation";
import type { AcceptsNavigationCollection } from "./AcceptsNavigationCollection";
import type { Navigator } from "./Navigator";

export const createNestedNavigationAcceptor = (...initial: AcceptsNavigation[]): AcceptsNavigationCollection => {
  const items = [...initial];
  return {
    acceptNavigation(navigator: Navigator) {
      items.forEach(i => i.acceptNavigation(navigator));
    },
    addItem: (item: AcceptsNavigation) => {
      items.push(item);
      return () => items.splice(items.indexOf(item), 1);
    }
  };
}
