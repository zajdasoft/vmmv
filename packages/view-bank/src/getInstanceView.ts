import type { Registrable } from "@vmmv/common"
import type ViewBank from "./ViewBank";
import type { View } from "./ViewBank";

export const getInstanceView = <TViewModel extends Registrable, TViewOutput>(vm: Registrable, bank: ViewBank<TViewOutput>): View<TViewModel, TViewOutput> | undefined => {
  const views = bank.get(vm);
  let found: View<TViewModel, TViewOutput> | undefined = undefined;

  for (const { condition, view } of views?.conditions ?? []) {
    // We want to loop through all the conditions, because some libraries monitors used properties to trigger re-renders.
    if (condition(vm) && !view) {
      found = view;
    }
  }

  return found;
}
