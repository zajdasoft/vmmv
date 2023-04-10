import { AddDefaultView } from "@vmmv/react-mobx";
import { RootView } from "./RootView";
import { RootScreen } from "@vmmv/react-mobx";
import { HelloWorldViewModel } from "./hello-world/HelloWorldViewModel";
import { makeObservable } from "mobx"

@AddDefaultView(RootView)
export default class RootViewModel extends RootScreen {
  constructor() {
    super([new HelloWorldViewModel()]);
    makeObservable(this);
  }

  notifyNavigationFailed(path: string): void {
    console.log("navigation failed:", path);
  }
}
