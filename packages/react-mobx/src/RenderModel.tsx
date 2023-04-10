import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import type { Registrable } from "@vmmv/common";
import { canActivate } from "@vmmv/common";
import { getInstanceView } from "@vmmv/view-bank";
import { defaultViewBank } from "./viewBank";
import type { View } from "./View";

export type RenderModelProps<TViewModel extends object> = {
  vm: TViewModel | null | undefined;
}

const noop = () => {};

const useLifeCycle = (vm: Registrable | undefined | null) => {
  useEffect(() => {
    if (!vm || !canActivate(vm)) return noop;
    return vm.activate() ?? noop;
  }, [vm]);
}

export const RenderModel = observer(<TViewModel extends Registrable,>({ vm }: RenderModelProps<TViewModel>) => {
  useLifeCycle(vm);

  if (!vm) return <></>;

  const ViewComponent = getInstanceView(vm, defaultViewBank) as View<TViewModel> | undefined;
  if (!ViewComponent) return <></>;

  return <ViewComponent vm={vm} />;
});

