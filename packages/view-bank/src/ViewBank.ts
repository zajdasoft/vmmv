import type { Registrable, Constructor } from "@vmmv/common";

export type ViewProps<TViewModel extends Registrable> = { vm: TViewModel };
export type ViewBase<TViewModel extends Registrable, TViewOutput> = (props: ViewProps<TViewModel>) => TViewOutput;
export type ViewCondition<TViewModel extends Registrable> = (vm: TViewModel) => boolean;

export type ViewRegistryEntry<TViewModel extends Registrable, TViewOutput> = {
  view: ViewBase<TViewModel, TViewOutput>;
  condition: ViewCondition<TViewModel>;
}

export type ViewRegistry<TViewModel extends Registrable, TViewOutput> = {
  conditions: Array<ViewRegistryEntry<TViewModel, TViewOutput>>;
  default?: ViewBase<TViewModel, TViewOutput>;
};

export class ViewBank<TViewOutput> {
  private registry = new Map<Constructor, ViewRegistry<Registrable, TViewOutput>>();

  register<TViewModel extends Registrable>(model: Constructor<TViewModel>, view: ViewBase<TViewModel, TViewOutput>): void {
    const current = this.registry.get(model);
    if (current?.default) {
      throw new Error(`View model ${model.name} has already defined default view.`);
    }

    this.registry.set(model, {
      conditions: current?.conditions ?? [],
      default: view as ViewBase<Registrable, TViewOutput>,
    });
  }

  addCondition<TViewModel extends Registrable>(model: Constructor<TViewModel>, view: ViewBase<TViewModel, TViewOutput>, condition: ViewCondition<TViewModel>): void {
    const current = this.registry.get(model);
    this.registry.set(model, {
      conditions: [
          { view, condition } as ViewRegistryEntry<Registrable, TViewOutput>,
        ...current?.conditions ?? [],
      ],
      default: current?.default,
    });
  }

  get<TViewModel extends Registrable = Registrable>(model: TViewModel | undefined | null): ViewRegistry<TViewModel, TViewOutput> | undefined {
    if (!model) return undefined;
    const views = this.registry.get(model.constructor as Constructor);
    if (!views) {
      console.error(`View model ${model.constructor.name} has no view registered.`);
      return undefined;
    }

    return views as unknown as ViewRegistry<TViewModel, TViewOutput>;
  }
}
