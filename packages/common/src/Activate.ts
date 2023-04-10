import type { Registrable } from "./index"
export type Deactivate = () => void;

export interface Activate {
  activate(): Deactivate | undefined;
}

export function canActivate(vm: Registrable): vm is Activate {
  return "activate" in vm && typeof vm.activate === "function";
}
