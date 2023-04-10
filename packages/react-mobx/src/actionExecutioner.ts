import type { Action } from "@vmmv/common";
import { action } from "mobx";

export const actionExecutioner = (name: string, call: Action) => action(name, call)();
