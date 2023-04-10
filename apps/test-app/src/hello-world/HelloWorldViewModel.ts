import { AddDefaultView, FinalScreen } from "@vmmv/react-mobx";
import { HelloWorldView } from "./HelloWorldView";

@AddDefaultView(HelloWorldView)
export class HelloWorldViewModel extends FinalScreen {
  pathname = () => "hello-world";

  constructor() {
    super();
  }
}