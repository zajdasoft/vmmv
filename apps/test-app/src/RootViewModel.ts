import { AddDefaultView, Screen } from "@vmmv/react-mobx";
import { RootView } from "./RootView";
import { observable } from "mobx";

@AddDefaultView(RootView)
export default class RootViewModel extends Screen {
  @observable child: Screen | null = null;
  children: Screen[] = [];

  constructor() {
    super();
    this.init();
  }

  notifyNavigationFailed(path: string): void {
    console.log("navigation failed:", path);
  }
}
