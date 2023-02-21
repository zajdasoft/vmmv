import type { IAcceptNavigation } from "./IAcceptNavigation";
import type { IAcceptNavigationCollection } from "./IAcceptNavigationCollection";
import type { Navigator } from "./Navigator";

export const createNestedNavigationForward = <TQueryParams>(...forward: IAcceptNavigation<TQueryParams>[]): IAcceptNavigationCollection<TQueryParams> => {
  const items = [...forward];
  return {
    acceptNavigation(navigator: Navigator<TQueryParams>) {
      items.forEach(i => i.acceptNavigation(navigator));
    },
    addItem: (item: IAcceptNavigation<TQueryParams>) => {
      items.push(item);
      return () => items.splice(items.indexOf(item), 1);
    }
  };
}
