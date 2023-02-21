import type { IRoutingAdapter, PathContext } from "@vmmv/router";
import type { BrowserQueryParams } from "./browser";
import { getBrowserPathNodes, getBrowserQueryParamsFromString } from "./browser";
import { applyRelativePath } from "./applyRelativePath";

export default class BrowseRoutingAdapter implements IRoutingAdapter<BrowserQueryParams> {
  init(navigate: (nodes: string[], params: BrowserQueryParams, path: string) => void): () => void {
    const goHistoryLocation = () => {
      const path = window.location.pathname + window.location.search;
      const nodes = window.location.pathname.split("/");
      const params = getBrowserQueryParamsFromString(window.location.search);
      navigate(nodes, params, path);
    }

    goHistoryLocation();
    window.addEventListener("popstate", goHistoryLocation);

    return () => window.removeEventListener("popstate", goHistoryLocation);
  }

  joinPathWithQueryParams(path: string[], params: BrowserQueryParams): string {
    return path.join("/") + (params && Object.keys(params).length ? `?${new URLSearchParams(params)}` : "");
  }

  wrapLinkPath(path: string): string {
    return path;
  }

  parseDestination(path: string, context: PathContext): string[] | undefined {
    const parsed = getBrowserPathNodes(path);
    return applyRelativePath(parsed, context);
  }

  onBeforeNavigate(path: string[], params: BrowserQueryParams): boolean {
    return true;
  }

  onAfterNavigate(finalLocation: string): void {
    window.history.pushState(undefined, "", finalLocation);
  }
}
