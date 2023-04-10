import type { RoutingAdapter, PathContext } from "@vmmv/router";
import type { QueryParams } from "@vmmv/screen";
import { getBrowserPathnameNodes, getBrowserQueryParamsFromString } from "./browser";
import { applyRelativePath } from "./applyRelativePath";
import { queryParamsToURLSearchParams } from "./queryParamsToURLSearchParams";

export default class BrowseRoutingAdapter implements RoutingAdapter {
  init(navigate: (nodes: string[], params: QueryParams, path: string) => void): () => void {
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

  joinPathWithQueryParams(path: string[], params: QueryParams): string {
    return `/${path.join("/")}${(params && Object.keys(params).length ? `?${queryParamsToURLSearchParams(params)}` : "")}`;
  }

  wrapLinkPath(path: string): string {
    return path;
  }

  parseDestination(path: string, context: PathContext): string[] {
    const parsed = getBrowserPathnameNodes(path);
    return applyRelativePath(context, parsed);
  }

  onBeforeNavigate(path: string[], params: QueryParams): boolean {
    return true;
  }

  onAfterNavigate(finalLocation: string): void {
    window.history.pushState(undefined, "", finalLocation);
  }
}
