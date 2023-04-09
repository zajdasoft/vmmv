import type { Constructor, Registrable } from "@vmmv/common";
import type { ViewBase, ViewCondition } from "./ViewBank";
import type { ViewBank } from "./ViewBank";

export const createViewBankDecorators = <TViewOutput>(rootBank: ViewBank<TViewOutput>, invisibleView: ViewBase<Registrable, TViewOutput>) => ({
  AddDefaultView<TViewModel extends Registrable>(view: ViewBase<TViewModel, TViewOutput>, bank?: ViewBank<TViewOutput>) {
    return (constructor: Constructor<TViewModel>) => (bank ?? rootBank).register(constructor, view);
  },

  AddConditionalView<TViewModel extends Registrable>(view: ViewBase<TViewModel, TViewOutput>, condition: ViewCondition<TViewModel>, bank?: ViewBank<TViewOutput>) {
    return (constructor: Constructor<TViewModel>) => (bank ?? rootBank).addCondition(constructor, view, condition);
  },

  AddInvisibleView<TViewModel extends Registrable = Registrable>(bank?: ViewBank<TViewOutput>) {
    return (constructor: Constructor<TViewModel>) => (bank ?? rootBank).register(constructor, invisibleView);
  },
});
