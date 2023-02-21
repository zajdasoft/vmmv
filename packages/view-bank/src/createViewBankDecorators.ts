import type { Constructor, Registrable } from "@vmmv/common";
import type ViewBank from "./ViewBank";
import type { View, ViewCondition } from "./ViewBank";

export const createViewBankDecorators = <TViewOutput>(rootBank: ViewBank<TViewOutput>, invisibleView: View<Registrable, TViewOutput>) => ({
  AddDefaultView<TViewModel extends Registrable>(view: View<TViewModel, TViewOutput>, bank?: ViewBank<TViewOutput>) {
    return (constructor: Constructor<TViewModel>) => (bank ?? rootBank).register(constructor, view);
  },

  AddConditionalView<TViewModel extends Registrable>(view: View<TViewModel, TViewOutput>, condition: ViewCondition<TViewModel>, bank?: ViewBank<TViewOutput>) {
    return (constructor: Constructor<TViewModel>) => (bank ?? rootBank).addCondition(constructor, view, condition);
  },

  AddInvisibleView<TViewModel extends Registrable = Registrable>(bank?: ViewBank<TViewOutput>) {
    return (constructor: Constructor<TViewModel>) => (bank ?? rootBank).register(constructor, invisibleView);
  },
});
