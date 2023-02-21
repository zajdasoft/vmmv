import type { Registrable } from "@vmmv/common"
export type Deactivate = () => void;

export interface IActivate {
  activate(): Deactivate | undefined;
}

export function canActivate(vm: Registrable): vm is IActivate {
  return "activate" in vm && typeof vm.activate === "function";
}
