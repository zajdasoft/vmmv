import type { RoutingAdapter, PathContext } from "@vmmv/router";
import type { QueryParams } from "@vmmv/screen";
import { getBrowserPathnames, getBrowserQueryParamsAsString, getBrowserQueryParamsFromString } from "./browser";
import { applyRelativePath } from "./applyRelativePath";

export default class HashRoutingAdapter implements RoutingAdapter {
  init(navigate: (nodes: string[], params: QueryParams, path: string) => void): () => void {
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

  joinPathWithQueryParams(path: string[], params: QueryParams): string {
    return path.join("/") + getBrowserQueryParamsAsString(params);
  }

  wrapLinkPath(path: string): string {
    return `#${path}`;
  }

  parseDestination(path: string, context: PathContext): string[] {
    const parsed = getBrowserPathnames(path);
    return applyRelativePath(context, parsed);
  }

  onAfterNavigate(finalLocation: string): void {}

  onBeforeNavigate(path: string[], params: QueryParams): boolean {
    return false;
  }
}
