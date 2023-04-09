import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import type { Registrable } from "@vmmv/common";
import { defaultViewBank } from "./ViewBank";
import { getInstanceView } from "@vmmv/view-bank/src/getInstanceView";
import { canActivate } from "@vmmv/view-bank";
import type { View } from "./View";

export type RenderModelProps<TViewModel extends object> = {
  vm: TViewModel | null | undefined;
}

const useLifeCycle = (vm: Registrable | undefined | null) => {
  useEffect(() => {
    if (!vm || !canActivate(vm)) {
      return () => {};
    }

    return vm.activate() ?? (() => {});
  }, [vm]);
}

export const RenderModel = observer(<TViewModel extends Registrable,>({ vm }: RenderModelProps<TViewModel>) => {
  useLifeCycle(vm);

  if (!vm) return <></>;

  const ViewComponent = getInstanceView(vm, defaultViewBank) as View<TViewModel> | undefined;
  if (!ViewComponent) return <></>;

  return <ViewComponent vm={vm} />;
});

