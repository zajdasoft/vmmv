import type { IRoutingAdapter, PathContext } from "@vmmv/router";
import type { BrowserQueryParams } from "./browser";
import { getBrowserPathNodes, getBrowserQueryParamsAsString, getBrowserQueryParamsFromString } from "./browser";
import { applyRelativePath } from "./applyRelativePath";

export default class HashRoutingAdapter implements IRoutingAdapter<BrowserQueryParams> {
  init(navigate: (nodes: string[], params: BrowserQueryParams, path: string) => void): () => void {
    const goHashLocation = () => {
      const path = window.location.hash.substring(1);
      const split = path.split("?");
      const nodes = split[0].split("/");
      const params = getBrowserQueryParamsFromString(split[1] ?? "");
      navigate(nodes, params, path);
    }

    goHashLocation();
    window.addEventListener("hashchange", goHashLocation);
    return () => window.removeEventListener("hashchange", goHashLocation);
  }

  joinPathWithQueryParams(path: string[], params: BrowserQueryParams): string {
    return path.join("/") + getBrowserQueryParamsAsString(params);
  }

  wrapLinkPath(path: string): string {
    return `#${path}`;
  }

  parseDestination(path: string, context: PathContext): string[] {
    const parsed = getBrowserPathNodes(path);
    return applyRelativePath(context, parsed);
  }

  onAfterNavigate(finalLocation: string): void {}

  onBeforeNavigate(path: string[], params: BrowserQueryParams): boolean {
    return false;
  }
}
