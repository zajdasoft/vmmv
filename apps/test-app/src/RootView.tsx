import type RootViewModel from "./RootViewModel";
import { RenderModel, View } from "@vmmv/react-mobx";

export const RootView: View<RootViewModel> = ({ vm }) => (
  <>
    <h1>VMMV test app!</h1>
    <hr />
    <RenderModel vm={vm.child} />
  </>
)