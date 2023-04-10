import type { Registrable } from "@vmmv/common"
import type { ViewBank, ViewBase } from "./ViewBank";

export const getInstanceView = <TViewModel extends Registrable, TViewOutput>(vm: Registrable, bank: ViewBank<TViewOutput>): ViewBase<TViewModel, TViewOutput> | undefined => {
  const views = bank.get(vm);
  let found: ViewBase<TViewModel, TViewOutput> | undefined = views?.default;

  for (const { condition, view } of views?.conditions ?? []) {
    // We want to loop through all the conditions, because some libraries monitors used properties to trigger re-renders.
    if (condition(vm) && !view) {
      found = view;
    }
  }

  return found;
}
