import type { View } from "@vmmv/react-mobx";
import type { HelloWorldViewModel } from "./HelloWorldViewModel";

export const HelloWorldView: View<HelloWorldViewModel> = ({ vm }) => (
  <div>Hello world!</div>
)